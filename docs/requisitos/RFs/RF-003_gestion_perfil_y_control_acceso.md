# RF-003 — Gestión de Perfil y Control de Acceso por Rol

<!--
  ¿Qué? Requisito funcional para la administración de perfiles de usuario, roles y activación/desactivación de cuentas.
  ¿Para qué? Proveer mantenimiento a los usuarios internos y garantizar que cada rol acceda solo a sus módulos permitidos.
  ¿Impacto? Garantiza la integridad del sistema impidiendo que clientes o barberos accedan a funciones administrativas.
-->

---

## Identificación

| Campo | Valor |
| :--- | :--- |
| **ID** | RF-003 |
| **Nombre** | Gestión de Perfil y Control de Acceso por Rol |
| **Módulo** | Administración y Seguridad |
| **Prioridad** | Alta |
| **Estado** | Implementado |
| **HUs Asociadas** | HU-02, HU-08 |
| **Fecha** | Febrero 2026 |

---

## Descripción

El sistema debe permitir la actualización de la información de perfil del usuario en sesión, así como la administración de cuentas internas (Barberos y Administradores) por parte del Administrador del negocio, incluyendo la creación, modificación y desactivación lógica de cuentas.

---

## Entradas

| Campo | Tipo | Obligatorio | Validaciones |
| :--- | :--- | :--- | :--- |
| `id_usuario` | Entero | Sí | Identificador numérico del usuario |
| `nombre` | Texto | Sí | Mínimo 3 caracteres |
| `telefono` | Texto | No | 7 a 10 dígitos numéricos |
| `activo` | Booleano / Entero (0 o 1) | Sí | Estado de habilitación del usuario en el sistema |

---

## Proceso

1. El usuario o administrador accede a la sección de Perfil o Gestión de Usuarios en el panel.
2. Modifica los campos permitidos y envía la solicitud.
3. El backend valida permisos:
   - Los clientes y barberos solo pueden actualizar sus propios datos de contacto.
   - Solo el Administrador (`id_rol = 1`) puede cambiar el estado `activo` o registrar nuevos usuarios internos.
4. El backend actualiza la tabla `usuarios` y retorna los datos actualizados.

---

## Salidas

| Escenario | Código HTTP | Respuesta JSON |
| :--- | :--- | :--- |
| Actualización Exitosa | 200 OK | `{"detail": "Usuario actualizado exitosamente", "usuario": {...}}` |
| Desactivación Exitosa | 200 OK | `{"detail": "Usuario desactivado correctamente"}` |
| Usuario No Encontrado | 404 Not Found | `{"detail": "Usuario no encontrado"}` |

---

## Endpoints Asociados

| Método | Ruta | Auth Requerida | Descripción |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/usuarios` | Sí (Admin) | Lista todos los usuarios con sus roles |
| `PUT` | `/api/usuarios/{id_usuario}` | Sí | Actualiza información del usuario |
| `PUT` | `/api/usuarios/interno/{id_usuario}/desactivar` | Sí (Admin) | Desactiva lógicamente una cuenta |

---

## Reglas de Negocio

- **RN-003.1**: No se permite la eliminación física (hard delete) de usuarios para preservar el histórico de citas y facturación.
- **RN-003.2**: Las cuentas desactivadas (`activo = 0`) no pueden iniciar sesión.
