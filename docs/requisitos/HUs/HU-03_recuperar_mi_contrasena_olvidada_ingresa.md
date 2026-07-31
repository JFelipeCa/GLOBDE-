# HU-03 — recuperar mi contraseña olvidada ingresando mi correo electr...

[⬅ Volver al README principal](../../../README.md) · [Índice de Historias de Usuario](../../requisitos.md)

---

## Identificación

| Campo | Valor |
|---|---|
| **ID** | HU-03 |
| **Módulo** | Autenticación y Acceso |
| **Rol** | Usuario |
| **CU asociado** | CU-03 |

---

## Historia

**Como** usuario,
**quiero** recuperar mi contraseña olvidada ingresando mi correo electrónico para recibir un enlace de restablecimiento,
**para** poder recuperar el acceso a mi cuenta sin necesidad de contactar al administrador del sistema.

---

## Criterios de aceptación

- **CA-1:** Dado que el usuario ingresa un correo registrado, entonces el sistema deberá enviar un enlace de restablecimiento de contraseña.
- **CA-2:** Dado que el enlace haya expirado (más de 24 horas), entonces el sistema deberá notificarlo y ofrecer solicitar uno nuevo.
- **CA-3:** Dado que el correo no está registrado, entonces el sistema deberá mostrar un mensaje de error correspondiente.

---

[⬅ Volver al README principal](../../../README.md)
