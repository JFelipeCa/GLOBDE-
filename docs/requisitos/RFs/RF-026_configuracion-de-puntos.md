# RF-026 — Configuracion de puntos

## Identificación
| Campo | Valor |
|---|---|
| **ID** | RF-026 |
| **Nombre** | Configuracion de puntos |
| **Módulo** | Fidelización |
| **Prioridad** | Media |
| **Estado** | Implementado |
| **HU asociada** | HU-25 |
| **CU asociado** | CU-25 |

## Descripción
Admin define puntos por servicio.

## Entradas
| Campos requeridos | Validaciones básicas |
|---|---|
| `servicio_id, cantidad` | Tipos correctos, campos obligatorios completos |

## Proceso
1. Edita servicio. 2. Actualiza cantidad de puntos.

## Salidas
| Escenarios | Resultados |
|---|---|
| API HTTP | 200: Actualizado |

## Endpoints asociados
- **Ruta:** `PATCH /api/servicios/{id}/puntos`

## Reglas de negocio
- Aplica solo a citas nuevas.
