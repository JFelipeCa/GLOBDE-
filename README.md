<div align="center">

# 💈 Globde

### Sistema de Agendamiento de Citas para Barbería

*Reserva, gestiona y haz crecer tu barbería desde una sola plataforma.*

![Status](https://img.shields.io/badge/estado-en%20desarrollo-yellow)
![React](https://img.shields.io/badge/Frontend-React%20%2B%20TypeScript-61DAFB?logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Bundler-Vite-646CFF?logo=vite&logoColor=white)
![FastAPI](https://img.shields.io/badge/Backend-FastAPI-009688?logo=fastapi&logoColor=white)
![MySQL](https://img.shields.io/badge/Base%20de%20Datos-MySQL-4479A1?logo=mysql&logoColor=white)
![License](https://img.shields.io/badge/licencia-Educativo%20SENA-lightgrey)

</div>

---

## Tabla de Contenido

- [Descripción](#descripción)
- [Objetivo](#objetivo)
- [Alcance del Sistema](#alcance-del-sistema)
- [Arquitectura](#arquitectura)
- [Stack Tecnológico](#stack-tecnológico)
- [Funcionalidades por Rol](#funcionalidades-por-rol)
- [Módulos del Sistema](#módulos-del-sistema)
- [Modelo de Base de Datos](#modelo-de-base-de-datos)
- [Historias de Usuario](#historias-de-usuario)
- [Casos de Uso](#casos-de-uso)
- [Paleta de Diseño](#paleta-de-diseño)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Instalación y Puesta en Marcha](#instalación-y-puesta-en-marcha)
- [Documentación Adicional](#documentación-adicional)
- [Metodología de Trabajo](#metodología-de-trabajo)
- [Equipo de Desarrollo](#equipo-de-desarrollo)
- [Limitaciones](#limitaciones)

---

## Descripción

**Globde** es una solución web integral para la gestión de citas en barberías, desarrollada por un equipo de aprendices ADSO del SENA. El sistema permite a los **clientes** reservar citas de forma autónoma, a los **barberos** organizar su agenda diaria y a los **administradores** controlar clientes, servicios, personal, reportes y fidelización — todo desde una interfaz moderna, segura y responsive.

📄 Documento completo: [Propuesta Técnica (PDF)](docs/anexos/PROPUESTA_TECNICA.pdf)

## Objetivo

Optimizar el proceso de agendamiento de citas en una barbería, mejorando la atención al cliente, reduciendo tiempos de espera y organizando eficientemente los horarios de servicios, clientes y barberos.

## Alcance del Sistema

| ✅ Incluido en el sistema |
|---|
| Registro e inicio de sesión de usuarios |
| Agendamiento, confirmación, cancelación y reprogramación de citas |
| Visualización de horarios disponibles |
| Gestión de clientes, barberos y servicios |
| Panel administrativo con reportes |
| Programa de fidelización por puntos |
| Almacenamiento seguro de información en base de datos |
| Diseño responsive (escritorio y móvil) |

## Arquitectura

El sistema está construido bajo el patrón **Modelo–Vista–Controlador (MVC)**, separando la lógica de negocio, la interfaz de usuario y el control de solicitudes para facilitar el mantenimiento, la organización y la escalabilidad.

```
┌────────────────────┐        REST API        ┌──────────────────────┐        ┌──────────────┐
│      Frontend       │  ───────────────────▶  │       Backend        │ ─────▶ │  Base de datos │
│  React + TypeScript │  ◀───────────────────  │  FastAPI (Python)    │ ◀───── │     MySQL      │
│        Vite         │                        │                       │        │               │
└────────────────────┘                         └──────────────────────┘        └──────────────┘
```

## Stack Tecnológico

| Capa | Tecnologías |
|---|---|
| **Frontend** | React, TypeScript, Vite, Redux (authSlice, dataSlice), Axios |
| **Backend** | FastAPI, Python, mysql-connector-python |
| **Base de Datos** | MySQL (12 tablas: usuarios, roles, clientes, citas, servicios, facturas, etc.) |
| **Contenedores** | Docker + Docker Compose (MySQL + Backend) |
| **Control de versiones** | Git / GitHub |
| **Entorno de desarrollo** | Visual Studio Code |
| **Metodología** | Scrum |

> 💡 En la propuesta técnica inicial se consideró Java + Spring Boot para el backend; la implementación final del equipo migró a **FastAPI (Python)** por agilidad de desarrollo.

## Funcionalidades por Rol

<table>
<tr><th>Rol</th><th>Puede hacer</th></tr>
<tr>
<td><b>🧑‍💼 Administrador</b></td>
<td>Gestionar usuarios, clientes, barberos y servicios · Configurar horarios y días no laborales · Buscar y filtrar citas · Enviar notificaciones masivas · Configurar y canjear puntos de fidelización · Generar y exportar reportes (ingresos, ranking de servicios, desempeño por barbero)</td>
</tr>
<tr>
<td><b>💈 Barbero</b></td>
<td>Visualizar su agenda diaria · Agendar citas manualmente · Cambiar el estado de una cita (pendiente / en atención / completada) · Configurar su disponibilidad</td>
</tr>
<tr>
<td><b>🙋 Cliente</b></td>
<td>Registrarse e iniciar sesión · Consultar perfiles y calificaciones de barberos · Reservar, cancelar y calificar citas · Consultar su historial · Unirse a una lista de espera · Acumular y consultar puntos de fidelización</td>
</tr>
</table>

## Módulos del Sistema

- 🔐 **Autenticación** — registro, login y recuperación de contraseña
- 👤 **Gestión de Clientes** — registro, búsqueda, edición y eliminación
- 💈 **Gestión de Barberos** — registro y configuración de disponibilidad
- ✂️ **Gestión de Servicios** — catálogo con precio, duración y activación/desactivación
- 📅 **Agendamiento de Citas** — reserva, reprogramación, cancelación y lista de espera
- 🔔 **Notificaciones** — recordatorios automáticos, alertas de cancelación y avisos masivos
- ⭐ **Fidelización** — acumulación y canje de puntos por servicio
- 📊 **Reportes** — ingresos, ranking de servicios y desempeño por barbero, exportables a Excel/PDF

## Modelo de Base de Datos

La base de datos en **MySQL** (`database/database.sql`) está compuesta actualmente por **12 tablas**:

`usuarios` · `roles` · `clientes` · `citas` · `servicios` · `catalogo_cortes` · `facturas` · `detalle_factura` · `penalidades` · `ranking_barberos` · `tokens_recuperacion` · `password_reset_tokens`

> 📌 Vistas SQL y procedimientos almacenados adicionales están contemplados para próximas iteraciones del proyecto.

## Historias de Usuario

El proyecto cuenta con **33 Historias de Usuario (HU-01 a HU-33)**, cada una en su propio archivo, con formato *"Como... quiero... para..."* y criterios de aceptación detallados. Cubren desde autenticación y gestión de clientes hasta reportes administrativos y lista de espera.

| Rango | Enfoque principal |
|---|---|
| HU-01 a HU-03 | Autenticación (registro, login, recuperación de contraseña) |
| HU-04 a HU-09 | Gestión de clientes, servicios y barberos |
| HU-10 a HU-17 | Disponibilidad, agendamiento y gestión de citas |
| HU-18 a HU-22 | Calificaciones, historial y notificaciones |
| HU-23 a HU-26 | Programa de fidelización por puntos |
| HU-27 a HU-28 | Configuración de horarios del negocio |
| HU-29 a HU-32 | Reportes administrativos y exportación |
| HU-33 | Lista de espera |

📄 **[Ver todas las Historias de Usuario →](docs/requisitos.md)**

## Casos de Uso

El sistema documenta **33 Casos de Uso (CU-01 a CU-33)**, alineados uno a uno con las Historias de Usuario. Cada archivo incluye actores, precondiciones, postcondiciones, secuencia normal, excepciones, rendimiento, frecuencia de uso y su **diagrama de caso de uso** (relaciones `«include»`/`«extend»` renderizadas con Mermaid).

📄 **[Ver todos los Casos de Uso →](docs/requisitos.md)**

## Paleta de Diseño

<div>
<img src="https://img.shields.io/badge/-000000?style=for-the-badge" height="30"/> Negro
<img src="https://img.shields.io/badge/-FFFFFF?style=for-the-badge&logo=data:image/png" height="30"/> Blanco
<img src="https://img.shields.io/badge/-00BCD4?style=for-the-badge" height="30"/> Cian
<img src="https://img.shields.io/badge/-D4AF37?style=for-the-badge" height="30"/> Dorado
</div>

Paleta derivada del logo de Globde, aplicada de forma consistente en landing page, dashboards y presentación oficial. Las interfaces orientadas al cliente evitan jerga técnica para mantener una experiencia amigable.

## Estructura del Proyecto

```
GLOBDE/
├── frontend/                    # React + TypeScript + Vite
│   ├── public/
│   ├── src/
│   │   ├── api/                  # Cliente Axios y llamadas a la API
│   │   ├── assets/
│   │   ├── components/           # Componentes reutilizables
│   │   ├── pages/                 # Vistas (Landing, Login, Dashboards, Citas...)
│   │   ├── store/                  # Redux — authSlice, dataSlice (persistencia con localStorage)
│   │   └── utils/
│   ├── package.json
│   └── vite.config.ts
├── backend/                     # FastAPI + Python
│   ├── app/
│   │   └── main.py               # API (endpoints, conexión MySQL)
│   ├── .env.example              # Plantilla de variables de entorno
│   ├── Dockerfile
│   └── requirements.txt
├── database/
│   └── database.sql              # Script de creación de la base de datos (12 tablas)
├── docs/
│   ├── requisitos.md              # Índice de Historias de Usuario y Casos de Uso
│   ├── requisitos/
│   │   ├── HUs/                    # 33 Historias de Usuario (1 archivo por HU)
│   │   ├── CUs/                    # 33 Casos de Uso con diagramas (1 archivo por CU)
│   │   └── restricciones.md
│   ├── referencia-tecnica/
│   │   ├── architecture.md         # Arquitectura y diagramas del sistema
│   │   ├── database-schema.md      # Esquema completo de la base de datos
│   │   └── api-endpoints.md        # Todos los endpoints documentados
│   ├── setup/
│   │   ├── con-docker.md           # Guía de instalación con Docker
│   │   └── sin-docker.md           # Guía de instalación manual
│   └── anexos/                     # Documentos originales (PDF/Excel de la propuesta)
├── docker-compose.yml            # Levanta MySQL + Backend en contenedores
├── .gitignore
└── README.md
```

## Instalación y Puesta en Marcha

### Opción A — Con Docker (recomendada)

```bash
# 1. Clonar el repositorio
git clone https://github.com/tu-usuario/globde.git
cd GLOBDE

# 2. Configurar variables de entorno del backend
cd backend
cp .env.example .env
# Edita .env con tus valores (usuario y contraseña de MySQL)
cd ..

# 3. Levantar MySQL + Backend con Docker
docker compose up -d

# 4. Frontend (se ejecuta aparte, en modo desarrollo)
cd frontend
npm install
npm run dev
# → http://localhost:5173
```

### Opción B — Sin Docker (manual)

```bash
# Backend
cd backend
python -m venv venv
source venv/bin/activate      # En Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env          # Ajusta los valores según tu MySQL local
uvicorn app.main:app --reload
# → http://localhost:8000

# Frontend (en otra terminal)
cd frontend
npm install
npm run dev
# → http://localhost:5173

# Base de datos: importa database/database.sql en tu gestor de MySQL
```

> 🪟 **Windows:** también puedes usar el script `Arrancar-Globde.bat` en la raíz del proyecto para iniciar todo automáticamente.

> ⚠️ **Importante:** el archivo `.env` real **nunca** debe subirse al repositorio (ya está protegido en `.gitignore`). Usa siempre `.env.example` como plantilla.

📚 Guías detalladas paso a paso: **[Con Docker](docs/setup/con-docker.md)** · **[Sin Docker](docs/setup/sin-docker.md)**

## Documentación Adicional

| Documento | Descripción |
|---|---|
| [`docs/requisitos.md`](docs/requisitos.md) | Índice de las 33 Historias de Usuario y sus Casos de Uso |
| [`docs/requisitos/HUs/`](docs/requisitos/HUs) | Historias de Usuario, una por archivo |
| [`docs/requisitos/CUs/`](docs/requisitos/CUs) | Casos de Uso con diagramas de flujo (Mermaid) |
| [`docs/requisitos/restricciones.md`](docs/requisitos/restricciones.md) | Restricciones del proyecto |
| [`docs/referencia-tecnica/architecture.md`](docs/referencia-tecnica/architecture.md) | Arquitectura general y diagramas del sistema |
| [`docs/referencia-tecnica/database-schema.md`](docs/referencia-tecnica/database-schema.md) | Esquema completo de la base de datos (12 tablas) |
| [`docs/referencia-tecnica/api-endpoints.md`](docs/referencia-tecnica/api-endpoints.md) | Todos los endpoints de la API documentados |
| [`docs/setup/con-docker.md`](docs/setup/con-docker.md) | Guía de instalación con Docker |
| [`docs/setup/sin-docker.md`](docs/setup/sin-docker.md) | Guía de instalación manual |
| [`docs/anexos/`](docs/anexos) | Documentos originales de la propuesta (PDF/Excel) |

## Metodología de Trabajo

El proyecto se desarrolló bajo la metodología ágil **Scrum**, organizando el trabajo en **6 sprints** con un total de **33 historias de usuario** distribuidas según prioridad y dependencia funcional, documentadas en el Sprint Backlog del equipo.

## Equipo de Desarrollo

| Integrante | Rol principal |
|---|---|
| **Laura** | DB |
| **Juan Felipe Cañón** | Backend |
| **Dayanna Patiño** | Frontend |

Proyecto desarrollado como parte del programa **ADSO (Análisis y Desarrollo de Software)** 

## Limitaciones

- Requiere conexión a internet para funcionar.
- Solo usuarios registrados pueden agendar citas.
- La primera versión **no incluye pagos en línea**.
- Las notificaciones dependen del correo electrónico registrado.
- La capacidad de almacenamiento depende del servidor utilizado.

---

<div align="center">

Hecho con el <3 por el equipo Globde — SENA ADSO 2026

</div>
