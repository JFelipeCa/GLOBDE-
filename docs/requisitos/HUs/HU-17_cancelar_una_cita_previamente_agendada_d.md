# HU-17 — cancelar una cita previamente agendada desde mi perfil en la...

[⬅ Volver al README principal](../../../README.md) · [Índice de Historias de Usuario](../../requisitos.md)

---

## Identificación

| Campo | Valor |
|---|---|
| **ID** | HU-17 |
| **Módulo** | Disponibilidad y Agendamiento de Citas |
| **Rol** | Cliente |
| **CU asociado** | CU-17 |

---

## Historia

**Como** cliente,
**quiero** cancelar una cita previamente agendada desde mi perfil en la plataforma web,
**para** liberar el horario con anticipación y evitar inconvenientes tanto para mí como para el negocio.

---

## Criterios de aceptación

- **CA-1:** Dado que el cliente selecciona cancelar una cita activa, entonces el sistema deberá solicitar confirmación antes de proceder.
- **CA-2:** Dado que el cliente confirme la cancelación, entonces el sistema deberá liberar el horario y notificar al barbero asignado.
- **CA-3:** Dado que la cancelación se realice con menos de 2 horas de anticipación, entonces el sistema deberá mostrar una advertencia al cliente.

---

[⬅ Volver al README principal](../../../README.md)
