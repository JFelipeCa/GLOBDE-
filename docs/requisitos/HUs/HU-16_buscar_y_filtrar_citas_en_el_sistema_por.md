# HU-16 — buscar y filtrar citas en el sistema por fecha, barbero, cli...

[⬅ Volver al README principal](../../../README.md) · [Índice de Historias de Usuario](../../requisitos.md)

---

## Identificación

| Campo | Valor |
|---|---|
| **ID** | HU-16 |
| **Módulo** | Disponibilidad y Agendamiento de Citas |
| **Rol** | Administrador |
| **CU asociado** | CU-16 |

---

## Historia

**Como** administrador,
**quiero** buscar y filtrar citas en el sistema por fecha, barbero, cliente o estado para localizar información específica,
**para** ahorrar tiempo al gestionar el negocio y poder consultar el historial de citas sin revisar toda la agenda manualmente.

---

## Criterios de aceptación

- **CA-1:** Dado que el administrador aplica uno o más filtros, entonces el sistema deberá mostrar solo las citas que coincidan con los criterios.
- **CA-2:** Dado que no haya resultados con los filtros aplicados, entonces el sistema deberá mostrar el mensaje: 'No se encontraron citas'.
- **CA-3:** Dado que el administrador elimine los filtros, entonces el sistema deberá mostrar todas las citas nuevamente.

---

[⬅ Volver al README principal](../../../README.md)
