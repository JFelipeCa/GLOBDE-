# HU-21 — recibir una alerta en el panel del sistema cuando un cliente...

[⬅ Volver al README principal](../../../README.md) · [Índice de Historias de Usuario](../../requisitos.md)

---

## Identificación

| Campo | Valor |
|---|---|
| **ID** | HU-21 |
| **Módulo** | Calificaciones, Historial y Notificaciones |
| **Rol** | Administrador |
| **CU asociado** | CU-21 |

---

## Historia

**Como** administrador,
**quiero** recibir una alerta en el panel del sistema cuando un cliente cancele una cita agendada,
**para** reaccionar rápidamente, reasignar el horario a otro cliente y evitar horas sin atención en la agenda.

---

## Criterios de aceptación

- **CA-1:** Dado que un cliente cancela una cita, entonces el sistema deberá mostrar una alerta visible en el panel del administrador.
- **CA-2:** Dado que el administrador revise la notificación, entonces el sistema deberá marcarla como leída y registrar la hora de revisión.
- **CA-3:** Dado que el administrador no esté conectado, entonces la alerta deberá aparecer al próximo inicio de sesión.

---

[⬅ Volver al README principal](../../../README.md)
