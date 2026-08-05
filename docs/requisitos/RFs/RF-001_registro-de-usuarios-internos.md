# RF-001 — Registro de usuarios internos

## Identificación
| Campo | Valor |
|---|---|
| **ID** | RF-001 |
| **Nombre** | Registro de usuarios internos |
| **Módulo** | Autenticación |
| **Prioridad** | Alta |
| **Estado** | Implementado |
| **HU asociada** | HU-01 |
| **CU asociado** | CU-01 |

## Descripción
El admin registra nuevos usuarios (Barberos/Clientes).

## Entradas
| Campos requeridos | Validaciones básicas |
|---|---|
| `nombre, apellido, correo, password, rol` | Tipos correctos, campos obligatorios completos |

## Proceso
1. Admin llena formulario. 2. Valida correo único. 3. Hashea password y guarda.

## Salidas
| Escenarios | Resultados |
|---|---|
| API HTTP | 201: Creado, 409: Correo duplicado |

## Endpoints asociados
- **Ruta:** `POST /api/usuarios`

## Reglas de negocio
- Solo admin puede crear. Correo debe ser único.
