# RF-019 — Calificacion del servicio

## Identificación
| Campo | Valor |
|---|---|
| **ID** | RF-019 |
| **Nombre** | Calificacion del servicio |
| **Módulo** | Calificaciones |
| **Prioridad** | Media |
| **Estado** | Implementado |
| **HU asociada** | HU-18 |
| **CU asociado** | CU-18 |

## Descripción
Cliente califica servicio recibido (1 a 5).

## Entradas
| Campos requeridos | Validaciones básicas |
|---|---|
| `cita_id, puntuacion, comentario` | Tipos correctos, campos obligatorios completos |

## Proceso
1. Ingresa estrellas. 2. Guarda calificación vinculada a cita.

## Salidas
| Escenarios | Resultados |
|---|---|
| API HTTP | 201: Registrada |

## Endpoints asociados
- **Ruta:** `POST /api/calificaciones`

## Reglas de negocio
- Solo 1 vez por cita completada.
