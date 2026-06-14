import axios from "axios";

const backend_host = import.meta.env.VITE_BACKEND_HOST || "http://localhost:8000";

const useCrud = (endpoint) => {

  const getHeaders = () => {
    const token = localStorage.getItem("mock_token");
    return token ? { headers: { Authorization: `Bearer ${token}` } } : {};
  };

  const getModel = async (customPathOrQuery = "") => {
    try {
      const finalEndpoint = customPathOrQuery.startsWith('?')
        ? `${endpoint}${customPathOrQuery}`
        : (customPathOrQuery || endpoint);

      const response = await axios.get(`${backend_host}${finalEndpoint}`, getHeaders());
      return response.data;
    } catch (error) {
      console.error("Error fetching data:", error);
      return Promise.reject(error.response?.data || error);
    }
  };

  const deleteModel = async (_endpoint = endpoint) => {
    try {
      const response = await axios.delete(`${backend_host}${_endpoint}`, getHeaders());
      return response.data;
    } catch (error) {
      const backendMessage = error.response?.data?.message || "Error desconocido";
      console.error('Error al eliminar el registro:', backendMessage);
      throw error;
    }
  };

  const insertModel = async (_data, _endpoint = endpoint) => {
    try {
      const response = await axios.post(`${backend_host}${_endpoint}`, _data, getHeaders());
      return response.data;
    } catch (error) {
      if (error.response) {
        console.log("DETAIL:", JSON.stringify(error.response.data));
        const backendMessage = error.response.data?.message || "Error desconocido";
        console.error('Error al registrar el registro:', backendMessage);
        throw error;
      } else {
        console.error('Network error:', error);
        return Promise.reject({ message: error.message });
      }
    }
  };

  const updateModel = async (_data, _endpoint = endpoint) => {
    try {
      const response = await axios.put(`${backend_host}${_endpoint}`, _data, getHeaders());
      return response.data;
    } catch (error) {
      if (error.response) {
        const backendMessage = error.response.data?.message || "Error desconocido";
        console.error('Error al actualizar el registro:', backendMessage);
        throw error;
      } else {
        console.error('Network error:', error);
        return Promise.reject({ message: 'Network error' });
      }
    }
  };

  const patchModel = async (_data, _endpoint = endpoint) => {
    try {
      const response = await axios.patch(`${backend_host}${_endpoint}`, _data, getHeaders());
      return response.data;
    } catch (error) {
      if (error.response) {
        const backendMessage = error.response.data?.message || "Error desconocido";
        console.error('Error al actualizar parcialmente:', backendMessage);
        throw error;
      } else {
        console.error('Network error:', error);
        return Promise.reject({ message: 'Network error' });
      }
    }
  };

  return {
    getModel,
    insertModel,
    deleteModel,
    updateModel,
    patchModel,
  };
};

export default useCrud;
