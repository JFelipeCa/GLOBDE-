# RF-022 — Alerta cancelacion admin

## Identificación
| Campo | Valor |
|---|---|
| **ID** | RF-022 |
| **Nombre** | Alerta cancelacion admin |
| **Módulo** | Notificaciones |
| **Prioridad** | Media |
| **Estado** | Implementado |
| **HU asociada** | HU-21 |
| **CU asociado** | CU-21 |

## Descripción
Notifica al admin si cliente cancela.

## Entradas
| Campos requeridos | Validaciones básicas |
|---|---|
| `cita_id` | Tipos correctos, campos obligatorios completos |

## Proceso
1. Detecta estado cancelado. 2. Envía email al admin.

## Salidas
| Escenarios | Resultados |
|---|---|
| API HTTP | N/A |

## Endpoints asociados
- **Ruta:** `N/A`

## Reglas de negocio
- Incluye motivo y datos del cliente.
