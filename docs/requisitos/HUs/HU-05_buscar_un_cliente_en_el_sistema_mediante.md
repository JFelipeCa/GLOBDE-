# HU-05 — buscar un cliente en el sistema mediante su nombre o número ...

[⬅ Volver al README principal](../../../README.md) · [Índice de Historias de Usuario](../../requisitos.md)

---

## Identificación

| Campo | Valor |
|---|---|
| **ID** | HU-05 |
| **Módulo** | Gestión de Clientes, Servicios y Barberos |
| **Rol** | Administrador |
| **CU asociado** | CU-05 |

---

## Historia

**Como** administrador,
**quiero** buscar un cliente en el sistema mediante su nombre o número de teléfono para ubicarlo de forma rápida,
**para** ahorrar tiempo al gestionar citas y consultar información de clientes frecuentes sin revisar la lista completa.

---

## Criterios de aceptación

- **CA-1:** Dado que el administrador ingresa un nombre o teléfono, entonces el sistema deberá mostrar los clientes que coincidan con la búsqueda.
- **CA-2:** Dado que no existan coincidencias, entonces el sistema deberá mostrar el mensaje: 'No se encontraron clientes con ese criterio'.
- **CA-3:** Dado que el campo de búsqueda esté vacío, entonces el sistema deberá mostrar la lista completa de clientes.

---

[⬅ Volver al README principal](../../../README.md)
