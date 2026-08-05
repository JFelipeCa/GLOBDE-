# Reglas y Convenciones de Desarrollo — GLOBDE

<!--
  ¿Qué? Reglas y estándares de desarrollo para el proyecto GLOBDE.
  ¿Para qué? Asegurar que cualquier desarrollador o asistente de IA mantenga la coherencia
             arquitectónica, la calidad del código y los estándares pedagógicos del SENA.
  ¿Impacto? Evita la degradación del código, malas prácticas de seguridad y desalineación con la documentación.
-->

## 1. Principios Fundamentales del Proyecto

1. **Propósito Formativo y Profesional**: Todo código desarrollado debe ser claro, limpio, autodocumentado y seguir las mejores prácticas de la industria.
2. **Encabezados Pedagógicos Obligatorios**: Todos los archivos de documentación técnica, esquemas y módulos conceptuales deben iniciar con el bloque de comentarios:
   ```markdown
   <!--
     ¿Qué? Descripción clara de la funcionalidad o módulo.
     ¿Para qué? Propósito técnico y de negocio.
     ¿Impacto? Consecuencias de su ausencia o mala implementación.
   -->
   ```
3. **Separación Estricta de Responsabilidades**:
   - Backend (`backend/`): Expone exclusivamente API REST en FastAPI, valida esquemas con Pydantic y gestiona datos en MySQL.
   - Frontend (`frontend/`): Aplicación SPA en React + Vite + TypeScript con Redux Toolkit para estado centralizado.
   - Base de Datos (`database/`): Scripts DDL/DML, vistas y procedimientos almacenados en MySQL.

---

## 2. Convenciones de Backend (FastAPI + Python 3.12)

- **Tipado Estricto**: Utilizar type hints en todas las funciones y endpoints (`def obtener_citas(id_barbero: int) -> list[dict]:`).
- **Validación con Pydantic**: Todo request body debe tener su correspondiente clase que herede de `pydantic.BaseModel`.
- **Manejo de Errores HTTP**: Utilizar `fastapi.HTTPException` con códigos de estado semánticos apropiados:
  - `200 OK`: Consulta o actualización exitosa.
  - `201 Created`: Creación exitosa de recurso.
  - `400 Bad Request`: Datos de entrada inválidos o regla de negocio infringida.
  - `401 Unauthorized`: Credenciales inválidas.
  - `403 Forbidden`: Acceso denegado por rol no autorizado.
  - `404 Not Found`: Recurso no encontrado.
  - `500 Internal Server Error`: Excepción no controlada del servidor.
- **Seguridad en Base de Datos**: NUNCA concatenar valores en consultas SQL. Utilizar siempre consultas parametrizadas con `cursor.execute(query, params)`.
- **Criptografía**: Usar `bcrypt.hashpw()` y `bcrypt.checkpw()` para el almacenamiento y validación de contraseñas.

---

## 3. Convenciones de Frontend (React 18 + TypeScript + Redux)

- **TypeScript Estricto**: No utilizar `any`. Definir contratos de interfaz claros en `types.ts` o en el módulo correspondiente.
- **Manejo de Estado Global**:
  - `authSlice.ts`: Almacena el usuario actual, token/sesión y rol (`id_rol`: 1=Admin, 2=Barbero, 3=Cliente).
  - `dataSlice.ts`: Almacena colecciones de citas, barberos, servicios y clientes para sincronización rápida.
- **Componentes Modulares**: Separar componentes reutilizables en `src/components/` y vistas de página en `src/pages/`.
- **Protección de Rutas**: Utilizar el componente `ProtectedRoute.tsx` envolviendo las rutas que requieran autenticación o roles específicos.
- **Tokens de Color y Estilos**: Respetar la paleta oficial de Globde:
  - Dark Surface / Negro: `#000000` / `#111827`
  - Cian Acento: `#00BCD4`
  - Dorado Lealtad: `#D4AF37`
  - Texto Claro: `#F8FAFC` / `#FFFFFF`

---

## 4. Convenciones de Commits (Conventional Commits)

Cada commit en el repositorio debe seguir el formato semántico:

```text
<tipo>(<alcance>): <descripción concisa en español o inglés>

- ¿Qué? Breve explicación del cambio realizado.
- ¿Para qué? Justificación del requerimiento o corrección.
- ¿Impacto? Efecto en el sistema o módulos dependientes.
```

### Tipos de commit permitidos:
- `feat`: Nueva funcionalidad agregada al sistema.
- `fix`: Corrección de un error o bug reportado.
- `docs`: Modificación o adición de documentación (`README`, `docs/`, etc.).
- `style`: Ajustes visuales, formateo o estilos sin afectar la lógica.
- `refactor`: Refactorización de código sin cambiar comportamiento externo.
- `test`: Adición o ajuste de pruebas unitarias o de integración.
- `chore`: Tareas de mantenimiento, dependencias o configuración del repositorio.

---

## 5. Gestión de Secretos y Variables de Entorno

1. El archivo `.env` está estrictamente ignorado por `.gitignore` y **NUNCA debe ser comiteado**.
2. Siempre mantener actualizado `.env.example` con los nombres de todas las variables requeridas y valores de prueba ficticios:
   - `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`
   - `FRONTEND_URL`, `RESET_TOKEN_MINUTES`
   - `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASSWORD`, `SMTP_FROM`, `SMTP_STARTTLS`
