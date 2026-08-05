# RF-009 — Desactivacion de servicio

## Identificación
| Campo | Valor |
|---|---|
| **ID** | RF-009 |
| **Nombre** | Desactivacion de servicio |
| **Módulo** | Servicios |
| **Prioridad** | Media |
| **Estado** | Implementado |
| **HU asociada** | HU-08 |
| **CU asociado** | CU-08 |

## Descripción
Ocultar servicio del catálogo sin borrar historial.

## Entradas
| Campos requeridos | Validaciones básicas |
|---|---|
| `servicio_id` | Tipos correctos, campos obligatorios completos |

## Proceso
1. Selecciona servicio. 2. Cambia estado a inactivo.

## Salidas
| Escenarios | Resultados |
|---|---|
| API HTTP | 200: Desactivado |

## Endpoints asociados
- **Ruta:** `PATCH /api/servicios/{id}/estado`

## Reglas de negocio
- Servicio inactivo no aparece al agendar.
