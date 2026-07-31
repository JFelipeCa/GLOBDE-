# RF-006 — Busqueda de clientes

## Identificación
| Campo | Valor |
|---|---|
| **ID** | RF-006 |
| **Nombre** | Busqueda de clientes |
| **Módulo** | Clientes |
| **Prioridad** | Alta |
| **Estado** | Implementado |
| **HU asociada** | HU-05 |
| **CU asociado** | CU-05 |

## Descripción
Buscar clientes por nombre, apellido o correo.

## Entradas
| Campos requeridos | Validaciones básicas |
|---|---|
| `query (texto)` | Tipos correctos, campos obligatorios completos |

## Proceso
1. Ingresa término. 2. API filtra por LIKE. 3. Retorna lista paginada.

## Salidas
| Escenarios | Resultados |
|---|---|
| API HTTP | 200: Lista de clientes |

## Endpoints asociados
- **Ruta:** `GET /api/clientes`

## Reglas de negocio
- Búsqueda case-insensitive.
