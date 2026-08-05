# RF-003 — Recuperacion de contrasena

## Identificación
| Campo | Valor |
|---|---|
| **ID** | RF-003 |
| **Nombre** | Recuperacion de contrasena |
| **Módulo** | Autenticación |
| **Prioridad** | Alta |
| **Estado** | Implementado |
| **HU asociada** | HU-03 |
| **CU asociado** | CU-03 |

## Descripción
Usuario solicita recuperar su contraseña olvidada.

## Entradas
| Campos requeridos | Validaciones básicas |
|---|---|
| `correo, nuevo_password, token` | Tipos correctos, campos obligatorios completos |

## Proceso
1. Solicita recuperación. 2. Envía email con token. 3. Usuario confirma nueva password.

## Salidas
| Escenarios | Resultados |
|---|---|
| API HTTP | 200: Éxito, 400: Token inválido |

## Endpoints asociados
- **Ruta:** `POST /api/password-reset`

## Reglas de negocio
- Token expira en 30 min. Un solo uso.
