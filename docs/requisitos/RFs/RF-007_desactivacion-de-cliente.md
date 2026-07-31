# RF-007 — Desactivacion de cliente

## Identificación
| Campo | Valor |
|---|---|
| **ID** | RF-007 |
| **Nombre** | Desactivacion de cliente |
| **Módulo** | Clientes |
| **Prioridad** | Media |
| **Estado** | Implementado |
| **HU asociada** | HU-06 |
| **CU asociado** | CU-06 |

## Descripción
Desactivar un cliente sin borrar su historial.

## Entradas
| Campos requeridos | Validaciones básicas |
|---|---|
| `cliente_id` | Tipos correctos, campos obligatorios completos |

## Proceso
1. Selecciona cliente. 2. Cambia estado a inactivo. 3. Persiste historial.

## Salidas
| Escenarios | Resultados |
|---|---|
| API HTTP | 200: Desactivado, 404: No encontrado |

## Endpoints asociados
- **Ruta:** `PATCH /api/clientes/{id}/estado`

## Reglas de negocio
- Cliente inactivo no puede iniciar sesión.
