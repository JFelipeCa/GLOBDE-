# RF-012 — Perfil de barbero

## Identificación
| Campo | Valor |
|---|---|
| **ID** | RF-012 |
| **Nombre** | Perfil de barbero |
| **Módulo** | Barberos |
| **Prioridad** | Media |
| **Estado** | Implementado |
| **HU asociada** | HU-11 |
| **CU asociado** | CU-11 |

## Descripción
Ver especialidad y calificación del barbero.

## Entradas
| Campos requeridos | Validaciones básicas |
|---|---|
| `barbero_id` | Tipos correctos, campos obligatorios completos |

## Proceso
1. Consulta perfil. 2. Retorna datos + calificación promedio.

## Salidas
| Escenarios | Resultados |
|---|---|
| API HTTP | 200: Datos perfil |

## Endpoints asociados
- **Ruta:** `GET /api/barberos/{id}`

## Reglas de negocio
- Calificación se calcula en tiempo real.
