# RF-010 — Registro de barberos

## Identificación
| Campo | Valor |
|---|---|
| **ID** | RF-010 |
| **Nombre** | Registro de barberos |
| **Módulo** | Barberos |
| **Prioridad** | Alta |
| **Estado** | Implementado |
| **HU asociada** | HU-09 |
| **CU asociado** | CU-09 |

## Descripción
Registrar personal de barbería.

## Entradas
| Campos requeridos | Validaciones básicas |
|---|---|
| `nombre, correo, password, especialidad` | Tipos correctos, campos obligatorios completos |

## Proceso
1. Llena datos. 2. Valida correo. 3. Crea usuario (rol 2).

## Salidas
| Escenarios | Resultados |
|---|---|
| API HTTP | 201: Creado, 409: Error |

## Endpoints asociados
- **Ruta:** `POST /api/barberos`

## Reglas de negocio
- Requiere configuración posterior de horario.
