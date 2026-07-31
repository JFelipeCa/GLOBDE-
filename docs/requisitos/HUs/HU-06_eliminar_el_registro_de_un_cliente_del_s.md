# HU-06 — eliminar el registro de un cliente del sistema cuando ya no ...

[⬅ Volver al README principal](../../../README.md) · [Índice de Historias de Usuario](../../requisitos.md)

---

## Identificación

| Campo | Valor |
|---|---|
| **ID** | HU-06 |
| **Módulo** | Gestión de Clientes, Servicios y Barberos |
| **Rol** | Administrador |
| **CU asociado** | CU-06 |

---

## Historia

**Como** administrador,
**quiero** eliminar el registro de un cliente del sistema cuando ya no sea necesario mantener su información,
**para** mantener la base de datos limpia y evitar acumulación de datos innecesarios que dificulten la gestión.

---

## Criterios de aceptación

- **CA-1:** Dado que el administrador selecciona un cliente y elige la opción eliminar, entonces el sistema deberá solicitar confirmación antes de proceder.
- **CA-2:** Dado que el administrador confirme la eliminación, entonces el sistema deberá borrar el registro y actualizarlo en la lista.
- **CA-3:** Dado que el cliente tenga citas activas, entonces el sistema deberá advertirlo y no permitir la eliminación.

---

[⬅ Volver al README principal](../../../README.md)
