# RF-034 — Lista de espera

## Identificación
| Campo | Valor |
|---|---|
| **ID** | RF-034 |
| **Nombre** | Lista de espera |
| **Módulo** | Citas |
| **Prioridad** | Baja |
| **Estado** | Pendiente |
| **HU asociada** | HU-33 |
| **CU asociado** | CU-33 |

## Descripción
Cliente se anota si no hay slots.

## Entradas
| Campos requeridos | Validaciones básicas |
|---|---|
| `barbero_id, fecha` | Tipos correctos, campos obligatorios completos |

## Proceso
1. Se registra en espera. 2. Si hay cancelación, notifica.

## Salidas
| Escenarios | Resultados |
|---|---|
| API HTTP | 201: Anotado |

## Endpoints asociados
- **Ruta:** `POST /api/lista-espera`

## Reglas de negocio
- Notificación tipo FIFO.
