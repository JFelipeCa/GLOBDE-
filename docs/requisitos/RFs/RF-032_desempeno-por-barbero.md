# RF-032 — Desempeno por barbero

## Identificación
| Campo | Valor |
|---|---|
| **ID** | RF-032 |
| **Nombre** | Desempeno por barbero |
| **Módulo** | Reportes |
| **Prioridad** | Media |
| **Estado** | Implementado |
| **HU asociada** | HU-31 |
| **CU asociado** | CU-31 |

## Descripción
Métricas por cada empleado.

## Entradas
| Campos requeridos | Validaciones básicas |
|---|---|
| `rango_fechas` | Tipos correctos, campos obligatorios completos |

## Proceso
1. Agrupa datos por barbero. 2. Retorna total citas e ingresos.

## Salidas
| Escenarios | Resultados |
|---|---|
| API HTTP | 200: JSON |

## Endpoints asociados
- **Ruta:** `GET /api/reportes/desempeno`

## Reglas de negocio
- Solo Admin puede ver todos.
