# RF-008 — Control de Estados de Citas y Agenda del Barbero

<!--
  ¿Qué? Requisito funcional para la transición de estados de las citas (Pendiente, En Atención, Completada, Cancelada).
  ¿Para qué? Controlar el flujo operacional del salón, registrar el momento de inicio/fin del servicio y disparar la acumulación de puntos.
  ¿Impacto? Sin control de estados no es posible calcular comisiones, liquidar servicios ni acreditar puntos de lealtad.
-->

---

## Identificación

| Campo | Valor |
| :--- | :--- |
| **ID** | RF-008 |
| **Nombre** | Control de Estados de Citas y Agenda del Barbero |
| **Módulo** | Citas y Reservas |
| **Prioridad** | Crítica |
| **Estado** | Implementado |
| **HUs Asociadas** | HU-14, HU-15 |
| **Fecha** | Febrero 2026 |

---

## Descripción

El sistema debe permitir que los barberos y administradores actualicen el ciclo de vida de una cita a través de los estados permitidos: `'Pendiente'`, `'En Atención'`, `'Completada'` y `'Cancelada'`. Cuando una cita pasa a `'Completada'`, el sistema registra automáticamente los puntos correspondientes a favor del cliente y actualiza el balance de facturación.

---

## Entradas

| Campo | Tipo | Obligatorio | Validaciones |
| :--- | :--- | :--- | :--- |
| `id_cita` | Entero | Sí | Identificador de la cita |
| `estado` | Texto (Enum) | Sí | Valores permitidos: `'Pendiente'`, `'En Atención'`, `'Completada'`, `'Cancelada'` |

---

## Proceso

1. El barbero o admin hace clic en el botón de cambio de estado en la fila de la cita o modal.
2. El frontend envía la petición `PUT /api/citas/{id_cita}` con el nuevo `estado`.
3. El backend actualiza la columna `estado` en la tabla `citas`.
4. Si el nuevo estado es `'Completada'`:
   a. Recupera el `id_cliente` y `id_servicio` de la cita.
   b. Calcula los puntos asignados al servicio (10% del valor base).
   c. Actualiza `puntos = puntos + nuevos_puntos` en la tabla `clientes`.
5. Retorna la cita con su nuevo estado y los puntos acumulados.

---

## Salidas

| Escenario | Código HTTP | Respuesta JSON |
| :--- | :--- | :--- |
| Estado Actualizado | 200 OK | `{"id_cita": 15, "estado": "Completada", "puntos_otorgados": 25}` |
| Cita No Encontrada | 404 Not Found | `{"detail": "Cita no encontrada"}` |

---

## Endpoints Asociados

| Método | Ruta | Auth Requerida | Descripción |
| :--- | :--- | :--- | :--- |
| `PUT` | `/api/citas/{id_cita}` | Sí | Actualiza estado y datos de la cita |
| `GET` | `/api/vistas/citas` | Sí | Retorna vista detallada `vista_citas_detalle` |

---

## Reglas de Negocio

- **RN-008.1**: Una cita en estado `'Completada'` no puede volver a `'Pendiente'`.
- **RN-008.2**: Solo las citas `'Completada'` acreditan puntos de fidelización al cliente.
