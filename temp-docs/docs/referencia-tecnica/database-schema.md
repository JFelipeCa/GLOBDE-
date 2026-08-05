# Esquema de Base de Datos — GLOBDE

<!--
  ¿Qué? Documentación técnica exhaustiva del modelo relacional de datos de GLOBDE.
  ¿Para qué? Proveer el diccionario de datos, relaciones de claves foráneas, restricciones de integridad
             y vistas SQL para cualquier desarrollador o auditor del sistema.
  ¿Impacto? Garantiza la correcta interacción con la base de datos sin incurrir en violaciones de integridad referencial.
-->

> **Motor**: MySQL 8.0+ / MariaDB 10.5+  
> **Nombre de Base de Datos**: `globde`  
> **Script DDL Principal**: `database/database.sql`  
> **Tablas Relacionales**: 12  
> **Vistas SQL**: 3  

---

## 1. Diagrama Entidad-Relación (ER)

```
┌─────────────────────────┐             ┌─────────────────────────┐
│          roles          │             │        usuarios         │
├─────────────────────────┤             ├─────────────────────────┤
│ PK  id_rol  INT         │ 1 ──────── N│ PK  id_usuario INT      │
│     nombre  VARCHAR(50) │             │ FK  id_rol     INT      │
└─────────────────────────┘             │     nombre     VARCHAR  │
                                        │     email      VARCHAR  │
                                        │ contrasena_hash VARCHAR │
                                        │     telefono   VARCHAR  │
                                        │     activo     TINYINT  │
                                        └────────────┬────────────┘
                                                     │ 1
                                       ┌─────────────┴─────────────┐
                                       │ 1                         │ 1
                                       ▼                           ▼
                        ┌─────────────────────────┐ ┌─────────────────────────┐
                        │        clientes         │ │  password_reset_tokens  │
                        ├─────────────────────────┤ ├─────────────────────────┤
                        │ PK  id_cliente INT      │ │ PK  id_token INT        │
                        │ FK  id_usuario INT      │ │ FK  id_usuario INT      │
                        │     puntos     INT      │ │     token      VARCHAR  │
                        │     direccion  VARCHAR  │ │     expira_en  DATETIME │
                        └────────────┬────────────┘ │     usado      TINYINT  │
                                     │ 1            └─────────────────────────┘
                                     │
                                     │ N
                                     ▼
┌─────────────────────────┐     ┌─────────────────────────┐     ┌─────────────────────────┐
│        servicios        │     │          citas          │     │    ranking_barberos     │
├─────────────────────────┤     ├─────────────────────────┤     ├─────────────────────────┤
│ PK  id_servicio INT     │1───N│ PK  id_cita    INT      │1───1│ PK  id_ranking INT      │
│     nombre      VARCHAR │     │ FK  id_cliente INT      │     │ FK  id_barbero INT      │
│     precio      DECIMAL │     │ FK  id_barbero INT      │     │     calificacion INT    │
│     duracion_min INT    │     │ FK  id_servicio INT     │     │     comentarios  TEXT   │
│     puntos_otorga INT   │     │     fecha      DATE     │     └─────────────────────────┘
│     activo      TINYINT │     │     hora       TIME     │
└────────────┬────────────┘     │     estado     ENUM     │
             │ 1                │     notas      TEXT     │
             │                  └────────────┬────────────┘
             │ N                             │ 1
             ▼                               │ 1
┌─────────────────────────┐                  ▼
│     catalogo_cortes     │     ┌─────────────────────────┐     ┌─────────────────────────┐
├─────────────────────────┤     │        facturas         │     │     detalle_factura     │
│ PK  id_corte    INT     │     ├─────────────────────────┤     ├─────────────────────────┤
│ FK  id_servicio INT     │     │ PK  id_factura INT      │1───N│ PK  id_detalle INT      │
│     nombre_corte VARCHAR│     │ FK  id_cita    INT      │     │ FK  id_factura INT      │
│     foto_url    VARCHAR │     │     fecha_emision DT    │     │ FK  id_servicio INT     │
│     descripcion TEXT    │     │     total      DECIMAL  │     │     precio_unit DECIMAL │
└─────────────────────────┘     │     metodo_pago VARCHAR │     └─────────────────────────┘
                                └─────────────────────────┘
```

