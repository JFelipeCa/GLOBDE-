# Base de Datos GLOBDE v2

## Objetivo

Rediseñar la base de datos de GLOBDE para dejarla segura, moderna, ordenada y preparada para una versión funcional orientada a clientes reales.

Esta versión reemplaza el modelo inicial de pruebas por una estructura profesional enfocada en:

- Seguridad de usuarios.
- Recuperación real de contraseña.
- Gestión de clientes y barberos.
- Agenda de citas por rangos horarios.
- Facturación.
- Fidelización por puntos.
- Reseñas.
- Auditoría.
- Logs de correo.
- Trazabilidad de eventos importantes.

---

## Alcance

La modificación corresponde únicamente a la base de datos ubicada en:

```text
database/database.sql
```

No se modifican funcionalidades de backend ni frontend en esta rama.

Los cambios requeridos en backend se documentan en:

```text
database/docs/cambios_backend_requeridos.md
```

---

## RFs - Requerimientos Funcionales

### RF-DB-01 - Gestión de usuarios

La base de datos debe permitir registrar usuarios con roles diferenciados:

- Administrador.
- Barbero.
- Cliente.

### RF-DB-02 - Gestión de clientes

La base de datos debe permitir almacenar información específica de clientes, incluyendo saldo de puntos y nivel de fidelización.

### RF-DB-03 - Gestión de barberos

La base de datos debe permitir almacenar información profesional de barberos, como experiencia, biografía, disponibilidad y horarios.

### RF-DB-04 - Gestión de servicios

La base de datos debe permitir registrar servicios de barbería con precio, duración, categoría, imagen, icono, estado y puntos otorgados.

### RF-DB-05 - Gestión de citas

La base de datos debe permitir crear citas asociadas a cliente, barbero y servicio, manejando fecha, hora de inicio, hora de fin, estado y código de reserva.

### RF-DB-06 - Recuperación de contraseña

La base de datos debe permitir recuperación de contraseña mediante tokens seguros almacenados como hash, con expiración y uso único.

### RF-DB-07 - Registro de correos

La base de datos debe permitir registrar intentos de envío de correos para recuperación de contraseña, confirmación de citas y notificaciones.

### RF-DB-08 - Facturación

La base de datos debe permitir generar facturas y detalles asociados a citas completadas.

### RF-DB-09 - Fidelización

La base de datos debe permitir registrar movimientos de puntos por ganancias, canjes, ajustes y penalizaciones.

### RF-DB-10 - Reseñas

La base de datos debe permitir registrar reseñas de clientes sobre citas completadas.

### RF-DB-11 - Auditoría

La base de datos debe permitir registrar acciones importantes realizadas sobre entidades del sistema.

---

## RNFs - Requerimientos No Funcionales

### RNF-DB-01 - Seguridad

Las contraseñas no deben almacenarse en texto plano. Deben almacenarse como hash seguro generado por el backend.

### RNF-DB-02 - Privacidad

La base de datos no debe incluir datos personales reales en los datos semilla.

### RNF-DB-03 - Integridad referencial

Las tablas deben usar llaves primarias, llaves foráneas, restricciones e índices.

### RNF-DB-04 - Trazabilidad

Los eventos relevantes deben poder auditarse mediante tablas de logs.

### RNF-DB-05 - Mantenibilidad

El archivo SQL debe estar ordenado por secciones y documentado con comentarios.

### RNF-DB-06 - Compatibilidad Docker

La base de datos debe poder inicializarse mediante Docker usando el archivo:

```text
database/database.sql
```

### RNF-DB-07 - Codificación

La base de datos debe usar `utf8mb4` para soportar correctamente caracteres especiales, tildes, eñes y símbolos.

---

## HUs - Historias de Usuario

### HU-DB-01 - Recuperar contraseña

Como cliente, quiero solicitar recuperación de contraseña para recibir un enlace seguro en mi correo y poder crear una nueva contraseña.

### HU-DB-02 - Reservar cita

Como cliente, quiero reservar una cita con un barbero y servicio específico para recibir atención en un horario disponible.

### HU-DB-03 - Consultar historial

Como cliente, quiero consultar mis citas, facturas, puntos y reseñas para conocer mi historial en la barbería.

### HU-DB-04 - Gestionar agenda

Como barbero, quiero consultar mis citas asignadas para organizar mi jornada laboral.

