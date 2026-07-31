# HU-08 — desactivar temporalmente un servicio del catálogo para que n...

[⬅ Volver al README principal](../../../README.md) · [Índice de Historias de Usuario](../../requisitos.md)

---

## Identificación

| Campo | Valor |
|---|---|
| **ID** | HU-08 |
| **Módulo** | Gestión de Clientes, Servicios y Barberos |
| **Rol** | Administrador |
| **CU asociado** | CU-08 |

---

## Historia

**Como** administrador,
**quiero** desactivar temporalmente un servicio del catálogo para que no esté disponible para nuevas reservas,
**para** gestionar servicios que están fuera de temporada o no disponibles sin necesidad de eliminarlos del sistema.

---

## Criterios de aceptación

- **CA-1:** Dado que el administrador selecciona un servicio activo y lo desactiva, entonces el sistema deberá ocultarlo del catálogo de reservas.
- **CA-2:** Dado que el servicio esté desactivado, entonces los clientes no podrán seleccionarlo al agendar una cita.
- **CA-3:** Dado que el administrador reactive el servicio, entonces deberá volver a aparecer en el catálogo disponible.

---

[⬅ Volver al README principal](../../../README.md)
