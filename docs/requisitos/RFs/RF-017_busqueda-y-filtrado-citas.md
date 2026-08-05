# RF-017 — Busqueda y filtrado citas

## Identificación
| Campo | Valor |
|---|---|
| **ID** | RF-017 |
| **Nombre** | Busqueda y filtrado citas |
| **Módulo** | Citas |
| **Prioridad** | Media |
| **Estado** | Implementado |
| **HU asociada** | HU-16 |
| **CU asociado** | CU-16 |

## Descripción
Filtrar citas por cliente, fecha, estado.

## Entradas
| Campos requeridos | Validaciones básicas |
|---|---|
| `filtros (fecha, estado, barbero)` | Tipos correctos, campos obligatorios completos |

## Proceso
1. Aplica filtros. 2. Retorna lista paginada.

## Salidas
| Escenarios | Resultados |
|---|---|
| API HTTP | 200: Resultados |

## Endpoints asociados
- **Ruta:** `GET /api/citas`

## Reglas de negocio
- Barbero solo ve sus citas, admin ve todas.
