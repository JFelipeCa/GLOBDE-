# RF-010 — Cancelación, Reprogramación y Penalidades

<!--
  ¿Qué? Requisito funcional para la anulación oportuna o reprogramación de citas y registro de penalidades por inasistencia.
  ¿Para qué? Gestionar cancelaciones ordenadas y liberar los cupos en la agenda del barbero para otros clientes.
  ¿Impacto? Evita pérdidas económicas por ausentismo injustificado de clientes (no-shows).
-->

---

## Identificación

| Campo | Valor |
| :--- | :--- |
| **ID** | RF-010 |
| **Nombre** | Cancelación, Reprogramación y Penalidades |
| **Módulo** | Citas y Reservas |
| **Prioridad** | Alta |
| **Estado** | Implementado |
| **HUs Asociadas** | HU-17, HU-21 |
| **Fecha** | Febrero 2026 |

---

## Descripción

El sistema debe permitir a los clientes cancelar una cita con al menos 2 horas de anticipación sin penalidad, o al administrador cancelar o reprogramar una cita en caso de fuerza mayor. Si un cliente cancela a última hora o no asiste, el sistema puede registrar una penalidad en la tabla `penalidades`.

---

## Entradas

| Campo | Tipo | Obligatorio | Validaciones |
| :--- | :--- | :--- | :--- |
| `id_cita` | Entero | Sí | Identificador de la cita |
| `motivo` | Texto | No | Justificación de la cancelación |

---

## Proceso

1. El cliente selecciona su cita activa y pulsa "Cancelar Cita".
2. El backend calcula la diferencia horaria entre la hora actual y la hora de la cita.
3. Si la diferencia es menor al tiempo límite (2 horas), marca advertencia y actualiza el estado a `'Cancelada'`.
4. El horario del barbero queda liberado inmediatamente para nuevas reservas.

---

## Salidas

| Escenario | Código HTTP | Respuesta JSON |
| :--- | :--- | :--- |
| Cancelación Exitosa | 200 OK | `{"id_cita": 10, "estado": "Cancelada", "detail": "Cita cancelada correctamente"}` |

---

## Endpoints Asociados

| Método | Ruta | Auth Requerida | Descripción |
| :--- | :--- | :--- | :--- |
| `PUT` | `/api/citas/{id_cita}` | Sí | Actualiza estado a 'Cancelada' |
