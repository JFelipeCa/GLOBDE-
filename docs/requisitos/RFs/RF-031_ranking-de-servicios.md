# RF-031 — Ranking de servicios

## Identificación
| Campo | Valor |
|---|---|
| **ID** | RF-031 |
| **Nombre** | Ranking de servicios |
| **Módulo** | Reportes |
| **Prioridad** | Media |
| **Estado** | Implementado |
| **HU asociada** | HU-30 |
| **CU asociado** | CU-30 |

## Descripción
Servicios más vendidos.

## Entradas
| Campos requeridos | Validaciones básicas |
|---|---|
| `rango_fechas` | Tipos correctos, campos obligatorios completos |

## Proceso
1. Cuenta citas por servicio. 2. Ordena descendente.

## Salidas
| Escenarios | Resultados |
|---|---|
| API HTTP | 200: JSON datos |

## Endpoints asociados
- **Ruta:** `GET /api/reportes/ranking`

## Reglas de negocio
- Ranking base a volumen, luego ingresos.
