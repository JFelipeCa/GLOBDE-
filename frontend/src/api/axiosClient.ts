import axios from 'axios';

// En desarrollo (localhost o GitHub Codespaces) se usa el proxy de Vite ('/api'),
// así el navegador nunca llama directamente a localhost:8000.
// Si despliegas el backend por separado, define VITE_API_URL con su URL completa.
const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosClient;
