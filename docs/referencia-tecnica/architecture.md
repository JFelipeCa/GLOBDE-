# 🏗️ Arquitectura del Sistema — Globde

[⬅ Volver al README principal](../../README.md)

---

## Patrón arquitectónico

Globde está construido bajo el patrón **Modelo–Vista–Controlador (MVC)**, separando:

- **Modelo** → tablas y datos en MySQL, accedidos desde el backend.
- **Vista** → interfaz de usuario en React (frontend).
- **Controlador** → endpoints de FastAPI que reciben las peticiones, aplican la lógica y devuelven respuestas.

## Diagrama general

```mermaid
flowchart LR
    subgraph Cliente["🖥️ Cliente (Navegador)"]
        FE["Frontend<br/>React + TypeScript + Vite"]
    end

    subgraph Servidor["⚙️ Servidor"]
        BE["Backend<br/>FastAPI (Python)"]
        DB[("MySQL<br/>12 tablas")]
    end

    FE -- "Peticiones HTTP (Axios)<br/>REST API / JSON" --> BE
    BE -- "Respuestas JSON" --> FE
    BE -- "mysql-connector-python" --> DB
    DB --> BE
```

## Flujo de autenticación

```mermaid
sequenceDiagram
    participant U as Usuario
    participant FE as Frontend (React)
    participant BE as Backend (FastAPI)
    participant DB as MySQL

    U->>FE: Ingresa correo y contraseña
    FE->>BE: POST /api/login
    BE->>DB: Verifica credenciales
    DB-->>BE: Datos del usuario + rol
    BE-->>FE: Respuesta con datos de sesión
    FE-->>U: Redirige al panel según su rol
```

## Organización de carpetas

```
GLOBDE/
├── frontend/     # React + TypeScript + Vite
├── backend/      # FastAPI + Python
├── database/     # Script SQL de la base de datos
└── docs/         # Documentación del proyecto
```

## Comunicación Frontend ↔ Backend

- El frontend consume la API mediante **Axios** (`frontend/src/api/axiosClient.ts` y `globdeApi.ts`).
- El estado de sesión y datos globales se manejan con **Redux** (`frontend/src/store/`), incluyendo persistencia en `localStorage` para mantener la sesión activa.
- El backend expone endpoints REST bajo el prefijo `/api/` (ver [`api-endpoints.md`](api-endpoints.md)).
- CORS está habilitado en el backend para permitir la comunicación entre `localhost:5173` (frontend) y `localhost:8000` (backend) en desarrollo.

## Roles del sistema

| ID de rol | Rol | Acceso |
|---|---|---|
| 1 | Administrador | Gestión completa del sistema |
| 2 | Barbero | Agenda, citas y disponibilidad propias |
| 3 | Cliente | Reservas, historial y perfil propio |

---

[⬅ Volver al README principal](../../README.md)
