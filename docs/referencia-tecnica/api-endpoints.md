# Especificación de Endpoints REST API — GLOBDE

<!--
  ¿Qué? Catálogo exhaustivo y contrato de comunicación de la API REST de GLOBDE.
  ¿Para qué? Proveer a los desarrolladores de frontend y evaluadores los esquemas de entrada (Request Body),
             parámetros de consulta (Query Params), códigos de respuesta HTTP y ejemplos de uso.
  ¿Impacto? Garantiza la correcta integración cliente-servidor y previene errores de formato JSON o tipos incompatibles.
-->

> **Base URL**: `http://localhost:8000`  
> **Formato de intercambio**: `application/json`  
> **Documentación interactiva Swagger**: `http://localhost:8000/docs`  
> **Especificación OpenAPI ReDoc**: `http://localhost:8000/redoc`  

---

## 📋 Resumen de Endpoints Disponibles

| Método | Ruta | Auth Requerida | Módulo | Descripción |
| :--- | :--- | :---: | :--- | :--- |
| `GET` | `/` | Pública | Sistema | Comprobación de estado y versión de la API |
| `POST` | `/api/login` | Pública | Autenticación | Inicio de sesión y recuperación de perfil con rol |
| `POST` | `/api/password/forgot` | Pública | Autenticación | Solicitud de token para restablecimiento de contraseña |
| `POST` | `/api/password/reset` | Pública | Autenticación | Aplicación de nueva contraseña con token de un solo uso |
| `GET` | `/api/datos` | Pública | Dashboard | Carga inicial consolidada de catálogo y contadores |
| `GET` | `/api/vistas/citas` | Privada | Citas | Consulta sobre la vista SQL `vista_citas_detalle` |
| `GET` | `/api/vistas/clientes` | Privada (Admin) | Clientes | Consulta sobre la vista SQL `vista_clientes_resumen` |
| `GET` | `/api/vistas/ingresos` | Privada (Admin) | Reportes | Consulta sobre la vista SQL `vista_ingresos_barbero` |
| `GET` | `/api/procedimientos/servicios` | Pública | Servicios | Consulta optimizada de servicios y métricas |
| `GET` | `/api/procedimientos/citas-barbero/{id_usuario}/{fecha}` | Privada | Agenda | Citas agendadas por barbero en una fecha |
| `GET` | `/api/procedimientos/reporte/{anio}/{mes}` | Privada (Admin) | Reportes | Reporte analítico mensual de facturación |
| `GET` | `/api/clientes` | Privada | Clientes | Listado de clientes activos |
| `POST` | `/api/clientes` | Pública | Clientes | Registro autónomo de nuevo cliente |
| `GET` | `/api/usuarios` | Privada (Admin) | Usuarios | Listado de todos los usuarios registrados |
| `PUT` | `/api/usuarios/{id_usuario}` | Privada | Usuarios | Actualización de perfil de usuario |
| `POST` | `/api/usuarios/interno` | Privada (Admin) | Usuarios | Alta de usuario interno (Barbero o Administrador) |
| `PUT` | `/api/usuarios/interno/{id}/desactivar` | Privada (Admin) | Usuarios | Desactivación lógica de cuenta |
| `GET` | `/api/servicios` | Pública | Servicios | Catálogo público de servicios |
| `POST` | `/api/servicios` | Privada (Admin) | Servicios | Creación de nuevo servicio en catálogo |
| `GET` | `/api/citas` | Privada | Citas | Listado y filtrado dinámico de citas |
| `POST` | `/api/citas` | Privada | Citas | Creación de nueva cita |
| `PUT` | `/api/citas/{id_cita}` | Privada | Citas | Actualización de estado o calificación de cita |

---

## 1. Módulo de Autenticación y Seguridad

### 1.1 `POST /api/login`
Autentica a un usuario comparando credenciales con hash bcrypt en MySQL.

#### Request Body
```json
{
  "email": "juan.cliente@globde.com",
  "contrasena": "Password123"
}
```

