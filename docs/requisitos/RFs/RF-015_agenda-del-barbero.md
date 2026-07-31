# RF-015 — Agenda del barbero

## Identificación
| Campo | Valor |
|---|---|
| **ID** | RF-015 |
| **Nombre** | Agenda del barbero |
| **Módulo** | Citas |
| **Prioridad** | Alta |
| **Estado** | Implementado |
| **HU asociada** | HU-14 |
| **CU asociado** | CU-14 |

## Descripción
Barbero ve sus citas asignadas.

## Entradas
| Campos requeridos | Validaciones básicas |
|---|---|
| `fecha, vista` | Tipos correctos, campos obligatorios completos |

## Proceso
1. Consulta citas propias por rango. 2. Muestra en lista/calendario.

## Salidas
| Escenarios | Resultados |
|---|---|
| API HTTP | 200: Lista citas |

## Endpoints asociados
- **Ruta:** `GET /api/barberos/{id}/agenda`

## Reglas de negocio
- Ordenadas cronológicamente.
