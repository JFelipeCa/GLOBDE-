# RF-024 — Acumulacion de puntos

## Identificación
| Campo | Valor |
|---|---|
| **ID** | RF-024 |
| **Nombre** | Acumulacion de puntos |
| **Módulo** | Fidelización |
| **Prioridad** | Media |
| **Estado** | Implementado |
| **HU asociada** | HU-23 |
| **CU asociado** | CU-23 |

## Descripción
Sistema da puntos al completar cita.

## Entradas
| Campos requeridos | Validaciones básicas |
|---|---|
| `cita_id` | Tipos correctos, campos obligatorios completos |

## Proceso
1. Cita a 'Completada'. 2. Suma puntos del servicio al cliente.

## Salidas
| Escenarios | Resultados |
|---|---|
| API HTTP | N/A |

## Endpoints asociados
- **Ruta:** `N/A`

## Reglas de negocio
- Puntos no expiran (por defecto).
