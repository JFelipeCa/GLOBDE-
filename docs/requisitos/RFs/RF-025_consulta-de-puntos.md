# RF-025 — Consulta de puntos

## Identificación
| Campo | Valor |
|---|---|
| **ID** | RF-025 |
| **Nombre** | Consulta de puntos |
| **Módulo** | Fidelización |
| **Prioridad** | Media |
| **Estado** | Implementado |
| **HU asociada** | HU-24 |
| **CU asociado** | CU-24 |

## Descripción
Cliente ve su saldo y movimientos.

## Entradas
| Campos requeridos | Validaciones básicas |
|---|---|
| `cliente_id` | Tipos correctos, campos obligatorios completos |

## Proceso
1. Consulta tabla puntos. 2. Retorna saldo e historial.

## Salidas
| Escenarios | Resultados |
|---|---|
| API HTTP | 200: Saldo y movimientos |

## Endpoints asociados
- **Ruta:** `GET /api/puntos/{id}`

## Reglas de negocio
- Solo consulta sus propios puntos.
