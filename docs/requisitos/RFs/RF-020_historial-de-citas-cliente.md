# RF-020 — Historial de citas cliente

## Identificación
| Campo | Valor |
|---|---|
| **ID** | RF-020 |
| **Nombre** | Historial de citas cliente |
| **Módulo** | Citas |
| **Prioridad** | Media |
| **Estado** | Implementado |
| **HU asociada** | HU-19 |
| **CU asociado** | CU-19 |

## Descripción
Cliente ve sus citas pasadas y futuras.

## Entradas
| Campos requeridos | Validaciones básicas |
|---|---|
| `cliente_id` | Tipos correctos, campos obligatorios completos |

## Proceso
1. Consulta citas propias. 2. Muestra detalle y puntos ganados.

## Salidas
| Escenarios | Resultados |
|---|---|
| API HTTP | 200: Lista citas |

## Endpoints asociados
- **Ruta:** `GET /api/citas/historial`

## Reglas de negocio
- Filtra por sesión activa del cliente.
