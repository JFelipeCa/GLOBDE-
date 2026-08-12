import axios from 'axios';
 
const BACKEND_PORT = 8000;
 
function resolveApiBaseUrl(): string {

  const override = import.meta.env.VITE_API_URL;
  if (override) return override;
 
  const { hostname, protocol } = window.location;
 
  const codespacesMatch = hostname.match(/^(.*)-\d+\.app\.github\.dev$/);
  if (codespacesMatch) {
    return `${protocol}//${codespacesMatch[1]}-${BACKEND_PORT}.app.github.dev/api`;
  }
 
  if (hostname === 'localhost' || hostname === '127.0.0.1') {
    return `https://organic-doodle-jj6gqg67pvj525jw7-8000.app.github.dev/api/login`;
  }
 
  return `${protocol}//${hostname}:${BACKEND_PORT}/api`;
}
 
const axiosClient = axios.create({
  baseURL: resolveApiBaseUrl(),
  headers: {
    'Content-Type': 'application/json',
  },
});
 
export default axiosClient;
 
