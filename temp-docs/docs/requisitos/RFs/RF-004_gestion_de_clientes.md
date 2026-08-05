# RF-004 — Gestión y Administración de Clientes

<!--
  ¿Qué? Requisito funcional para la administración de clientes, historial de visitas y puntos acumulados.
  ¿Para qué? Mantener un registro centralizado de clientes para agendamiento, fidelización y seguimiento.
  ¿Impacto? Permite la personalización del servicio, retención de clientes y trazabilidad de ingresos.
-->

---

## Identificación

| Campo | Valor |
| :--- | :--- |
| **ID** | RF-004 |
| **Nombre** | Gestión y Administración de Clientes |
| **Módulo** | Clientes |
| **Prioridad** | Alta |
| **Estado** | Implementado |
| **HUs Asociadas** | HU-04, HU-05, HU-06 |
| **Fecha** | Febrero 2026 |

---

## Descripción

El sistema debe permitir registrar nuevos clientes, listar los clientes registrados con sus datos de contacto y saldo de puntos de fidelización, buscar clientes por nombre o correo, y desactivar o dar de baja registros de clientes conservando su historial.

---

## Entradas

| Campo | Tipo | Obligatorio | Validaciones |
| :--- | :--- | :--- | :--- |
| `nombre` | Texto | Sí | Mínimo 3 caracteres |
| `email` | Texto (Email) | Sí | Único en base de datos |
| `telefono` | Texto | No | Formato numérico |
| `direccion` | Texto | No | Dirección física opcional |
| `contrasena` | Texto | Sí | Para creación de cuenta cliente |

---

## Proceso

1. El administrador o cliente diligencia el formulario de nuevo cliente en `/clientes` o landing page.
2. El backend crea el registro en `usuarios` (`id_rol = 3`) y en `clientes` con `puntos = 0`.
3. Al consultar clientes, el backend realiza la consulta combinada o sobre `vista_clientes_resumen` para retornar el listado completo con estadísticas de visitas y puntos.

---

## Salidas

| Escenario | Código HTTP | Respuesta JSON |
| :--- | :--- | :--- |
| Consulta Exitosa | 200 OK | `[{"id_cliente": 1, "nombre": "Juan Felipe", "email": "juan@mail.com", "puntos": 150, "total_citas": 4}]` |
| Creación Exitosa | 201 Created | `{"id_cliente": 2, "id_usuario": 8, "nombre": "Nuevo Cliente", "puntos": 0}` |

---

## Endpoints Asociados

| Método | Ruta | Auth Requerida | Descripción |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/clientes` | Sí | Retorna listado de clientes activos |
| `POST` | `/api/clientes` | No | Registra un nuevo cliente |
| `GET` | `/api/vistas/clientes` | Sí (Admin) | Retorna resumen analítico de clientes |

---

## Reglas de Negocio

- **RN-004.1**: Todo nuevo cliente inicia con 0 puntos acumulados.
- **RN-004.2**: Un cliente no puede ser eliminado si posee citas activas en estado 'Pendiente' o 'En Atención'.
