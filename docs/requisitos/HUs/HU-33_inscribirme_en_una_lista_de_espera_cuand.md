# HU-33 — inscribirme en una lista de espera cuando todos los horarios...

[⬅ Volver al README principal](../../../README.md) · [Índice de Historias de Usuario](../../requisitos.md)

---

## Identificación

| Campo | Valor |
|---|---|
| **ID** | HU-33 |
| **Módulo** | Lista de Espera |
| **Rol** | Cliente |
| **CU asociado** | CU-33 |

---

## Historia

**Como** cliente,
**quiero** inscribirme en una lista de espera cuando todos los horarios disponibles para una fecha estén ocupados,
**para** ser notificado automáticamente cuando se libere un turno sin tener que revisar el calendario repetidamente.

---

## Criterios de aceptación

- **CA-1:** Dado que todos los horarios de una fecha están ocupados, entonces el sistema deberá ofrecer al cliente la opción de unirse a la lista de espera.
- **CA-2:** Dado que se libere un horario por cancelación, entonces el sistema deberá notificar automáticamente al primer cliente de la lista de espera.
- **CA-3:** Dado que el cliente en lista de espera no confirme el turno en 30 minutos, entonces el sistema deberá ofrecerlo al siguiente cliente de la lista.

---

[⬅ Volver al README principal](../../../README.md)
