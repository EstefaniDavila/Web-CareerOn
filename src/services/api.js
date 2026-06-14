import axios from 'axios';
import { msalInstance } from '../main'; // Asegúrate de exportar msalInstance desde main.jsx
import { loginRequest } from '../authConfig';

const api = axios.create({
  baseURL: 'http://localhost:8000/api',
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
      } else {
        const mockToken = localStorage.getItem("mock_token");
        if (mockToken) {
          config.headers.Authorization = `Bearer ${mockToken}`;
        }
      }
    } catch (error) {
      console.warn('No se pudo obtener el token de MSAL, usando mock_token...', error);
      const mockToken = localStorage.getItem("mock_token");
      if (mockToken) {
        config.headers.Authorization = `Bearer ${mockToken}`;
      }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
