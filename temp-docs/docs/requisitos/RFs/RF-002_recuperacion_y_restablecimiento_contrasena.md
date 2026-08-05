# RF-002 — Recuperación y Restablecimiento de Contraseña

<!--
  ¿Qué? Requisito funcional que define el flujo de recuperación de contraseña olvidada mediante token seguro y correo SMTP.
  ¿Para qué? Permitir a los usuarios restablecer su acceso de manera autónoma sin intervención manual del administrador.
  ¿Impacto? Reduce la carga operativa de soporte y previene bloqueos de cuentas de clientes y barberos.
-->

---

## Identificación

| Campo | Valor |
| :--- | :--- |
| **ID** | RF-002 |
| **Nombre** | Recuperación y Restablecimiento de Contraseña |
| **Módulo** | Autenticación y Seguridad |
| **Prioridad** | Alta |
| **Estado** | Implementado |
| **HUs Asociadas** | HU-03 |
| **Fecha** | Febrero 2026 |

---

## Descripción

El sistema debe permitir que cualquier usuario que haya olvidado su clave solicite un enlace de restablecimiento mediante su correo electrónico. El sistema genera un token seguro, lo almacena en la tabla `password_reset_tokens` con tiempo de expiración (30 minutos) y envía un correo mediante el servicio SMTP configurado. Con el token válido, el usuario define su nueva contraseña.

---

## Entradas

| Campo | Tipo | Obligatorio | Validaciones |
| :--- | :--- | :--- | :--- |
| `email` | Texto (Email) | Sí | Formato de correo válido registrado en `usuarios` |
| `token` | Texto | Sí | Token URL-safe criptográficamente válido |
| `nueva_contrasena` | Texto | Sí | Mínimo 6 caracteres |

---

## Proceso

1. El usuario accede a la vista de recuperación (`/forgot-password`) e ingresa su correo electrónico.
2. El backend verifica la existencia del correo en la tabla `usuarios`.
3. Si existe, genera un token con `secrets.token_urlsafe(32)` y fecha límite `datetime.now() + timedelta(minutes=30)`.
4. Inserta el registro en la tabla `password_reset_tokens`.
5. Envía un correo con el enlace `{FRONTEND_URL}/reset-password?token={token}` usando `smtplib` con STARTTLS.
6. El usuario abre el enlace en su navegador e introduce la nueva contraseña.
7. El backend valida el token: comprueba que no haya expirado y que `usado = 0`.
8. Hashea la nueva contraseña con bcrypt, actualiza `contrasena_hash` en la tabla `usuarios` y marca el token como `usado = 1`.

---

## Salidas

| Escenario | Código HTTP | Respuesta JSON |
| :--- | :--- | :--- |
| Solicitud de Token Enviada | 200 OK | `{"detail": "Si el correo existe, se ha enviado un enlace de recuperación."}` |
| Restablecimiento Exitoso | 200 OK | `{"detail": "Contraseña actualizada exitosamente. Ya puedes iniciar sesión."}` |
| Token Inválido o Expirado | 400 Bad Request | `{"detail": "El token de recuperación es inválido o ha expirado"}` |

---

## Endpoints Asociados

| Método | Ruta | Auth Requerida | Descripción |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/password/forgot` | No | Genera token y envía correo de recuperación |
| `POST` | `/api/password/reset` | No | Aplica nueva contraseña si el token es válido |

---

## Reglas de Negocio

- **RN-002.1**: Los tokens de recuperación expiran en 30 minutos.
- **RN-002.2**: Un token solo puede ser utilizado una única vez (`usado = 1`).
- **RN-002.3**: Por seguridad contra enumeración de usuarios, la respuesta al solicitar token no debe indicar si el correo existe o no en la BD.
