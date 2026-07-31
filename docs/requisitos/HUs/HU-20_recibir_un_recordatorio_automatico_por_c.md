# HU-20 — recibir un recordatorio automático por correo electrónico 24...

[⬅ Volver al README principal](../../../README.md) · [Índice de Historias de Usuario](../../requisitos.md)

---

## Identificación

| Campo | Valor |
|---|---|
| **ID** | HU-20 |
| **Módulo** | Calificaciones, Historial y Notificaciones |
| **Rol** | Cliente |
| **CU asociado** | CU-20 |

---

## Historia

**Como** cliente,
**quiero** recibir un recordatorio automático por correo electrónico 24 horas antes de mi cita programada,
**para** no olvidar mi turno y llegar puntualmente al establecimiento sin necesidad de revisar la plataforma constantemente.

---

## Criterios de aceptación

- **CA-1:** Dado que existe una cita confirmada, entonces el sistema deberá enviar automáticamente un correo de recordatorio 24 horas antes.
- **CA-2:** Dado que el correo no pueda enviarse, entonces el sistema deberá registrar el fallo y reintentarlo en los próximos 30 minutos.
- **CA-3:** Dado que la cita sea cancelada antes del recordatorio, entonces el sistema no deberá enviar la notificación.

---

[⬅ Volver al README principal](../../../README.md)
