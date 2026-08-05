# RF-021 — Recordatorios correo

## Identificación
| Campo | Valor |
|---|---|
| **ID** | RF-021 |
| **Nombre** | Recordatorios correo |
| **Módulo** | Notificaciones |
| **Prioridad** | Media |
| **Estado** | Implementado |
| **HU asociada** | HU-20 |
| **CU asociado** | CU-20 |

## Descripción
Email automático antes de la cita y post-cita.

## Entradas
| Campos requeridos | Validaciones básicas |
|---|---|
| `cita_id` | Tipos correctos, campos obligatorios completos |

## Proceso
1. Trigger de tiempo o acción. 2. Envía template SMTP.

## Salidas
| Escenarios | Resultados |
|---|---|
| API HTTP | N/A |

## Endpoints asociados
- **Ruta:** `N/A`

## Reglas de negocio
- Envío no debe bloquear el hilo principal.
