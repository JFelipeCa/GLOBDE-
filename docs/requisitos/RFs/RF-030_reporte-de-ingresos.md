# RF-030 — Reporte de ingresos

## Identificación
| Campo | Valor |
|---|---|
| **ID** | RF-030 |
| **Nombre** | Reporte de ingresos |
| **Módulo** | Reportes |
| **Prioridad** | Alta |
| **Estado** | Implementado |
| **HU asociada** | HU-29 |
| **CU asociado** | CU-29 |

## Descripción
Ver dinero generado en un rango de tiempo.

## Entradas
| Campos requeridos | Validaciones básicas |
|---|---|
| `fecha_ini, fecha_fin` | Tipos correctos, campos obligatorios completos |

## Proceso
1. Suma precios de citas completadas. 2. Agrupa por servicio.

## Salidas
| Escenarios | Resultados |
|---|---|
| API HTTP | 200: JSON datos |

## Endpoints asociados
- **Ruta:** `GET /api/reportes/ingresos`

## Reglas de negocio
- Solo incluye citas completadas.
