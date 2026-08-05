# 🧭 Bitácora Obligatoria del Aprendiz — GLOBDE

<!--
  ¿Qué? Checklist secuencial obligatorio de verificación formativa para el proyecto GLOBDE.
  ¿Para qué? Demostrar la comprensión real de la arquitectura fullstack (FastAPI, React+Redux, MySQL, Docker)
             mediante trazabilidad de commits y sustentación técnica en vez de una copia superficial.
  ¿Impacto? Permite al instructor del SENA auditar de manera objetiva el progreso y la autoría
             del equipo en cada una de las capas del software desarrollado.
-->

> **Regla de oro formativa**: Esta bitácora se diligencia de forma **secuencial**, fase por fase. No se avanza a la siguiente fase sin haber cerrado y validado la anterior. El instructor evalúa las evidencias directamente en el historial de Git de tu repositorio (`git log`, diffs de commits) y en la sustentación oral del equipo.

---

## 👤 Datos de Identificación

| Campo | Información del Equipo |
| :--- | :--- |
| **Proyecto** | GLOBDE — Sistema de Gestión de Citas y Barbería |
| **Programa** | Tecnólogo en Análisis y Desarrollo de Software (ADSO) — SENA |
| **Ficha** | ADSO 2026 |
| **Integrantes** | Laura (DB), Juan Felipe Cañón (Backend), Dayanna Patiño (Frontend) |
| **Repositorio** | `https://github.com/JFelipeCa/GLOBDE-` |
| **Fecha de Inicio** | Febrero 2026 |

---

## 📌 Resumen de Fases de la Bitácora

```
┌────────────┐     ┌────────────┐     ┌────────────┐     ┌────────────┐
│   FASE 0   │ ──▶ │   FASE 1   │ ──▶ │   FASE 2   │ ──▶ │   FASE 3   │
│  Entorno y │     │Arquitectura│     │  Flujo de  │     │ Base Datos │
│ Bootstrap  │     │ de Capas   │     │Auth/Login  │     │ y Vistas   │
└────────────┘     └────────────┘     └────────────┘     └────────────┘
       │
       ▼
┌────────────┐     ┌────────────┐     ┌────────────┐
│   FASE 4   │ ──▶ │   FASE 5   │ ──▶ │   FASE 6   │
│ Endpoints  │     │ Frontend y │     │Seguridad y │
│ y Negocio  │     │ Redux Flow │     │ Auditoría  │
└────────────┘     └────────────┘     └────────────┘
```

---

## Fase 0 — Verificación del Entorno y Ejecución Local

Levanta el proyecto siguiendo la guía de [`docs/setup/con-docker.md`](docs/setup/con-docker.md) o [`docs/setup/sin-docker.md`](docs/setup/sin-docker.md).

- [x] Contenedor de base de datos MySQL levantado y base de datos `globde` poblada con el script `database.sql`.
- [x] Backend FastAPI corriendo en el puerto 8000 (`http://localhost:8000/docs`).
- [x] Frontend React + Vite corriendo en el puerto 5173 (`http://localhost:5173`).
- [x] Inicio de sesión exitoso con los 3 perfiles de prueba:
  - Administrador: `admin@globde.com`
  - Barbero: `carlos.barbero@globde.com`
  - Cliente: `juan.cliente@globde.com`
- [ ] **Commit de evidencia**: `docs: bitácora fase 0 entorno verificado` → Hash del commit: `________________________`

---

## Fase 1 — Comprensión de la Arquitectura del Sistema

Estudia los documentos [`docs/referencia-tecnica/architecture.md`](docs/referencia-tecnica/architecture.md) y [`docs/conceptos/patrones-arquitectonicos.md`](docs/conceptos/patrones-arquitectonicos.md).

- [ ] **Explicación técnica (10 a 15 líneas)**: Explica cómo viaja una petición desde que un cliente hace clic en "Reservar Cita" en React hasta que se guarda en la tabla `citas` de MySQL y retorna la respuesta:

```
[Escribe aquí tu análisis técnico de la petición:
1. En el frontend: el componente CitasPage despacha la acción a través de Axios al endpoint POST /api/citas...
2. En el backend: FastAPI recibe el payload con el esquema Pydantic CitaCreate, valida los tipos de datos...
3. En la base de datos: la función execute ejecuta el INSERT INTO citas con parámetros seguros previniendo SQLi...
4. Respuesta: FastAPI retorna status 200 con el objeto de la cita serializado y Redux actualiza el estado...]
```

- [ ] **Commit de evidencia**: `docs: bitácora fase 1 comprension arquitectonica` → Hash del commit: `________________________`

---

## Fase 2 — Trazabilidad del Flujo de Autenticación y Seguridad

Analiza el endpoint `/api/login` y `/api/password/forgot` en `backend/app/main.py` y `frontend/src/store/authSlice.ts`.

