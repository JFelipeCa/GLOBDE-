> **Proyecto formativo** — SENA | Programa ADSO (Análisis y Desarrollo de Software) — Febrero 2026

# 💈 GLOBDE — Sistema Integral de Gestión de Citas y Barbería

Sistema web fullstack para la gestión integral de citas, barberos, clientes, fidelización por puntos y reportes analíticos para barberías modernas. Desarrollado con **FastAPI (Python 3.12)** en el backend, **React 18 + TypeScript + Vite + Redux** en el frontend y **MySQL** como motor relacional.

---

## 📝 Antes de empezar

Este repositorio contiene la arquitectura completa, el backend API REST, el frontend SPA responsive y la base de datos relacional con vistas SQL del proyecto **GLOBDE**. Si es tu primer acercamiento al código, te recomendamos leer primero la [**Bitácora de seguimiento**](BITACORA.md), donde el equipo documentó fase por fase cómo se construyó el sistema, y la [**Arquitectura**](docs/referencia-tecnica/architecture.md), que explica cómo se comunican las tres capas.

---

## 📋 Tabla de Contenidos

* [💈 GLOBDE — Sistema Integral de Citas y Barbería](#-globde--sistema-integral-de-gestión-de-citas-y-barbería)
  * [📝 Antes de empezar](#-antes-de-empezar)
  * [📋 Tabla de Contenidos](#-tabla-de-contenidos)
  * [🛠️ Stack Tecnológico](#️-stack-tecnológico)
  * [✅ Prerrequisitos](#-prerrequisitos)
  * [🚀 Instalación y Puesta en Marcha](#-instalación-y-puesta-en-marcha)
    * [Opción 1: Con Docker y Docker Compose (Recomendada)](#opción-1-con-docker-y-docker-compose-recomendada)
    * [Opción 2: Instalación Manual (Sin Docker)](#opción-2-instalación-manual-sin-docker)
  * [▶️ Ejecución y Verificación](#️-ejecución-y-verificación)
  * [🧪 Testing y Calidad](#-testing-y-calidad)
  * [📁 Estructura del Proyecto](#-estructura-del-proyecto)
  * [📏 Convenciones y Estándares](#-convenciones-y-estándares)
  * [📚 Documentación Técnica y Requisitos](#-documentación-técnica-y-requisitos)
  * [👥 Roles y Capacidades del Sistema](#-roles-y-capacidades-del-sistema)
  * [🎨 Sistema de Diseño (Design System)](#-sistema-de-diseño-design-system)
  * [🎓 Propósito Educativo SENA](#-propósito-educativo-sena)
  * [⚠️ Exención de Responsabilidades](#️-exención-de-responsabilidades)
  * [📄 Licencia y Equipo](#-licencia-y-equipo)

---

## 🛠️ Stack Tecnológico

| Capa | Tecnologías | Propósito |
| :--- | :--- | :--- |
| **Backend** | Python 3.12+, FastAPI, Uvicorn, Pydantic v2, bcrypt | API REST de alto rendimiento, validación de esquemas y hashing seguro |
| **Frontend** | React 18+, TypeScript, Vite, Redux Toolkit, Axios | SPA reactiva, tipado estático estricto, gestión de estado y persistencia |
| **Base de Datos** | MySQL 8.0+ / MariaDB 10.5+ | Persistencia relacional (12 tablas, 3 vistas SQL, integridad referencial) |
| **Email (Dev/Prod)** | Python `smtplib` + MIME (Mailpit en local / SMTP TLS) | Envío de tokens seguros de recuperación de contraseña y alertas |
| **Contenedores** | Docker 24+, Docker Compose v2 | Entorno aislado y reproducible para base de datos y backend |
| **Estilos & UI** | CSS3 Moderno, Tokens semánticos, Flexbox/Grid | Diseño responsive mobile-first con temática barbería premium |

---

## ✅ Prerrequisitos

Antes de comenzar, asegúrate de contar con el siguiente software instalado:

| Herramienta | Versión mínima recomendada | Comando de verificación |
| :--- | :--- | :--- |
| **Python** | 3.12+ | `python3 --version` o `python --version` |
| **Node.js** | 20 LTS+ | `node --version` |
| **npm** o **pnpm** | npm 10+ / pnpm 9+ | `npm --version` o `pnpm --version` |
| **Docker** | 24.0+ | `docker --version` |
| **Docker Compose** | 2.20+ | `docker compose version` |
| **MySQL Server** *(si no usas Docker)* | 8.0+ | `mysql --version` |
| **Git** | 2.40+ | `git --version` |

> 🖥️ **Usuarios de Windows**: Se recomienda utilizar **Git Bash** o **WSL2** para ejecutar comandos con sintaxis bash uniforme.

---

## 🚀 Instalación y Puesta en Marcha

### Opción 1: Con Docker y Docker Compose (Recomendada)

Levanta la base de datos MySQL inicializada y el backend FastAPI en contenedores coordinados:

```bash
# 1. Clonar el repositorio
git clone https://github.com/JFelipeCa/GLOBDE-.git
cd GLOBDE-

# 2. Configurar variables de entorno del backend
cd backend
cp .env.example .env
# Ajustar credenciales si es necesario (valores por defecto ya configurados para Docker)
cd ..

# 3. Levantar contenedores en segundo plano
docker compose up -d

# 4. Iniciar el Frontend (en terminal separada)
cd frontend
pnpm install
pnpm run dev
# → Frontend disponible en: http://localhost:5173
```

### Opción 2: Instalación Manual (Sin Docker)

```bash
# 1. Base de datos MySQL local
# Conéctate a tu servidor MySQL e importa el script con las 12 tablas y vistas:
mysql -u root -p < database/database.sql

# 2. Backend (FastAPI)
cd backend
uv sync                         # crea el entorno virtual e instala dependencias
cp .env.example .env            # Configurar DB_HOST=127.0.0.1 y DB_PASSWORD

uv run uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
# → API disponible en: http://localhost:8000
# → Documentación Swagger interactiva: http://localhost:8000/docs

# 3. Frontend (React + Vite)
cd ../frontend
pnpm install
pnpm run dev
# → Aplicación disponible en: http://localhost:5173
```

> 💡 **En Windows**: Puedes hacer doble clic en el script `Arrancar-Globde.bat` en la raíz para iniciar los servicios automáticamente.

---

## ▶️ Ejecución y Verificación

| Servicio | URL Local | Descripción |
| :--- | :--- | :--- |
| **Frontend Web** | `http://localhost:5173` | Landing page, Catálogo, Login, Dashboards Cliente/Barbero/Admin |
| **Backend REST API** | `http://localhost:8000` | Punto de entrada FastAPI con endpoints versionados `/api/` |
| **Documentación Swagger** | `http://localhost:8000/docs` | Interfaz interactiva OpenAPI para pruebas de endpoints |
| **Documentación ReDoc** | `http://localhost:8000/redoc` | Especificación técnica OpenAPI en formato ReDoc |
| **Base de Datos MySQL** | `localhost:3306` | Base de datos `globde` con 12 tablas relacionales |

---

## 🧪 Testing y Calidad

### Backend (Python)
```bash
cd backend
source venv/bin/activate
# Verificación de sintaxis e importaciones
python -m py_compile app/main.py
```

### Frontend (React + TypeScript)
```bash
cd frontend
# Verificación de tipos TypeScript estricto
npx tsc --noEmit
# Verificación de linting
pnpm run lint
```

---

## 📁 Estructura del Proyecto

```
GLOBDE-/
├── .github/
│   └── copilot-instructions.md       # Reglas de arquitectura, código, seguridad y commits
├── .gitignore                        # Archivos y secretos ignorados por Git
├── Arrancar-Globde.bat               # Script automatizado para inicio en Windows
├── AUDITORIA.md                      # Revisión de calidad, hallazgos y deuda técnica
├── BITACORA.md                       # Bitácora de seguimiento del proceso de desarrollo
├── docker-compose.yml                # Orquestación de MySQL + FastAPI Backend
├── README.md                         # Documento maestro del proyecto (este archivo)
├── database/
│   └── database.sql                  # Script DDL/DML: 12 tablas, 3 vistas SQL, roles iniciales
├── backend/                          # Backend — FastAPI + Python 3.12
│   ├── app/
│   │   └── main.py                   # Endpoints REST, esquemas Pydantic, conexión MySQL, SMTP
│   ├── .env.example                  # Plantilla de variables de entorno seguras
│   ├── Dockerfile                    # Imagen Docker de producción backend
│   ├── pyproject.toml                # Dependencias de Python (gestionadas con uv)
│   └── uv.lock                       # Lockfile reproducible
├── frontend/                         # Frontend — React 18 + Vite + TypeScript
│   ├── src/
│   │   ├── api/                      # Clientes HTTP Axios (`axiosClient.ts`, `globdeApi.ts`)
│   │   ├── components/               # Componentes UI (Navbar, Header, Footer, Sidebar, Cards...)
│   │   ├── pages/                    # Vistas (LandingPage, LoginPage, DashboardAdmin/Barbero/Cliente...)
│   │   ├── store/                    # Redux Toolkit (authSlice, dataSlice, hooks, store)
│   │   ├── types.ts                  # Contratos y tipos TypeScript globales
│   │   └── utils/                    # Formateadores de fecha, moneda y estados
│   ├── package.json                  # Dependencias de Node.js
│   └── vite.config.ts                # Configuración del bundler Vite
└── docs/                             # Documentación Técnica Completa
    ├── requisitos.md                 # Índice Maestro y Matriz de Trazabilidad RF ↔ HU ↔ CU
    ├── requisitos/
    │   ├── RFs/                      # 16 Requisitos Funcionales Maestros estructurados
    │   ├── HUs/                      # 33 Historias de Usuario con Criterios Dado/Cuando/Entonces
    │   ├── CUs/                      # 33 Casos de Uso con diagramas de flujo Mermaid
    │   └── restricciones.md          # Restricciones técnicas, de negocio, legales y operativas
    ├── referencia-tecnica/
    │   ├── architecture.md           # Arquitectura en 3 capas, flujo de datos y diagramas
    │   ├── database-schema.md        # Esquema ER, diccionario de 12 tablas y 3 vistas SQL
    │   ├── api-endpoints.md          # Catálogo exhaustivo de endpoints, payloads y respuestas
    │   └── design-system.md          # Tokens de diseño, paleta, componentes y estados
    ├── conceptos/
    │   ├── patrones-arquitectonicos.md # 10 patrones arquitectónicos aplicados en Globde
    │   ├── owasp-top-10.md           # Mitigación del OWASP Top 10 aplicada al sistema
    │   └── accesibilidad-aria-wcag.md # Estándares WCAG 2.1 AA y ARIA en la UI
    ├── setup/
    │   ├── con-docker.md             # Guía detallada con Docker y Troubleshooting
    │   └── sin-docker.md             # Guía detallada manual paso a paso
    └── anexos/                       # Documentación inicial (Propuesta Técnica PDF/Excel)
```

---

## 📏 Convenciones y Estándares

| Aspecto | Convención adoptada |
| :--- | :--- |
| **Nomenclatura backend** | Endpoints REST en minúsculas en español/inglés estandarizado (`/api/citas`, `/api/login`), variables snake_case |
| **Nomenclatura frontend** | Componentes en PascalCase (`DashboardAdminPage.tsx`), hooks en camelCase (`useAppDispatch`), tipos en PascalCase |
| **Encabezados pedagógicos** | Todos los archivos de documentación inician con `<!-- ¿Qué? ¿Para qué? ¿Impacto? -->` |
| **Commits** | Conventional Commits con formato semántico y justificación: `feat(citas): agregar validacion de traslape` |
| **Seguridad de contraseñas**| Hashing obligatorio con **bcrypt** (salt rounds integrados). Nunca en texto plano |
| **Variables de entorno** | Ningún secreto hardcodeado; uso estricto de `.env` ignorado por Git con plantilla `.env.example` |

---

## 📚 Documentación Técnica y Requisitos

Accede a la documentación completa según la necesidad:

| Documento | Ubicación | Descripción |
| :--- | :--- | :--- |
| **Bitácora de Seguimiento** | [`BITACORA.md`](BITACORA.md) | Registro fase por fase del proceso de construcción del sistema |
| **Revisión de Calidad** | [`AUDITORIA.md`](AUDITORIA.md) | Estado real del proyecto, hallazgos, deuda técnica y prioridades |
| **Matriz de Requisitos** | [`docs/requisitos.md`](docs/requisitos.md) | Matriz cruzada de trazabilidad RF ↔ HU ↔ CU ↔ Endpoints |
| **Requisitos Funcionales (RFs)**| [`docs/requisitos/RFs/`](docs/requisitos/RFs/) | 16 Requisitos Funcionales con entradas, proceso, salidas y reglas |
| **Historias de Usuario (HUs)** | [`docs/requisitos/HUs/`](docs/requisitos/HUs/) | 33 HUs con criterios de aceptación `Dado que / Cuando / Entonces` |
| **Casos de Uso (CUs)** | [`docs/requisitos/CUs/`](docs/requisitos/CUs/) | 33 CUs con secuencias normales, excepciones y diagramas Mermaid |
| **Restricciones del Sistema** | [`docs/requisitos/restricciones.md`](docs/requisitos/restricciones.md) | Restricciones normativas (Ley 1581 Habeas Data), técnicas y de negocio |
| **Arquitectura de Software** | [`docs/referencia-tecnica/architecture.md`](docs/referencia-tecnica/architecture.md) | Arquitectura en 3 capas, flujo cliente-servidor y decisiones técnicas |
| **Esquema de Base de Datos** | [`docs/referencia-tecnica/database-schema.md`](docs/referencia-tecnica/database-schema.md) | Diccionario de 12 tablas, 3 vistas SQL, claves foráneas e índices |
| **Referencia de API REST** | [`docs/referencia-tecnica/api-endpoints.md`](docs/referencia-tecnica/api-endpoints.md) | Especificación de endpoints con JSON requests, status HTTP y errores |
| **Design System** | [`docs/referencia-tecnica/design-system.md`](docs/referencia-tecnica/design-system.md) | Paleta (`#000000`, `#00BCD4`, `#D4AF37`), tipografía y tokens UI |
| **Patrones Arquitectónicos** | [`docs/conceptos/patrones-arquitectonicos.md`](docs/conceptos/patrones-arquitectonicos.md) | 10 patrones aplicados (MVC/Capas, DTO, Redux Store, Interceptor...) |
| **Seguridad OWASP Top 10** | [`docs/conceptos/owasp-top-10.md`](docs/conceptos/owasp-top-10.md) | Análisis y mitigación de vulnerabilidades OWASP 2021 en Globde |
| **Accesibilidad WCAG / ARIA** | [`docs/conceptos/accesibilidad-aria-wcag.md`](docs/conceptos/accesibilidad-aria-wcag.md) | Cumplimiento de estándares de accesibilidad e inclusión web |
| **Guía de Setup Docker** | [`docs/setup/con-docker.md`](docs/setup/con-docker.md) | Despliegue en contenedores, variables y resolución de problemas |
| **Guía de Setup Manual** | [`docs/setup/sin-docker.md`](docs/setup/sin-docker.md) | Configuración manual en entornos locales |
| **Convenciones de Desarrollo** | [`.github/copilot-instructions.md`](.github/copilot-instructions.md) | Reglas técnicas y directrices internas del equipo |

---

## 👥 Roles y Capacidades del Sistema

```
┌────────────────────────────────────────────────────────────────────────┐
│                        ROLES DE USUARIO EN GLOBDE                      │
├───────────────────┬──────────────────────────┬─────────────────────────┤
│ 🧑‍💼 ADMINISTRADOR   │ 💈 BARBERO               │ 🙋 CLIENTE              │
│ (Rol ID = 1)      │ (Rol ID = 2)             │ (Rol ID = 3)            │
├───────────────────┼──────────────────────────┼─────────────────────────┤
│ • Gestión total   │ • Visualización de su    │ • Registro y perfil     │
│   de usuarios     │   agenda diaria          │   autónomo              │
│ • Administración  │ • Agendamiento manual    │ • Catálogo de servicios │
│   de servicios    │   en el salón            │   con precios y tiempos │
│ • Control de      │ • Cambio de estado de    │ • Reserva de citas      │
│   clientes        │   citas (en atención,    │   en tiempo real        │
│ • Asignación de   │   completada)            │ • Cancelación de citas  │
│   barberos        │ • Consulta de su         │   oportuna              │
│ • Reportes de     │   ranking y desempeño    │ • Historial de visitas  │
│   ingresos/citas  │ • Configuración de       │ • Calificación del      │
│ • Configuración   │   disponibilidad         │   servicio prestado     │
│   de fidelización │ • Visualización de       │ • Acumulación y saldo   │
│ • Días festivos   │   comisiones estimadas   │   de puntos de lealtad  │
└───────────────────┴──────────────────────────┴─────────────────────────┘
```

---

## 🎨 Sistema de Diseño (Design System)

La identidad visual de Globde combina elegancia clásica de barbería tradicional con modernidad digital:

| Token Semántico | Valor Hexadecimal | Uso en la Aplicación |
| :--- | :--- | :--- |
| **Color Primario (Dark / Negro)** | `#000000` / `#111827` | Fondos de dashboards, sidebar, tipografía principal y contraste |
| **Color de Acento (Cian Tecnológico)**| `#00BCD4` | Botones de acción, enlaces activos, badges de estado y focos de atención |
| **Color Secundario (Dorado Premium)** | `#D4AF37` | Puntos de fidelización, calificaciones con estrellas, distinciones VIP |
| **Superficie / Tarjetas** | `#1E293B` / `#FFFFFF` | Contenedores modulares, tablas de datos y paneles de métricas |
| **Alertas y Estados** | `#10B981` (Completada), `#F59E0B` (Pendiente), `#EF4444` (Cancelada) | Badges de citas e indicadores visuales de feedback |

---

## 🎓 Propósito Educativo SENA

Este proyecto fue desarrollado en el marco del programa **Tecnólogo en Análisis y Desarrollo de Software (ADSO)** del SENA. Su objetivo es evidenciar el dominio integral de las fases de ingeniería de software:

1. **Análisis y Especificación**: Levantamiento de requisitos formales (RF, HU, CU, RNF, Restricciones).
2. **Diseño de Software y Datos**: Modelado Entidad-Relación, normalización de base de datos y arquitectura en capas.
3. **Construcción y Desarrollo**: Implementación backend con FastAPI y frontend con React + Redux + TypeScript.
4. **Seguridad y Calidad**: Hashing de credenciales, mitigación de riesgos OWASP, accesibilidad WCAG y manejo de excepciones.

---

## ⚠️ Exención de Responsabilidades

Este software fue desarrollado con fines **formativos y educativos**:

* **Entorno Académico**: No debe ser expuesto en entornos de producción con datos reales sin antes incorporar pasarelas de pago cifradas, certificados SSL/TLS y auditorías de seguridad avanzadas.
* **Credenciales de Ejemplo**: Los valores presentes en `.env.example` son únicamente ilustrativos.
* **Protección de Datos Personales**: El sistema implementa principios de la **Ley 1581 de 2012 de Habeas Data** (Colombia) para el tratamiento de datos de contacto de clientes.

---

## 📄 Licencia y Equipo

### Licencia
Este proyecto está licenciado bajo [Creative Commons Atribución-NoComercial-CompartirIgual 4.0 Internacional (CC BY-NC-SA 4.0)](https://creativecommons.org/licenses/by-nc-sa/4.0/deed.es). Eres libre de compartir y adaptar el material para fines educativos no comerciales dando el debido crédito.

### Equipo de Desarrollo — SENA ADSO 2026

| Nombre del Aprendiz | Rol Principal en el Proyecto |
| :--- | :--- |
| **Laura** | Diseño y Administración de Base de Datos (DBA / Data Modeling) |
| **Juan Felipe Cañón** | Desarrollo Backend (FastAPI, Integración MySQL, Autenticación y Endpoints) |
| **Dayanna Patiño** | Desarrollo Frontend (React, TypeScript, Redux Toolkit, UI/UX & Responsive) |

---
*Globde — Excelencia en la gestión de servicios y barbería.*
