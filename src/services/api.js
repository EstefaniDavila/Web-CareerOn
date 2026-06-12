import axios from 'axios';
import { msalInstance } from '../main'; // Asegúrate de exportar msalInstance desde main.jsx
import { loginRequest } from '../authConfig';

const api = axios.create({
  baseURL: 'http://localhost:8000/api', // Ajusta esto al puerto real de tu backend
});

api.interceptors.request.use(
  async (config) => {
    try {
      const activeAccount = msalInstance.getActiveAccount() || msalInstance.getAllAccounts()[0];

      if (activeAccount) {
        const response = await msalInstance.acquireTokenSilent({
          ...loginRequest,
          account: activeAccount
        });

        config.headers.Authorization = `Bearer ${response.idToken}`;
      }
    } catch (error) {
      console.warn('No se pudo obtener el token silenciosamente. El usuario quizá deba volver a loguearse.', error);
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
