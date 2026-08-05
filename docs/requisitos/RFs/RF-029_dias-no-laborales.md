# RF-029 — Dias no laborales

## Identificación
| Campo | Valor |
|---|---|
| **ID** | RF-029 |
| **Nombre** | Dias no laborales |
| **Módulo** | Configuración |
| **Prioridad** | Alta |
| **Estado** | Implementado |
| **HU asociada** | HU-28 |
| **CU asociado** | CU-28 |

## Descripción
Bloquear días festivos.

## Entradas
| Campos requeridos | Validaciones básicas |
|---|---|
| `fecha, motivo` | Tipos correctos, campos obligatorios completos |

## Proceso
1. Agrega fecha. 2. Sistema impide agendar en ese día.

## Salidas
| Escenarios | Resultados |
|---|---|
| API HTTP | 201: Registrado |

## Endpoints asociados
- **Ruta:** `POST /api/configuracion/dias-no-laborales`

## Reglas de negocio
- Se valida en la reserva de citas.
