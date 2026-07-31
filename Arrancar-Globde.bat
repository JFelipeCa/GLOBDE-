@echo off
rem Inicia el backend (FastAPI) y el frontend (Vite) en dos ventanas.
rem Requisito: haber creado backend\.venv y hecho "npm install" en frontend al menos una vez.

start cmd /k "cd backend && .\.venv\Scripts\python.exe -m uvicorn app.main:app --reload"
start cmd /k "cd frontend && npm run dev"
