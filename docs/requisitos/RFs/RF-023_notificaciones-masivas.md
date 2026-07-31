# RF-023 — Notificaciones masivas

## Identificación
| Campo | Valor |
|---|---|
| **ID** | RF-023 |
| **Nombre** | Notificaciones masivas |
| **Módulo** | Notificaciones |
| **Prioridad** | Baja |
| **Estado** | Pendiente |
| **HU asociada** | HU-22 |
| **CU asociado** | CU-22 |

## Descripción
Admin envía emails a todos los clientes.

## Entradas
| Campos requeridos | Validaciones básicas |
|---|---|
| `asunto, cuerpo` | Tipos correctos, campos obligatorios completos |

## Proceso
1. Redacta email. 2. Envía en background a correos activos.

## Salidas
| Escenarios | Resultados |
|---|---|
| API HTTP | 200: Enviados |

## Endpoints asociados
- **Ruta:** `POST /api/notificaciones/masivas`

## Reglas de negocio
- Solo para clientes activos.
