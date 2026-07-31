# HU-22 — enviar notificaciones masivas a los clientes sobre promocion...

[⬅ Volver al README principal](../../../README.md) · [Índice de Historias de Usuario](../../requisitos.md)

---

## Identificación

| Campo | Valor |
|---|---|
| **ID** | HU-22 |
| **Módulo** | Calificaciones, Historial y Notificaciones |
| **Rol** | Administrador |
| **CU asociado** | CU-22 |

---

## Historia

**Como** administrador,
**quiero** enviar notificaciones masivas a los clientes sobre promociones, cambios de horario o comunicados del negocio,
**para** mantener informados a los clientes de manera oportuna y directa sin necesidad de usar medios externos al sistema.

---

## Criterios de aceptación

- **CA-1:** Dado que el administrador redacta un mensaje y selecciona destinatarios, entonces el sistema deberá enviar la notificación por correo a todos los seleccionados.
- **CA-2:** Dado que no se seleccione ningún destinatario, entonces el sistema deberá mostrar: 'Debe seleccionar al menos un destinatario'.
- **CA-3:** Dado que el envío sea exitoso, entonces el sistema deberá mostrar un resumen con la cantidad de mensajes enviados.

---

[⬅ Volver al README principal](../../../README.md)
