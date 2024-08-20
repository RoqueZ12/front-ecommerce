import axios from 'axios';
const axiosInstance = axios.create({
  baseURL: 'http://localhost:1300',  // Reemplaza con la URL de tu servidor API
  withCredentials: true  // Permite enviar cookies a través de CORS
});

export default axiosInstance
