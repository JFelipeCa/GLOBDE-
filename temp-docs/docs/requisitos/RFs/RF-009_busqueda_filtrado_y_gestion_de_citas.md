# RF-009 — Búsqueda, Filtrado y Consulta de Citas

<!--
  ¿Qué? Requisito funcional para consultar y filtrar el histórico y programación de citas con múltiples criterios.
  ¿Para qué? Facilitar la visualización rápida de la agenda por día, barbero, cliente o estado.
  ¿Impacto? Optimiza los tiempos de consulta de recepción y permite auditoría operativa rápida.
-->

---

## Identificación

| Campo | Valor |
| :--- | :--- |
| **ID** | RF-009 |
| **Nombre** | Búsqueda, Filtrado y Consulta de Citas |
| **Módulo** | Citas y Reservas |
| **Prioridad** | Media-Alta |
| **Estado** | Implementado |
| **HUs Asociadas** | HU-16 |
| **Fecha** | Febrero 2026 |

---

## Descripción

El sistema debe permitir a los usuarios (según sus privilegios) filtrar la lista de citas por rango de fechas, profesional asignado, nombre del cliente o estado de la cita, mostrando la vista combinada con nombres legibles de servicios y clientes.

---

## Entradas (Query Params)

| Parámetro | Tipo | Obligatorio | Descripción |
| :--- | :--- | :--- | :--- |
| `id_barbero` | Entero | No | Filtra por el ID del barbero |
| `id_cliente` | Entero | No | Filtra por el ID del cliente |
| `fecha` | Fecha (YYYY-MM-DD) | No | Filtra citas de un día específico |
| `estado` | Texto | No | Filtra por `'Pendiente'`, `'Completada'`, etc. |

---

## Proceso

1. El usuario aplica filtros en la barra superior de la vista de Citas.
2. El frontend ejecuta `GET /api/citas?id_barbero=2&fecha=2026-03-01`.
3. El backend construye la consulta dinámica sobre `citas` o `vista_citas_detalle`.
4. Retorna el listado paginado o completo serializado en JSON.

---

## Salidas

| Escenario | Código HTTP | Respuesta JSON |
| :--- | :--- | :--- |
| Consulta Exitosa | 200 OK | `[{"id_cita": 8, "fecha": "2026-03-01", "hora": "15:00:00", "cliente": "Laura Gomez", "barbero": "Carlos", "servicio": "Barba VIP", "estado": "Pendiente"}]` |

---

## Endpoints Asociados

| Método | Ruta | Auth Requerida | Descripción |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/citas` | Sí | Listado de citas con query parameters |
| `GET` | `/api/vistas/citas` | Sí | Vista SQL consolidada de citas |