---

## 2. Diccionario de Datos Exhaustivo (12 Tablas)

### 2.1 Tabla `roles`
Almacena los roles predefinidos en el sistema.

| Columna | Tipo de Dato | Nulo | Clave | Valor por Defecto | Descripción |
| :--- | :--- | :---: | :---: | :--- | :--- |
| `id_rol` | `INT` | NO | PK | Auto-increment | Identificador único del rol |
| `nombre` | `VARCHAR(50)` | NO | - | - | Nombre del rol (`Administrador`, `Barbero`, `Cliente`) |

---

### 2.2 Tabla `usuarios`
Cuentas de acceso e identificación personal de todos los actores.

| Columna | Tipo de Dato | Nulo | Clave | Valor por Defecto | Descripción |
| :--- | :--- | :---: | :---: | :--- | :--- |
| `id_usuario` | `INT` | NO | PK | Auto-increment | Identificador único del usuario |
| `id_rol` | `INT` | NO | FK | - | Rol asignado (`roles.id_rol`) |
| `nombre` | `VARCHAR(100)` | NO | - | - | Nombre completo del usuario |
| `email` | `VARCHAR(100)` | NO | UNIQUE | - | Correo electrónico de inicio de sesión |
| `contrasena_hash` | `VARCHAR(255)` | NO | - | - | Hash criptográfico bcrypt de la contraseña |
| `telefono` | `VARCHAR(20)` | SÍ | - | NULL | Número telefónico de contacto |
| `activo` | `TINYINT(1)` | NO | - | 1 | 1 = Activo, 0 = Desactivado |
| `creado_en` | `TIMESTAMP` | NO | - | CURRENT_TIMESTAMP | Fecha de creación del registro |

---

### 2.3 Tabla `clientes`
Datos específicos y programa de fidelización de los clientes.

| Columna | Tipo de Dato | Nulo | Clave | Valor por Defecto | Descripción |
| :--- | :--- | :---: | :---: | :--- | :--- |
| `id_cliente` | `INT` | NO | PK | Auto-increment | Identificador único del cliente |
| `id_usuario` | `INT` | NO | FK, UNIQUE | - | Referencia a la tabla `usuarios` |
| `puntos` | `INT` | NO | - | 0 | Saldo actual de puntos de fidelización |
| `direccion` | `VARCHAR(255)` | SÍ | - | NULL | Dirección física de residencia |

---

### 2.4 Tabla `servicios`
Catálogo maestro de servicios ofrecidos por la barbería.

| Columna | Tipo de Dato | Nulo | Clave | Valor por Defecto | Descripción |
| :--- | :--- | :---: | :---: | :--- | :--- |
| `id_servicio` | `INT` | NO | PK | Auto-increment | Identificador único del servicio |
| `nombre` | `VARCHAR(100)` | NO | - | - | Nombre del servicio (ej. Corte Clásico) |
| `descripcion` | `TEXT` | SÍ | - | NULL | Descripción detallada del servicio |
| `precio` | `DECIMAL(10,2)` | NO | - | 0.00 | Precio en pesos colombianos (COP) |
| `duracion_min` | `INT` | NO | - | 30 | Duración estimada del servicio en minutos |
| `puntos_otorga` | `INT` | NO | - | 10 | Puntos concedidos al completar el servicio |
| `activo` | `TINYINT(1)` | NO | - | 1 | 1 = Disponible, 0 = Inactivo |

---

### 2.5 Tabla `citas`
Registro principal de reservas y agenda operativa del salón.

