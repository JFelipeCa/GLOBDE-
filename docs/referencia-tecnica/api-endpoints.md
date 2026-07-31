# 🔌 Endpoints de la API — Globde

[⬅ Volver al README principal](../../README.md)

Todos los endpoints están definidos en [`backend/app/main.py`](../../backend/app/main.py) y expuestos bajo el prefijo `/api/` (excepto la raíz `/`). La documentación interactiva de FastAPI (Swagger) está disponible en `http://localhost:8000/docs` cuando el backend está corriendo.

---

## Autenticación

| Método | Endpoint | Función | Descripción |
|---|---|---|---|
| `GET` | `/` | `inicio()` | Verifica que la API esté activa. |
| `POST` | `/api/login` | `login()` | Autentica al usuario con correo y contraseña. |
| `POST` | `/api/password/forgot` | `solicitar_recuperacion_password()` | Solicita el envío de un enlace de recuperación de contraseña. |
| `POST` | `/api/password/reset` | `restablecer_password()` | Restablece la contraseña usando el token recibido por correo. |

## Datos generales / Reportes

| Método | Endpoint | Función | Descripción |
|---|---|---|---|
| `GET` | `/api/datos` | `obtener_datos()` | Devuelve datos generales usados por el frontend. |
| `GET` | `/api/vistas/citas` | `vista_citas()` | Vista consolidada de citas. |
| `GET` | `/api/vistas/clientes` | `vista_clientes()` | Vista consolidada de clientes. |
| `GET` | `/api/vistas/ingresos` | `vista_ingresos()` | Vista consolidada de ingresos del negocio. |
| `GET` | `/api/procedimientos/servicios` | `proc_servicios()` | Reporte de servicios más solicitados. |
| `GET` | `/api/procedimientos/citas-barbero/{id_usuario}/{fecha}` | `proc_citas_barbero()` | Citas de un barbero específico en una fecha dada. |
| `GET` | `/api/procedimientos/reporte/{anio}/{mes}` | `proc_reporte_mensual()` | Reporte de ingresos de un mes/año específico. |

## Clientes

| Método | Endpoint | Función | Descripción |
|---|---|---|---|
| `GET` | `/api/clientes` | `listar_clientes()` | Lista todos los clientes registrados. |
| `POST` | `/api/clientes` | `crear_cliente()` | Registra un nuevo cliente. |

## Usuarios

| Método | Endpoint | Función | Descripción |
|---|---|---|---|
| `GET` | `/api/usuarios` | `listar_usuarios()` | Lista todos los usuarios del sistema. |
| `PUT` | `/api/usuarios/{id_usuario}` | `actualizar_usuario()` | Actualiza el perfil de un usuario. |
| `POST` | `/api/usuarios/interno` | `crear_usuario_interno()` | Registra un usuario interno (administrador/barbero). |
| `PUT` | `/api/usuarios/interno/{id_usuario}/desactivar` | `desactivar_usuario()` | Desactiva un usuario interno. |

## Servicios

| Método | Endpoint | Función | Descripción |
|---|---|---|---|
| `GET` | `/api/servicios` | `listar_servicios()` | Lista el catálogo de servicios. |
| `POST` | `/api/servicios` | `crear_servicio()` | Registra un nuevo servicio. |

## Citas

| Método | Endpoint | Función | Descripción |
|---|---|---|---|
| `GET` | `/api/citas` | `listar_citas()` | Lista todas las citas registradas. |
| `POST` | `/api/citas` | `crear_cita()` | Agenda una nueva cita. |
| `PUT` | `/api/citas/{id_cita}` | `actualizar_cita()` | Actualiza una cita existente (fecha, hora, estado, etc.). |

---

> 📌 **Nota:** esta tabla documenta el estado actual del backend. A medida que se agreguen nuevos endpoints (ej. puntos de fidelización, lista de espera, notificaciones), deben añadirse aquí siguiendo el mismo formato.

---

[⬅ Volver al README principal](../../README.md)
