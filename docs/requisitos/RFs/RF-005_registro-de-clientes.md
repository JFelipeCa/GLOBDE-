# RF-005 — Registro de clientes

## Identificación
| Campo | Valor |
|---|---|
| **ID** | RF-005 |
| **Nombre** | Registro de clientes |
| **Módulo** | Clientes |
| **Prioridad** | Alta |
| **Estado** | Implementado |
| **HU asociada** | HU-04 |
| **CU asociado** | CU-04 |

## Descripción
Registro de nuevos clientes para agendar citas.

## Entradas
| Campos requeridos | Validaciones básicas |
|---|---|
| `nombre, apellido, correo, telefono, password` | Tipos correctos, campos obligatorios completos |

## Proceso
1. Llena formulario. 2. Backend valida unicidad. 3. Crea perfil cliente (rol 3).

## Salidas
| Escenarios | Resultados |
|---|---|
| API HTTP | 201: Creado, 409: Correo existe |

## Endpoints asociados
- **Ruta:** `POST /api/clientes`

## Reglas de negocio
- Se inicializan puntos en 0.
