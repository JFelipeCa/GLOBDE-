# RF-005 — Gestión de Barberos y Disponibilidad Horaria

<!--
  ¿Qué? Requisito funcional para la administración de barberos, su agenda diaria y asignación de citas.
  ¿Para qué? Gestionar la capacidad operativa del salón y permitir que los clientes elijan su profesional de preferencia.
  ¿Impacto? Evita solapamiento de horarios y optimiza el tiempo productivo de cada barbero.
-->

---

## Identificación

| Campo | Valor |
| :--- | :--- |
| **ID** | RF-005 |
| **Nombre** | Gestión de Barberos y Disponibilidad Horaria |
| **Módulo** | Personal y Disponibilidad |
| **Prioridad** | Alta |
| **Estado** | Implementado |
| **HUs Asociadas** | HU-09, HU-10, HU-11 |
| **Fecha** | Febrero 2026 |

---

## Descripción

El sistema debe permitir que el administrador registre y asigne roles a barberos, consulte el perfil y ranking de cada barbero, y que el sistema calcule los bloques de horarios disponibles de cada barbero en una fecha determinada para impedir citas simultáneas.

---

## Entradas

| Campo | Tipo | Obligatorio | Validaciones |
| :--- | :--- | :--- | :--- |
| `nombre` | Texto | Sí | Nombre del profesional |
| `email` | Texto (Email) | Sí | Único en base de datos |
| `telefono` | Texto | No | Teléfono de contacto |
| `id_usuario` | Entero | Sí | Identificador del barbero |
| `fecha` | Fecha (YYYY-MM-DD) | Sí | Fecha a consultar disponibilidad |

---

## Proceso

1. El administrador da de alta al barbero con rol `id_rol = 2` mediante `POST /api/usuarios/interno`.
2. Al reservar una cita, el cliente o recepcionista selecciona al barbero y la fecha.
3. El frontend o backend consulta las citas ocupadas de ese barbero en esa fecha (`GET /api/procedimientos/citas-barbero/{id_usuario}/{fecha}`).
4. El sistema bloquea los horarios ya reservados (ej. 10:00 AM, 11:30 AM) y ofrece solo los intervalos libres.

---

## Salidas

| Escenario | Código HTTP | Respuesta JSON |
| :--- | :--- | :--- |
| Consulta de Agenda Exitosa | 200 OK | `[{"id_cita": 12, "hora": "10:00:00", "cliente": "Pedro", "servicio": "Corte Clásico", "estado": "Pendiente"}]` |
| Registro de Barbero Exitoso | 201 Created | `{"id_usuario": 4, "nombre": "Carlos Barbero", "email": "carlos@globde.com", "id_rol": 2}` |

---

## Endpoints Asociados

| Método | Ruta | Auth Requerida | Descripción |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/usuarios?id_rol=2` | Sí | Lista todos los barberos del negocio |
| `GET` | `/api/procedimientos/citas-barbero/{id_usuario}/{fecha}` | Sí | Retorna las citas de un barbero en una fecha |
