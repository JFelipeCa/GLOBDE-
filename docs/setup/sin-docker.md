# Guía de Instalación Manual (Sin Docker) — GLOBDE

<!--
  ¿Qué? Guía detallada para la instalación y ejecución manual de GLOBDE en sistemas operativos locales.
  ¿Para qué? Proveer una alternativa a equipos sin soporte o recursos para Docker.
  ¿Impacto? Garantiza la accesibilidad y ejecución del software en cualquier máquina de desarrollo.
-->

> **Requisitos Previos**:
> - Python 3.12+ instalado (`python --version`)
> - Node.js 22 LTS+ y pnpm 9+ (`node --version`, `pnpm --version`)
> - Servidor MySQL 8.0+ instalado y corriendo localmente (`mysql --version`)

---

## 📋 Pasos de Instalación Manual

### 1. Clonar el Repositorio
```bash
git clone https://github.com/JFelipeCa/GLOBDE-.git
cd GLOBDE-
```

---

### 2. Configurar y Poblar la Base de Datos MySQL

1. Abre tu cliente de base de datos preferido (MySQL Workbench, DBeaver, HeidiSQL o terminal).
2. Ejecuta el script completo ubicado en `database/database.sql`:
```bash
mysql -u root -p < database/database.sql
```
3. Verifica que se haya creado la base de datos `globde` con las 12 tablas y 3 vistas SQL.

---

### 3. Configurar y Ejecutar el Backend (FastAPI)

```bash
cd backend

# Crear entorno virtual e instalar dependencias (uv lo hace en un solo paso)
uv sync

# Configurar variables de entorno
cp .env.example .env
# Edita el archivo .env con tus credenciales locales de MySQL:
# DB_HOST=127.0.0.1
# DB_PORT=3306
# DB_USER=root
# DB_PASSWORD=tu_password_local
# DB_NAME=globde

# Iniciar servidor FastAPI con recarga automática
uv run uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```
- API activa en: `http://localhost:8000`
- Swagger Docs: `http://localhost:8000/docs`

---

### 4. Configurar y Ejecutar el Frontend (React + TypeScript)

En una **segunda terminal**:
```bash
cd frontend

# Instalar dependencias de Node
pnpm install

# Iniciar servidor de desarrollo Vite
pnpm run dev
```
- Frontend activo en: `http://localhost:5173`

---

## 🪟 Inicio Rápido en Windows (`Arrancar-Globde.bat`)

Si estás en Windows con MySQL ya corriendo como servicio, puedes hacer doble clic en el archivo `Arrancar-Globde.bat` situado en la raíz del proyecto para abrir ambas terminales de forma automática.
