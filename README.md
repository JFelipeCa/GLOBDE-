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
- [Metodología de Trabajo](#metodología-de-trabajo)
- [Equipo de Desarrollo](#equipo-de-desarrollo)
- [Limitaciones](#limitaciones)

---

## Descripción

**Globde** es una solución web integral para la gestión de citas en barberías, desarrollada por un equipo de aprendices ADSO del SENA. El sistema permite a los **clientes** reservar citas de forma autónoma, a los **barberos** organizar su agenda diaria y a los **administradores** controlar clientes, servicios, personal, reportes y fidelización — todo desde una interfaz moderna, segura y responsive.

📄 Documento completo: [Propuesta Técnica (PDF)](<docs/PROPUESTA TÉCNICA.pdf>)

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
| **Frontend** | React, TypeScript, Vite, Redux (authSlice), CSS |
| **Backend** | FastAPI, Python |
| **Base de Datos** | MySQL (11 tablas, 3 vistas, 5 procedimientos almacenados) |
| **Control de versiones** | GitHub |
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

La base de datos en **MySQL** está compuesta por:

- **11 tablas** — usuarios, clientes, barberos, servicios, citas, horarios, puntos, notificaciones, lista de espera, calificaciones, días no laborales, entre otras.
- **3 vistas SQL** — consultas optimizadas para reportes y disponibilidad.
- **5 procedimientos almacenados** — lógica reutilizable para operaciones críticas (agendamiento, cálculo de puntos, reportes, etc.).
- **30+ registros de prueba** para validación funcional.

## Historias de Usuario

El proyecto cuenta con **33 Historias de Usuario (HU-01 a HU-33)**, cada una con su enunciado en formato *"Como [rol], quiero [funcionalidad], para [resultado]"* y sus respectivos criterios de aceptación. Cubren desde autenticación y gestión de clientes hasta reportes administrativos y lista de espera.

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

📄 Documento completo: [Globde_HU_V2.xlsx](docs/Globde_HU_V2.xlsx)

## Casos de Uso

El sistema documenta **33 Casos de Uso (CU-01 a CU-33)**, alineados uno a uno con las Historias de Usuario, con actores, precondiciones, postcondiciones, secuencia normal, excepciones, rendimiento y frecuencia de uso. Adicionalmente se cuenta con **diagramas UML de casos de uso** que ilustran las relaciones `«include»` y `«extend»` entre procesos (por ejemplo: *Registrar Usuario* incluye *Validar Datos*, *Asignar Rol* y *Enviar Correo*).

📄 Documentos: [Casos de Uso (PDF)](docs/Globde_Casos_de_Uso_V2.docx.pdf) · [Diagramas de Casos de Uso (PDF)](docs/Globde_Diagramas_de_Uso_V2.docx.pdf)

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
globde/
├── frontend/                 # React + TypeScript + Vite
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── store/            # Redux - authSlice (persistencia con localStorage)
│   │   └── routes/           # react-router-dom
│   └── package.json
├── backend/                  # FastAPI + Python
│   ├── app/
│   │   ├── routers/
│   │   ├── models/
│   │   └── services/
│   └── requirements.txt
├── database/
│   ├── schema.sql            # 11 tablas
│   ├── views.sql             # 3 vistas
│   └── procedures.sql        # 5 procedimientos almacenados
├── docs/
│   ├── PROPUESTA TÉCNICA.pdf
│   ├── Globde_HU_V2.xlsx
│   ├── Globde_Casos_de_Uso_V2.docx.pdf
│   └── Globde_Diagramas_de_Uso_V2.docx.pdf
└── README.md
```

## Instalación y Puesta en Marcha

```bash
# 1. Clonar el repositorio
git clone https://github.com/tu-usuario/globde.git
cd globde

# 2. Backend (FastAPI)
cd backend
python -m venv venv
source venv/bin/activate      # En Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload

# 3. Frontend (React + Vite)
cd ../frontend
npm install
npm run dev

# 4. Base de datos
# Importar schema.sql, views.sql y procedures.sql en MySQL Workbench
```

## Metodología de Trabajo

El proyecto se desarrolló bajo la metodología ágil **Scrum**, organizando el trabajo en **6 sprints** con un total de **33 historias de usuario** distribuidas según prioridad y dependencia funcional, documentadas en el Sprint Backlog del equipo.

## Equipo de Desarrollo

| Integrante | Rol principal |
|---|---|
| **Laura** | Frontend & UI/UX |
| **Juan Felipe Cañón** | Desarrollo |
| **Dayanna Patiño** | Desarrollo |

Proyecto desarrollado como parte del programa **ADSO (Análisis y Desarrollo de Software)** – SENA CGMLTIC Fontibón.

## Limitaciones

- Requiere conexión a internet para funcionar.
- Solo usuarios registrados pueden agendar citas.
- La primera versión **no incluye pagos en línea**.
- Las notificaciones dependen del correo electrónico registrado.
- La capacidad de almacenamiento depende del servidor utilizado.

---

<div align="center">

Hecho con 💈 y ☕ por el equipo Globde — SENA ADSO 2026

</div>