| Columna | Tipo de Dato | Nulo | Clave | Valor por Defecto | Descripción |
| :--- | :--- | :---: | :---: | :--- | :--- |
| `id_cita` | `INT` | NO | PK | Auto-increment | Identificador único de la cita |
| `id_cliente` | `INT` | NO | FK | - | Cliente que recibe el servicio (`clientes.id_cliente`) |
| `id_barbero` | `INT` | NO | FK | - | Profesional asignado (`usuarios.id_usuario`) |
| `id_servicio` | `INT` | NO | FK | - | Servicio a realizar (`servicios.id_servicio`) |
| `fecha` | `DATE` | NO | - | - | Fecha de la cita (YYYY-MM-DD) |
| `hora` | `TIME` | NO | - | - | Hora de inicio de la cita (HH:MM:SS) |
| `estado` | `ENUM(...)` | NO | - | 'Pendiente' | `'Pendiente'`, `'En Atención'`, `'Completada'`, `'Cancelada'` |
| `notas` | `TEXT` | SÍ | - | NULL | Notas adicionales o especificaciones |
| `creado_en` | `TIMESTAMP` | NO | - | CURRENT_TIMESTAMP | Registro temporal de la reserva |

---

### 2.6 Tabla `catalogo_cortes`
Galería visual y estilos asociados a los servicios.

| Columna | Tipo de Dato | Nulo | Clave | Valor por Defecto | Descripción |
| :--- | :--- | :---: | :---: | :--- | :--- |
| `id_corte` | `INT` | NO | PK | Auto-increment | Identificador del estilo |
| `id_servicio` | `INT` | NO | FK | - | Servicio al que pertenece |
| `nombre_corte` | `VARCHAR(100)` | NO | - | - | Nombre del diseño (ej. Low Fade) |
| `foto_url` | `VARCHAR(255)` | SÍ | - | NULL | Ruta a la imagen del corte |
| `descripcion` | `TEXT` | SÍ | - | NULL | Características del diseño |

---

### 2.7 Tabla `facturas`
Comprobantes de facturación generados tras la prestación del servicio.

| Columna | Tipo de Dato | Nulo | Clave | Valor por Defecto | Descripción |
| :--- | :--- | :---: | :---: | :--- | :--- |
| `id_factura` | `INT` | NO | PK | Auto-increment | Identificador único de factura |
| `id_cita` | `INT` | NO | FK | - | Cita vinculada |
| `fecha_emision` | `DATETIME` | NO | - | CURRENT_TIMESTAMP | Fecha y hora de cobro |
| `total` | `DECIMAL(10,2)` | NO | - | 0.00 | Monto total liquidado |
| `metodo_pago` | `VARCHAR(50)` | NO | - | 'Efectivo' | Efectivo, Tarjeta, Transferencia, Puntos |

---

### 2.8 Tabla `detalle_factura`
Desglose de líneas de servicio en cada factura.

| Columna | Tipo de Dato | Nulo | Clave | Valor por Defecto | Descripción |
| :--- | :--- | :---: | :---: | :--- | :--- |
| `id_detalle` | `INT` | NO | PK | Auto-increment | Identificador del ítem |
| `id_factura` | `INT` | NO | FK | - | Factura cabecera |
| `id_servicio` | `INT` | NO | FK | - | Servicio facturado |
| `precio_unitario` | `DECIMAL(10,2)` | NO | - | 0.00 | Valor cobrado por el servicio |

---

### 2.9 Tabla `password_reset_tokens`
Gestión de seguridad para restablecimiento de claves olvidadas.

| Columna | Tipo de Dato | Nulo | Clave | Valor por Defecto | Descripción |
| :--- | :--- | :---: | :---: | :--- | :--- |
| `id_token` | `INT` | NO | PK | Auto-increment | Identificador del token |
| `id_usuario` | `INT` | NO | FK | - | Usuario solicitante |
| `token` | `VARCHAR(255)` | NO | UNIQUE | - | Cadena aleatoria criptográfica |
| `expira_en` | `DATETIME` | NO | - | - | Fecha límite (30 minutos) |
| `usado` | `TINYINT(1)` | NO | - | 0 | 1 = Token consumido |

---

### 2.10 Tabla `ranking_barberos`
Registro de calificaciones y comentarios de clientes hacia los barberos.

| Columna | Tipo de Dato | Nulo | Clave | Valor por Defecto | Descripción |
| :--- | :--- | :---: | :---: | :--- | :--- |
| `id_ranking` | `INT` | NO | PK | Auto-increment | Identificador de la reseña |
| `id_barbero` | `INT` | NO | FK | - | Barbero calificado |
| `id_cita` | `INT` | NO | FK, UNIQUE | - | Cita evaluada |
| `calificacion` | `INT` | NO | - | 5 | Puntuación de 1 a 5 estrellas |
| `comentarios` | `TEXT` | SÍ | - | NULL | Opinión del cliente |

