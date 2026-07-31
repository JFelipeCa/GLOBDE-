# RF-018 — Cancelacion por cliente

## Identificación
| Campo | Valor |
|---|---|
| **ID** | RF-018 |
| **Nombre** | Cancelacion por cliente |
| **Módulo** | Citas |
| **Prioridad** | Alta |
| **Estado** | Implementado |
| **HU asociada** | HU-17 |
| **CU asociado** | CU-17 |

## Descripción
Cliente cancela su cita desde panel.

## Entradas
| Campos requeridos | Validaciones básicas |
|---|---|
| `cita_id` | Tipos correctos, campos obligatorios completos |

## Proceso
1. Solicita cancelar. 2. Cambia estado. 3. Notifica al admin.

## Salidas
| Escenarios | Resultados |
|---|---|
| API HTTP | 200: Cancelada |

## Endpoints asociados
- **Ruta:** `PATCH /api/citas/{id}/cancelar`

## Reglas de negocio
- Solo citas pendientes/confirmadas.