- [ ] Responder: ¿Por qué las contraseñas nunca se comparan con `==` en texto plano y qué función cumple `bcrypt.checkpw`?
```
[Tu respuesta aquí: bcrypt.checkpw toma la contraseña enviada, le aplica la misma función hash con el salt almacenado en la columna contrasena_hash de la tabla usuarios y realiza una comparación en tiempo constante, evitando vulnerabilidades de timing attacks y exposición de credenciales...]
```
- [ ] Responder: ¿Qué ocurre si un usuario solicita recuperar su contraseña y qué función cumple la tabla `password_reset_tokens`?
```
[Tu respuesta aquí: Se genera un token criptográfico seguro con secrets.token_urlsafe(32), se almacena con timestamp de expiración (30 minutos) asociado al id_usuario y se envía por correo electrónico...]
```
- [ ] **Commit de evidencia**: `docs: bitácora fase 2 analisis auth` → Hash del commit: `________________________`

---

## Fase 3 — Modelo de Datos, Vistas y Reglas de Integridad

Revisa [`docs/referencia-tecnica/database-schema.md`](docs/referencia-tecnica/database-schema.md) y `database/database.sql`.

- [ ] Identifica las 3 Vistas SQL creadas en la base de datos de Globde y su propósito:
  1. `vista_citas_detalle`: Consolida la información de la cita, uniendo las tablas `citas`, `clientes`, `usuarios` (barbero) y `servicios` para evitar múltiples `JOIN` en el backend.
  2. `vista_clientes_resumen`: Resume el total de citas, puntos acumulados y última visita de cada cliente.
  3. `vista_ingresos_barbero`: Calcula el consolidado financiero de servicios completados agrupados por profesional.
- [ ] Verificar claves foráneas (FK) con `ON DELETE RESTRICT` o `ON DELETE CASCADE` en la tabla `citas`.
- [ ] **Commit de evidencia**: `docs: bitácora fase 3 verificacion modelo de datos` → Hash del commit: `________________________`

---

## Fase 4 — Lógica de Negocio y Endpoints REST

Revisa [`docs/referencia-tecnica/api-endpoints.md`](docs/referencia-tecnica/api-endpoints.md) y los 16 Requisitos Funcionales en [`docs/requisitos/RFs/`](docs/requisitos/RFs/).

- [ ] Comprobar el endpoint de cambio de estado de cita: `PUT /api/citas/{id_cita}`.
- [ ] Comprobar el algoritmo de acumulación de puntos de fidelización (10% del valor del servicio en puntos).
- [ ] Comprobar el endpoint de filtrado de citas por barbero y fecha: `GET /api/citas?id_barbero=X&fecha=YYYY-MM-DD`.
- [ ] **Commit de evidencia**: `docs: bitácora fase 4 logica de negocio y endpoints` → Hash del commit: `________________________`

---

## Fase 5 — Frontend, Redux Toolkit y Experiencia de Usuario

Revisa `frontend/src/store/` y `frontend/src/pages/`.

- [ ] Verificar el manejo de estado global con Redux (`authSlice` para usuario autenticado y rol; `dataSlice` para sincronización de datos).
- [ ] Verificar la protección de rutas con `ProtectedRoute.tsx` restringiendo el acceso según el rol (`ROL_ADMINISTRADOR = 1`, `ROL_BARBERO = 2`, `ROL_CLIENTE = 3`).
- [ ] Comprobar la responsividad en vistas móviles (menú desplegable, tablas adaptables y modal de agendamiento).
- [ ] **Commit de evidencia**: `docs: bitácora fase 5 frontend y redux` → Hash del commit: `________________________`

---

## Fase 6 — Auditoría de Calidad, Seguridad OWASP y Cierre

Estudia [`AUDITORIA.md`](AUDITORIA.md) y [`docs/conceptos/owasp-top-10.md`](docs/conceptos/owasp-top-10.md).

- [ ] Ejecutar comprobación de sintaxis de tipos en frontend (`npx tsc --noEmit`).
- [ ] Verificar que ninguna clave o contraseña real esté expuesta en el historial público de Git.
- [ ] Sustentación final del proyecto ante el instructor del SENA.
- [ ] **Commit de evidencia**: `docs: bitácora fase 6 cierre y auditoria final` → Hash del commit: `________________________`

---

## ✍️ Firma y Aprobación del Equipo

| Rol | Aprendiz | Firma / Estado |
| :--- | :--- | :--- |
| **Líder de Base de Datos** | Laura | ____________________ |
| **Líder de Backend** | Juan Felipe Cañón | ____________________ |
| **Líder de Frontend** | Dayanna Patiño | ____________________ |
| **Instructor Evaluador** | Docente SENA ADSO | ____________________ |
