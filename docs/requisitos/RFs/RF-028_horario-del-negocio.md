# RF-028 — Horario del negocio

## Identificación
| Campo | Valor |
|---|---|
| **ID** | RF-028 |
| **Nombre** | Horario del negocio |
| **Módulo** | Configuración |
| **Prioridad** | Alta |
| **Estado** | Implementado |
| **HU asociada** | HU-27 |
| **CU asociado** | CU-27 |

## Descripción
Definir horario de apertura y cierre.

## Entradas
| Campos requeridos | Validaciones básicas |
|---|---|
| `dias, apertura, cierre` | Tipos correctos, campos obligatorios completos |

## Proceso
1. Define horario. 2. Limita agendas de barberos.

## Salidas
| Escenarios | Resultados |
|---|---|
| API HTTP | 200: OK |

## Endpoints asociados
- **Ruta:** `PUT /api/configuracion/horario`

## Reglas de negocio
- Afecta validaciones de nuevos agendamientos.
