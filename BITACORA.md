# 🧭 Bitácora de Seguimiento del Proyecto — GLOBDE

<!--
  ¿Qué? Registro cronológico del proceso de construcción del sistema GLOBDE, fase por fase.
  ¿Para qué? Documentar cómo el equipo abordó la arquitectura, la autenticación, la base de datos
             y la lógica de negocio, dejando trazabilidad de las decisiones y de los avances.
  ¿Impacto? Permite reconstruir el razonamiento técnico detrás de cada módulo y facilita
             la sustentación, el mantenimiento y la incorporación de nuevos colaboradores.
-->

> **Cómo se usa esta bitácora**: se diligencia de forma secuencial, fase por fase, a medida que el equipo avanza en el desarrollo. Cada fase cierra con una referencia al commit donde quedó la evidencia del avance en el repositorio.

---

## 👤 Datos del Proyecto

| Campo | Información |
| :--- | :--- |
| **Proyecto** | GLOBDE — Sistema de Gestión de Citas y Barbería |
| **Programa** | Tecnólogo en Análisis y Desarrollo de Software (ADSO) — SENA |
| **Equipo** | Laura (Base de Datos), Juan Felipe Cañón (Backend), Dayanna Patiño (Frontend) |
| **Repositorio** | `https://github.com/JFelipeCa/GLOBDE-` |
| **Periodo** | Febrero 2026 |

---

## 📌 Fases del Proceso de Desarrollo

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
│ Endpoints  │     │ Frontend y │     │ Calidad y  │
│ y Negocio  │     │ Redux Flow │     │  Cierre    │
└────────────┘     └────────────┘     └────────────┘
```

---

## Fase 0 — Puesta en marcha del entorno

Levantamiento del proyecto siguiendo [`docs/setup/con-docker.md`](docs/setup/con-docker.md) o [`docs/setup/sin-docker.md`](docs/setup/sin-docker.md).

- [x] Base de datos MySQL creada y poblada con `database/database.sql` (12 tablas y 3 vistas).
- [x] Backend FastAPI ejecutándose en el puerto 8000 con Swagger disponible en `/docs`.
- [x] Frontend React + Vite ejecutándose en el puerto 5173.
- [x] Inicio de sesión verificado con los tres roles del sistema (Administrador, Barbero, Cliente).

**Notas del equipo:**
```
(Observaciones de configuración: versiones usadas, ajustes en .env, incidencias resueltas)
```

**Evidencia — commit:** `________________________`

---

## Fase 1 — Definición de la arquitectura

Documentos de referencia: [`architecture.md`](docs/referencia-tecnica/architecture.md) y [`patrones-arquitectonicos.md`](docs/conceptos/patrones-arquitectonicos.md).

- [ ] Definición de la separación en 3 capas (SPA React · API REST FastAPI · MySQL).
- [ ] Documentación del recorrido completo de una petición, tomando como caso de referencia la creación de una cita.

**Recorrido de la petición (descripción del equipo):**
```
1. Frontend: el formulario de CitasPage envía los datos mediante Axios a POST /api/citas.
2. Backend: FastAPI valida el payload con el esquema Pydantic antes de ejecutar cualquier lógica.
3. Negocio: se verifica que el barbero no tenga otra cita en la misma fecha y hora.
4. Datos: se ejecuta el INSERT con consulta parametrizada sobre la tabla citas.
5. Respuesta: se retorna la cita creada y Redux actualiza el estado global de la interfaz.
```

**Evidencia — commit:** `________________________`

---

## Fase 2 — Autenticación y seguridad

Análisis de los endpoints `/api/login`, `/api/password/forgot` y `/api/password/reset`, junto con `authSlice.ts`.

- [ ] Documentar por qué las contraseñas se validan con `bcrypt.checkpw` y no con comparación directa.

```
(Descripción del equipo: el hash se recalcula con la sal almacenada y la comparación se hace
en tiempo constante, evitando exponer credenciales y mitigando ataques de temporización.)
```

- [ ] Documentar el ciclo de vida del token de recuperación y el rol de `password_reset_tokens`.

```
(Descripción del equipo: token generado con secrets.token_urlsafe(32), vigencia de 30 minutos,
marca de un solo uso y envío del enlace por correo mediante SMTP.)
```

**Evidencia — commit:** `________________________`

---

## Fase 3 — Modelo de datos y vistas SQL

Documento de referencia: [`database-schema.md`](docs/referencia-tecnica/database-schema.md).

- [ ] Verificación de las 12 tablas y sus relaciones de clave foránea.
- [ ] Documentación del propósito de las 3 vistas SQL:
  1. `vista_citas_detalle` — consolida cita, cliente, barbero y servicio en una sola consulta.
  2. `vista_clientes_resumen` — resume total de citas, puntos acumulados y última visita.
  3. `vista_ingresos_barbero` — agrupa los servicios completados y su valor por profesional.
- [ ] Revisión del comportamiento de integridad referencial en la tabla `citas`.

**Evidencia — commit:** `________________________`

---

## Fase 4 — Endpoints y reglas de negocio

Documentos de referencia: [`api-endpoints.md`](docs/referencia-tecnica/api-endpoints.md) y [`docs/requisitos/RFs/`](docs/requisitos/RFs/).

- [ ] Transición de estados de la cita mediante `PUT /api/citas/{id_cita}`.
- [ ] Acreditación de puntos de fidelización al pasar una cita a estado `Completada`.
- [ ] Filtrado de citas por barbero, cliente, fecha y estado.
- [ ] Validación de no superposición de horarios al crear una cita.

**Evidencia — commit:** `________________________`

---

## Fase 5 — Frontend, estado global y experiencia de usuario

Revisión de `frontend/src/store/` y `frontend/src/pages/`.

- [ ] Manejo de sesión y rol del usuario en `authSlice`.
- [ ] Sincronización de citas, servicios y clientes en `dataSlice`.
- [ ] Restricción de vistas por rol mediante `ProtectedRoute.tsx`.
- [ ] Comportamiento responsive verificado en resoluciones móviles y de escritorio.

**Evidencia — commit:** `________________________`

---

## Fase 6 — Calidad, seguridad y cierre

Documentos de referencia: [`AUDITORIA.md`](AUDITORIA.md) y [`owasp-top-10.md`](docs/conceptos/owasp-top-10.md).

- [ ] Verificación de tipos en el frontend (`npx tsc --noEmit`) sin errores.
- [ ] Confirmación de que no hay credenciales reales versionadas en el repositorio.
- [ ] Revisión final de la documentación y consistencia entre RFs, HUs y CUs.
- [ ] Preparación de la sustentación técnica del equipo.

**Evidencia — commit:** `________________________`

---

## ✍️ Responsables por Área

| Área | Integrante | Estado |
| :--- | :--- | :--- |
| **Base de Datos** | Laura | ____________________ |
| **Backend** | Juan Felipe Cañón | ____________________ |
| **Frontend** | Dayanna Patiño | ____________________ |
