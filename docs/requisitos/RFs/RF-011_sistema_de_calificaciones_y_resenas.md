# RF-011 — Sistema de Calificación y Reseñas de Barberos

<!--
  ¿Qué? Requisito funcional para que los clientes califiquen el servicio recibido por parte del barbero (1 a 5 estrellas).
  ¿Para qué? Medir la satisfacción del cliente y generar rankings de desempeño para incentivos de los barberos.
  ¿Impacto? Fomenta la calidad del servicio y ayuda a nuevos clientes a elegir al mejor profesional.
-->

---

## Identificación

| Campo | Valor |
| :--- | :--- |
| **ID** | RF-011 |
| **Nombre** | Sistema de Calificación y Reseñas de Barberos |
| **Módulo** | Calificaciones y Calidad |
| **Prioridad** | Media |
| **Estado** | Implementado |
| **HUs Asociadas** | HU-18 |
| **Fecha** | Febrero 2026 |

---

## Descripción

El sistema debe permitir que un cliente que haya completado una cita califique la atención del barbero con un puntaje de 1 a 5 estrellas y un comentario opcional. El sistema actualiza la tabla `ranking_barberos` y recalcula el promedio del profesional.

---

## Entradas

| Campo | Tipo | Obligatorio | Validaciones |
| :--- | :--- | :--- | :--- |
| `id_cita` | Entero | Sí | Cita en estado `'Completada'` |
| `calificacion` | Entero | Sí | Valor entero entre 1 y 5 |
| `comentario` | Texto | No | Máximo 500 caracteres |

---

## Proceso

1. Al finalizar una cita, el cliente visualiza el modal de calificación en su historial.
2. Envía la puntuación asignada.
3. El backend almacena la reseña y actualiza la tabla `ranking_barberos`.

---

## Salidas

| Escenario | Código HTTP | Respuesta JSON |
| :--- | :--- | :--- |
| Calificación Registrada | 200 OK | `{"detail": "Gracias por calificar el servicio", "promedio_barbero": 4.8}` |

---

## Endpoints Asociados

| Método | Ruta | Auth Requerida | Descripción |
| :--- | :--- | :--- | :--- |
| `PUT` | `/api/citas/{id_cita}` | Sí (Cliente) | Registra la calificación de la cita completada |