### HU-DB-05 - Administrar servicios

Como administrador, quiero gestionar servicios, precios y duración para mantener actualizado el catálogo.

### HU-DB-06 - Auditar eventos

Como administrador, quiero revisar eventos importantes del sistema para tener trazabilidad de cambios y acciones.

---

## Restricciones

- No se deben almacenar contraseñas en texto plano.
- No se deben almacenar tokens de recuperación en texto plano.
- No se deben incluir correos personales reales en datos semilla.
- No se deben incluir teléfonos personales reales en datos semilla.
- No se deben modificar dependencias del proyecto.
- No se deben usar versiones de paquetes con comodines.
- La entrega debe realizarse mediante GitHub y Docker.
- La rama `main` debe reservarse exclusivamente para producción.
- Los desarrollos deben integrarse según el flujo acordado por el equipo.
- Las ramas de desarrollo deben seguir el formato `feature/<nombre-feature>`.
- La base de datos debe inicializarse desde Docker sin depender de configuraciones manuales adicionales.
- El archivo principal ejecutable de base de datos debe ser `database/database.sql`.

---

## Estructura de archivos

```text
database/
├── database.sql
├── README_DB.md
├── _backup/
│   └── database_original_NuevaInterfaz.sql.bak
└── docs/
    └── cambios_backend_requeridos.md
```

---

## Decisiones de diseño

### 1. Rediseño completo de la base de datos

Se define una versión v2 de la base de datos para reemplazar el modelo inicial de pruebas por una estructura más cercana a producción.

### 2. Contraseñas seguras

La columna de contraseña se define como `contrasena_hash`, indicando que nunca se deben guardar contraseñas en texto plano.

### 3. Recuperación de contraseña segura

La recuperación se maneja mediante la tabla `password_reset_tokens`, guardando únicamente el hash del token, fecha de expiración y fecha de uso.

### 4. Eliminación de tokens de prueba

La tabla anterior `tokens_recuperacion` se elimina porque no debe existir almacenamiento de tokens en texto plano.

### 5. Separación de usuarios, clientes y barberos

Los datos generales se almacenan en `usuarios`, mientras que los datos específicos se almacenan en `clientes` y `barberos`.

### 6. Agenda por rangos horarios

Las citas manejan `hora_inicio` y `hora_fin` para permitir validación real de solapamientos.

### 7. Trazabilidad

Se incluyen tablas como `audit_logs`, `email_logs` y `login_attempts` para registrar eventos relevantes.

### 8. Datos semilla seguros

Los datos de prueba usan correos ficticios y no incluyen información personal real.

---

## Ejecución con Docker

Para reconstruir la base de datos desde cero:

```bash
docker compose down -v
docker compose up -d --build
```

El parámetro `-v` elimina el volumen de MySQL y permite cargar nuevamente `database/database.sql`.

---

## Pruebas básicas

Entrar al contenedor de MySQL:

```bash
docker exec -it globde_mysql mysql -uroot -p
```

Seleccionar la base:

```sql
USE globde;
SHOW TABLES;
SELECT COUNT(*) FROM usuarios;
SELECT COUNT(*) FROM servicios;
SELECT COUNT(*) FROM password_reset_tokens;
```

Validar que no existan tokens de recuperación previos:

```sql
SELECT COUNT(*) FROM password_reset_tokens;
```

Validar usuarios demo:

```sql
SELECT id_usuario, nombre, correo, id_rol, activo
FROM usuarios;
```

Validar servicios activos:

```sql
SELECT nombre, categoria, precio, duracion_minutos, activo
FROM servicios
WHERE activo = 1;
```

---

## Git y trazabilidad

La rama de trabajo sigue el formato:

```text
feature/db-v2-profesional
```

Commits sugeridos:

```text
docs(db): documentar alcance de base de datos v2
feat(db): crear esquema profesional de base de datos v2
fix(db): corregir restricciones de base de datos v2
docs(db): documentar cambios requeridos para backend
```

---

## Nota para backend

Esta versión modifica nombres de columnas y relaciones importantes. El backend debe ajustarse según el documento:

```text
database/docs/cambios_backend_requeridos.md
```

La DB v2 puede romper consultas actuales del backend si este no se adapta. Esto es esperado porque el modelo fue rediseñado para ser más seguro, normalizado y mantenible.