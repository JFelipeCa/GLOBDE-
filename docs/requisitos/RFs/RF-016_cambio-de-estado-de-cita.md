# RF-016 — Cambio de estado de cita

## Identificación
| Campo | Valor |
|---|---|
| **ID** | RF-016 |
| **Nombre** | Cambio de estado de cita |
| **Módulo** | Citas |
| **Prioridad** | Alta |
| **Estado** | Implementado |
| **HU asociada** | HU-15 |
| **CU asociado** | CU-15 |

## Descripción
Marcar cita como Confirmada, Completada o Cancelada.

## Entradas
| Campos requeridos | Validaciones básicas |
|---|---|
| `cita_id, nuevo_estado` | Tipos correctos, campos obligatorios completos |

## Proceso
1. Cambia estado. 2. Si completa, asigna puntos. 3. Si cancela, notifica.

## Salidas
| Escenarios | Resultados |
|---|---|
| API HTTP | 200: Actualizado |

## Endpoints asociados
- **Ruta:** `PATCH /api/citas/{id}/estado`

## Reglas de negocio
- Citas completadas otorgan puntos al cliente.
