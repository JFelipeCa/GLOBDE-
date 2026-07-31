# RF-011 — Disponibilidad del barbero

## Identificación
| Campo | Valor |
|---|---|
| **ID** | RF-011 |
| **Nombre** | Disponibilidad del barbero |
| **Módulo** | Barberos |
| **Prioridad** | Alta |
| **Estado** | Implementado |
| **HU asociada** | HU-10 |
| **CU asociado** | CU-10 |

## Descripción
Configurar horarios de atención del barbero.

## Entradas
| Campos requeridos | Validaciones básicas |
|---|---|
| `dia_semana, hora_inicio, hora_fin` | Tipos correctos, campos obligatorios completos |

## Proceso
1. Selecciona días y horas. 2. Guarda disponibilidad.

## Salidas
| Escenarios | Resultados |
|---|---|
| API HTTP | 200: Actualizado |

## Endpoints asociados
- **Ruta:** `POST /api/barberos/{id}/disponibilidad`

## Reglas de negocio
- hora_fin debe ser > hora_inicio.
