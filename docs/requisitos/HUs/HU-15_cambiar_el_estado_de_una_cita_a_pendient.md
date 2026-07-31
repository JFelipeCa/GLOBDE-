# HU-15 — cambiar el estado de una cita a pendiente, en atención o com...

[⬅ Volver al README principal](../../../README.md) · [Índice de Historias de Usuario](../../requisitos.md)

---

## Identificación

| Campo | Valor |
|---|---|
| **ID** | HU-15 |
| **Módulo** | Disponibilidad y Agendamiento de Citas |
| **Rol** | Barbero |
| **CU asociado** | CU-15 |

---

## Historia

**Como** barbero,
**quiero** cambiar el estado de una cita a pendiente, en atención o completada según el desarrollo del servicio,
**para** llevar un control claro de los servicios realizados y mantener la agenda actualizada en tiempo real.

---

## Criterios de aceptación

- **CA-1:** Dado que el barbero selecciona una cita y cambia su estado, entonces el sistema deberá actualizar la información correctamente.
- **CA-2:** Dado que el estado sea actualizado a 'Completada', entonces el sistema deberá registrar la fecha y hora de finalización.
- **CA-3:** Dado que se intente cambiar el estado de una cita cancelada, entonces el sistema deberá mostrar una advertencia.

---

[⬅ Volver al README principal](../../../README.md)
