# RF-033 — Exportacion de reportes

## Identificación
| Campo | Valor |
|---|---|
| **ID** | RF-033 |
| **Nombre** | Exportacion de reportes |
| **Módulo** | Reportes |
| **Prioridad** | Media |
| **Estado** | Pendiente |
| **HU asociada** | HU-32 |
| **CU asociado** | CU-32 |

## Descripción
Descargar en Excel/PDF.

## Entradas
| Campos requeridos | Validaciones básicas |
|---|---|
| `tipo, formato` | Tipos correctos, campos obligatorios completos |

## Proceso
1. Genera reporte. 2. Convierte a xlsx/pdf. 3. Retorna archivo.

## Salidas
| Escenarios | Resultados |
|---|---|
| API HTTP | 200: Descarga |

## Endpoints asociados
- **Ruta:** `GET /api/reportes/exportar`

## Reglas de negocio
- Usa openpyxl o reportlab.
