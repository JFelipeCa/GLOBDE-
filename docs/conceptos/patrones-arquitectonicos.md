# Patrones Arquitectónicos y de Diseño — GLOBDE

<!--
  ¿Qué? Documentación pedagógica de los patrones arquitectónicos y de software aplicados en GLOBDE.
  ¿Para qué? Servir como material de estudio y referencia para sustentar las decisiones técnicas tomadas.
  ¿Impacto? Garantiza que el equipo demuestre dominio conceptual en evaluaciones y defensas del proyecto SENA.
-->

> **Proyecto**: GLOBDE — Sistema de Gestión de Citas y Barbería  
> **Stack**: FastAPI (Python 3.12) + React (TypeScript) + MySQL + Docker  

---

## 📋 Resumen de Patrones Aplicados

| # | Patrón | Ubicación en el Código | Problema que Resuelve |
| :---: | :--- | :--- | :--- |
| **1** | **Arquitectura en 3 Capas (Layered Architecture)** | `frontend/`, `backend/`, `database/` | Separa la presentación, lógica de negocio y persistencia |
| **2** | **DTO (Data Transfer Object)** | `backend/app/main.py` (`Pydantic Models`) | Valida y encapsula los datos recibidos sin exponer entidades crudas |
| **3** | **Connection Pooling & Helper Pattern** | `get_connection()`, `fetchall()`, `execute()` | Administra eficientemente las conexiones a MySQL liberando recursos |
| **4** | **Centralized State Management (Store)** | `frontend/src/store/` (`Redux Toolkit`) | Mantiene una sola fuente de verdad para autenticación y citas |
| **5** | **Route Guard / Protected Route** | `frontend/src/components/ProtectedRoute.tsx` | Protege vistas restringidas según el rol del usuario |
| **6** | **HTTP Interceptor / Client Pattern** | `frontend/src/api/axiosClient.ts` | Centraliza la configuración base y cabeceras de peticiones |
| **7** | **Component-Driven UI** | `frontend/src/components/` | Permite reutilizar piezas de interfaz (Cards, Navbar, Modales) |
| **8** | **Custom Hooks** | `frontend/src/store/hooks.ts` (`useAppDispatch`) | Encapsula y tipa estrictamente el acceso a Redux |
| **9** | **RESTful Resource Modeling** | Endpoints `/api/citas`, `/api/servicios` | Estandariza operaciones CRUD mediante verbos HTTP semánticos |
| **10**| **Database View Aggregation** | `vista_citas_detalle`, `vista_ingresos_barbero` | Traslada la computación analítica a la base de datos optimizando el backend |

---

## 1. Arquitectura en 3 Capas
El sistema desacopla la capa de presentación (React), la capa de servicios y negocio (FastAPI) y la capa de datos (MySQL). Cada capa se comunica únicamente con su nivel adyacente a través de contratos claros (HTTP/JSON y SQL).

```
[ Frontend SPA (React + Vite) ]
             ▲
             │ HTTP / JSON (API REST)
             ▼
[ Backend Web API (FastAPI) ]
             ▲
             │ TCP / Consultas Parametrizadas
             ▼
[ Persistencia (MySQL Schema) ]
```

---

## 2. Data Transfer Object (DTO) con Pydantic
En lugar de recibir diccionarios no tipados en el backend, se definen clases con Pydantic que fuerzan la validación estricta de tipos antes de procesar cualquier lógica:

```python
class CitaCreate(BaseModel):
    id_cliente: int
    id_barbero: int
    id_servicio: int
    fecha: str
    hora: str
    notas: str | None = None
```
**Impacto**: Si el cliente envía un dato en formato incorrecto, FastAPI rechaza automáticamente la petición con código 422 Unprocessable Entity antes de tocar la base de datos.

---

## 3. Route Guard (ProtectedRoute en React)
El componente `ProtectedRoute.tsx` intercepta la navegación en el frontend, comprobando si el usuario tiene sesión activa y si su `id_rol` coincide con los roles permitidos en la ruta:

```tsx
export const ProtectedRoute = ({ children, allowedRoles }: Props) => {
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (allowedRoles && !allowedRoles.includes(user.id_rol)) return <Navigate to="/" replace />;
  return <>{children}</>;
};
```
