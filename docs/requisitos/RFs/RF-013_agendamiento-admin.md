# RF-013 — Agendamiento Admin

## Identificación
| Campo | Valor |
|---|---|
| **ID** | RF-013 |
| **Nombre** | Agendamiento Admin |
| **Módulo** | Citas |
| **Prioridad** | Alta |
| **Estado** | Implementado |
| **HU asociada** | HU-12 |
| **CU asociado** | CU-12 |

## Descripción
Personal interno agenda cita para cliente.

## Entradas
| Campos requeridos | Validaciones básicas |
|---|---|
| `cliente_id, barbero_id, servicio_id, fecha, hora` | Tipos correctos, campos obligatorios completos |

## Proceso
1. Selecciona slot. 2. Valida disponibilidad. 3. Crea cita.

## Salidas
| Escenarios | Resultados |
|---|---|
| API HTTP | 201: Creado, 409: Ocupado |

## Endpoints asociados
- **Ruta:** `POST /api/citas`

## Reglas de negocio
- No agendar en días no laborales.