#### Respuestas
- **`200 OK`**:
```json
{
  "id_usuario": 3,
  "nombre": "Juan Felipe",
  "email": "juan.cliente@globde.com",
  "id_rol": 3,
  "rol": "Cliente",
  "id_cliente": 1,
  "puntos": 120
}
```
- **`401 Unauthorized`**:
```json
{
  "detail": "Correo o contraseña incorrectos"
}
```

---

### 1.2 `POST /api/password/forgot`
Genera un token seguro y envía el correo de restablecimiento.

#### Request Body
```json
{
  "email": "juan.cliente@globde.com"
}
```

#### Respuestas
- **`200 OK`**:
```json
{
  "detail": "Si el correo está registrado, recibirás un enlace de recuperación."
}
```

---

### 1.3 `POST /api/password/reset`
Aplica una nueva contraseña consumiendo el token criptográfico.

#### Request Body
```json
{
  "token": "a1b2c3d4e5f6...",
  "nueva_contrasena": "NuevaClave2026!"
}
```

#### Respuestas
- **`200 OK`**:
```json
{
  "detail": "Contraseña actualizada exitosamente."
}
```
- **`400 Bad Request`**:
```json
{
  "detail": "El token es inválido o ha expirado"
}
```

---

## 2. Módulo de Citas y Reservas

### 2.1 `POST /api/citas`
Registra una nueva reserva de servicio.

#### Request Body
```json
{
  "id_cliente": 1,
  "id_barbero": 2,
  "id_servicio": 1,
  "fecha": "2026-03-15",
  "hora": "14:30:00",
  "notas": "Corte degradado con línea lateral"
}
```

#### Respuestas
- **`201 Created`**:
```json
{
  "id_cita": 24,
  "id_cliente": 1,
  "id_barbero": 2,
  "id_servicio": 1,
  "fecha": "2026-03-15",
  "hora": "14:30:00",
  "estado": "Pendiente",
  "notas": "Corte degradado con línea lateral"
}
```
- **`400 Bad Request`**:
```json
{
  "detail": "El barbero ya tiene una cita reservada en ese horario"
}
```

---

### 2.2 `PUT /api/citas/{id_cita}`
Actualiza el estado de una cita o registra una calificación de servicio.

#### Request Body
```json
{
  "estado": "Completada",
  "calificacion": 5,
  "comentarios": "Excelente atención y puntualidad."
}
```

#### Respuestas
- **`200 OK`**:
```json
{
  "id_cita": 24,
  "estado": "Completada",
  "puntos_otorgados": 25,
  "detail": "Cita actualizada correctamente"
}
```

---

### 2.3 `GET /api/citas`
Consulta citas con parámetros opcionales de filtrado.

#### Query Parameters
- `id_barbero` (opcional): Entero
- `id_cliente` (opcional): Entero
- `fecha` (opcional): Formato `YYYY-MM-DD`
- `estado` (opcional): `'Pendiente'`, `'En Atención'`, `'Completada'`, `'Cancelada'`

#### Ejemplo cURL
```bash
curl -X GET "http://localhost:8000/api/citas?fecha=2026-03-15&id_barbero=2" \
     -H "Accept: application/json"
```

---

## 3. Módulo de Servicios y Catálogo

### 3.1 `GET /api/servicios`
Retorna el catálogo público de servicios activos.

#### Respuesta `200 OK`
```json
[
  {
    "id_servicio": 1,
    "nombre": "Corte Clásico",
    "descripcion": "Corte tradicional a tijera o máquina con acabado navaja",
    "precio": 25000.0,
    "duracion_min": 40,
    "puntos_otorga": 25,
    "activo": 1
  },
  {
    "id_servicio": 2,
    "nombre": "Barba Premium",
    "descripcion": "Ritual de toalla caliente, perfilado y aceites esenciales",
    "precio": 20000.0,
    "duracion_min": 30,
    "puntos_otorga": 20,
    "activo": 1
  }
]
```
