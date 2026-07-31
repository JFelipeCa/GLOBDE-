# HU-01 — registrar nuevos usuarios al sistema ingresando información ...

[⬅ Volver al README principal](../../../README.md) · [Índice de Historias de Usuario](../../requisitos.md)

---

## Identificación

| Campo | Valor |
|---|---|
| **ID** | HU-01 |
| **Módulo** | Autenticación y Acceso |
| **Rol** | Administrador |
| **CU asociado** | CU-01 |

---

## Historia

**Como** administrador,
**quiero** registrar nuevos usuarios al sistema ingresando información como nombre, correo electrónico, contraseña y rol dentro de la barbería,
**para** poder controlar y administrar de manera segura quién tiene acceso al sistema y qué permisos tiene dentro de la plataforma.

---

## Criterios de aceptación

- **CA-1:** Dado que el administrador ingresa todos los datos obligatorios (nombre, correo, contraseña y rol), entonces el sistema deberá guardar el usuario y mostrar un mensaje de confirmación.
- **CA-2:** Dado que el correo ingresado ya existe, entonces el sistema deberá mostrar un mensaje indicando que el correo ya está registrado.
- **CA-3:** Dado que falta un dato obligatorio, entonces el sistema deberá mostrar un mensaje de error indicando el campo faltante.

---

[⬅ Volver al README principal](../../../README.md)
