import axios from 'axios';
 
const BACKEND_PORT = 8000;
 
function resolveApiBaseUrl(): string {
  // Permite forzar la URL manualmente si algun dia hace falta
  // (crea un .env en frontend/ con VITE_API_URL=https://tu-backend/api)
  const override = import.meta.env.VITE_API_URL;
  if (override) return override;
 
  const { hostname, protocol } = window.location;
 
  // Codespaces / github.dev: <nombre>-<puerto>.app.github.dev
  // El frontend corre en el puerto 5173 (u otro); reemplazamos ese
  // numero por el puerto del backend para armar su URL publica.
  const codespacesMatch = hostname.match(/^(.*)-\d+\.app\.github\.dev$/);
  if (codespacesMatch) {
    return `${protocol}//${codespacesMatch[1]}-${BACKEND_PORT}.app.github.dev/api`;
  }
 
  // Local (localhost / 127.0.0.1)
  if (hostname === 'localhost' || hostname === '127.0.0.1') {
    return `https://organic-doodle-jj6gqg67pvj525jw7-8000.app.github.dev/api/login`;
  }
 
  // Cualquier otro entorno remoto: mismo host, puerto del backend
  return `${protocol}//${hostname}:${BACKEND_PORT}/api`;
}
 
const axiosClient = axios.create({
  baseURL: resolveApiBaseUrl(),
  headers: {
    'Content-Type': 'application/json',
  },
});
 
export default axiosClient;
 