---

### 2.11 Tabla `penalidades`
Control de inasistencias o cancelaciones tardías de clientes.

| Columna | Tipo de Dato | Nulo | Clave | Valor por Defecto | Descripción |
| :--- | :--- | :---: | :---: | :--- | :--- |
| `id_penalidad` | `INT` | NO | PK | Auto-increment | Identificador de la sanción |
| `id_cliente` | `INT` | NO | FK | - | Cliente sancionado |
| `id_cita` | `INT` | NO | FK | - | Cita causante |
| `motivo` | `VARCHAR(255)` | NO | - | - | Motivo de la penalidad |
| `fecha` | `DATETIME` | NO | - | CURRENT_TIMESTAMP | Fecha de registro |

---

### 2.12 Tabla `tokens_recuperacion`
Histórico y compatibilidad de tokens temporales de acceso.

| Columna | Tipo de Dato | Nulo | Clave | Valor por Defecto | Descripción |
| :--- | :--- | :---: | :---: | :--- | :--- |
| `id` | `INT` | NO | PK | Auto-increment | Identificador de registro |
| `id_usuario` | `INT` | NO | FK | - | Usuario |
| `token` | `VARCHAR(255)` | NO | - | - | Token hash |
| `creado_en` | `TIMESTAMP` | NO | - | CURRENT_TIMESTAMP | Marca de tiempo |

---

## 3. Vistas SQL Precompiladas

### 3.1 `vista_citas_detalle`
Consolida la información completa de la cita para el panel de agenda:
```sql
CREATE OR REPLACE VIEW vista_citas_detalle AS
SELECT 
    c.id_cita,
    c.fecha,
    c.hora,
    c.estado,
    c.notas,
    cl.id_cliente,
    u_cli.nombre AS cliente_nombre,
    u_cli.email AS cliente_email,
    u_cli.telefono AS cliente_telefono,
    b.id_usuario AS id_barbero,
    b.nombre AS barbero_nombre,
    s.id_servicio,
    s.nombre AS servicio_nombre,
    s.precio AS servicio_precio,
    s.duracion_min AS servicio_duracion
FROM citas c
INNER JOIN clientes cl ON c.id_cliente = cl.id_cliente
INNER JOIN usuarios u_cli ON cl.id_usuario = u_cli.id_usuario
INNER JOIN usuarios b ON c.id_barbero = b.id_usuario
INNER JOIN servicios s ON c.id_servicio = s.id_servicio;
```

---

### 3.2 `vista_clientes_resumen`
Resumen comercial por cliente con estadísticas de asistencia:
```sql
CREATE OR REPLACE VIEW vista_clientes_resumen AS
SELECT 
    cl.id_cliente,
    u.id_usuario,
    u.nombre,
    u.email,
    u.telefono,
    cl.puntos,
    COUNT(c.id_cita) AS total_citas,
    MAX(c.fecha) AS ultima_cita
FROM clientes cl
INNER JOIN usuarios u ON cl.id_usuario = u.id_usuario
LEFT JOIN citas c ON cl.id_cliente = c.id_cliente
GROUP BY cl.id_cliente, u.id_usuario, u.nombre, u.email, u.telefono, cl.puntos;
```

---

### 3.3 `vista_ingresos_barbero`
Consolidado analítico de ingresos generados por cada profesional:
```sql
CREATE OR REPLACE VIEW vista_ingresos_barbero AS
SELECT 
    b.id_usuario AS id_barbero,
    b.nombre AS barbero_nombre,
    COUNT(c.id_cita) AS total_servicios_completados,
    COALESCE(SUM(s.precio), 0) AS total_ingresos_generados
FROM usuarios b
LEFT JOIN citas c ON b.id_usuario = c.id_barbero AND c.estado = 'Completada'
LEFT JOIN servicios s ON c.id_servicio = s.id_servicio
WHERE b.id_rol = 2
GROUP BY b.id_usuario, b.nombre;
```
