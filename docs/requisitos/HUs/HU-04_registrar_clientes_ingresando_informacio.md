# HU-04 — registrar clientes ingresando información como nombre, númer...

[⬅ Volver al README principal](../../../README.md) · [Índice de Historias de Usuario](../../requisitos.md)

---

## Identificación

| Campo | Valor |
|---|---|
| **ID** | HU-04 |
| **Módulo** | Gestión de Clientes, Servicios y Barberos |
| **Rol** | Administrador |
| **CU asociado** | CU-04 |

---

## Historia

**Como** administrador,
**quiero** registrar clientes ingresando información como nombre, número de teléfono y correo electrónico,
**para** tener una base de datos organizada que permita identificar y contactar fácilmente a los clientes de la barbería.

---

## Criterios de aceptación

- **CA-1:** Dado que el administrador ingresa todos los datos obligatorios del cliente, entonces el sistema deberá guardar el registro y mostrarlo en la lista de clientes.
- **CA-2:** Dado que falta información obligatoria, entonces el sistema deberá mostrar un mensaje de error indicando los campos faltantes.
- **CA-3:** Dado que el correo o teléfono ya existe, entonces el sistema deberá indicar que el cliente ya está registrado.

---

[⬅ Volver al README principal](../../../README.md)
