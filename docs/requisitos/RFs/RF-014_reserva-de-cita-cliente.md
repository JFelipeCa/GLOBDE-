# RF-014 — Reserva de cita Cliente

## Identificación
| Campo | Valor |
|---|---|
| **ID** | RF-014 |
| **Nombre** | Reserva de cita Cliente |
| **Módulo** | Citas |
| **Prioridad** | Alta |
| **Estado** | Implementado |
| **HU asociada** | HU-13 |
| **CU asociado** | CU-13 |

## Descripción
Cliente reserva su propia cita online.

## Entradas
| Campos requeridos | Validaciones básicas |
|---|---|
| `barbero_id, servicio_id, fecha, hora` | Tipos correctos, campos obligatorios completos |

## Proceso
1. Cliente elige slot libre. 2. Valida y crea cita. 3. Notifica email.

## Salidas
| Escenarios | Resultados |
|---|---|
| API HTTP | 201: Creado, 409: Ocupado |

## Endpoints asociados
- **Ruta:** `POST /api/citas`

## Reglas de negocio
- Solo slots disponibles se muestran.
