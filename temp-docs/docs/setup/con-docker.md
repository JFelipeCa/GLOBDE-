# Guía de Instalación y Despliegue con Docker — GLOBDE

<!--
  ¿Qué? Guía paso a paso para levantar el entorno de desarrollo y base de datos de GLOBDE utilizando Docker Compose.
  ¿Para qué? Proveer un método de despliegue estandarizado, reproducible y sin conflictos de librerías locales.
  ¿Impacto? Reduce el tiempo de configuración del entorno de horas a pocos minutos en cualquier sistema operativo.
-->

> **Requisitos**: Docker Desktop 24.0+ y Docker Compose v2.20+ instalados y en ejecución.

---

## 🚀 Pasos de Instalación Rápida

### 1. Clonar el repositorio
```bash
git clone https://github.com/JFelipeCa/GLOBDE-.git
cd GLOBDE-
```

### 2. Configurar variables de entorno del Backend
```bash
cd backend
cp .env.example .env
```
Edita `backend/.env` si deseas personalizar contraseñas o configurar un servidor SMTP real. Por defecto viene preconfigurado para operar con el contenedor de MySQL:

```env
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=root
DB_PASSWORD=rootpassword
DB_NAME=globde
FRONTEND_URL=http://localhost:5173
RESET_TOKEN_MINUTES=30
```

### 3. Levantar los Contenedores
Regresa a la raíz del proyecto y ejecuta:
```bash
docker compose up -d
```
Verifica que los contenedores estén saludables:
```bash
docker compose ps
```
Deberías ver los servicios `db` (MySQL 8.0) y `backend` (FastAPI) con estado `Up` o `Healthy`.

### 4. Iniciar el Frontend (React + Vite)
```bash
cd frontend
npm install
npm run dev
```
La aplicación web estará disponible en: **`http://localhost:5173`**

---

## 🔍 Puertos y URLs de Servicios

| Servicio | Puerto Host | URL |
| :--- | :---: | :--- |
| **Frontend React** | `5173` | `http://localhost:5173` |
| **Backend FastAPI** | `8000` | `http://localhost:8000` |
| **Swagger UI (Docs)**| `8000` | `http://localhost:8000/docs` |
| **Base de Datos MySQL**| `3306` | `localhost:3306` (`user: root`) |

---

## 🛠️ Comandos de Mantenimiento y Troubleshooting

### Ver logs en tiempo real
```bash
docker compose logs -f backend
docker compose logs -f db
```

### Reiniciar contenedores
```bash
docker compose restart
```

### Detener y limpiar volúmenes (Reset completo)
```bash
docker compose down -v
docker compose up -d --build
```
