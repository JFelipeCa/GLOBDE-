import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Necesario en GitHub Codespaces / contenedores para exponer el puerto
    host: true,
    port: 5173,
    proxy: {
      // El frontend llama a /api/* y Vite lo redirige al backend FastAPI,
      // evitando problemas de CORS y de URLs http://localhost:8000 quemadas,
      // que en Codespaces no funcionan desde el navegador.
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
      },
    },
  },
})
