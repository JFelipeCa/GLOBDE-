# RF-012 — Historial y Seguimiento de Citas del Cliente

<!--
  ¿Qué? Requisito funcional para que los clientes consulten el histórico cronológico de sus visitas, servicios y gastos.
  ¿Para qué? Proveer transparencia al cliente sobre su actividad en el salón y puntos acumulados.
  ¿Impacto? Incrementa la fidelización y permite al cliente repetir sus servicios preferidos.
-->

---

## Identificación

| Campo | Valor |
| :--- | :--- |
| **ID** | RF-012 |
| **Nombre** | Historial y Seguimiento de Citas del Cliente |
| **Módulo** | Clientes y Citas |
| **Prioridad** | Media-Alta |
| **Estado** | Implementado |
| **HUs Asociadas** | HU-19 |
| **Fecha** | Febrero 2026 |

---

## Descripción

El sistema debe proveer al cliente una interfaz dentro de su panel donde pueda revisar todas sus citas pasadas, canceladas o futuras, indicando fecha, hora, nombre del barbero, servicio realizado, precio pagado y puntos ganados.

---

## Entradas

| Parámetro | Tipo | Obligatorio | Descripción |
| :--- | :--- | :--- | :--- |
| `id_cliente` | Entero | Sí | Identificador del cliente autenticado |

---

## Proceso

1. El cliente accede a su Dashboard o pestaña Historial.
2. El frontend ejecuta `GET /api/citas?id_cliente={id_cliente}`.
3. El backend filtra y retorna las citas ordenadas descendentemente por fecha.

---

## Salidas

| Escenario | Código HTTP | Respuesta JSON |
| :--- | :--- | :--- |
| Historial Obtenido | 200 OK | `[{"id_cita": 4, "fecha": "2026-02-20", "servicio": "Corte + Barba", "barbero": "Carlos", "estado": "Completada", "precio": 35000}]` |

---

## Endpoints Asociados

| Método | Ruta | Auth Requerida | Descripción |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/citas?id_cliente={id}` | Sí | Retorna historial del cliente |
