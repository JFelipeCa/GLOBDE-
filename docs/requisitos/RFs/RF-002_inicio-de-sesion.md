# RF-002 — Inicio de sesion

## Identificación
| Campo | Valor |
|---|---|
| **ID** | RF-002 |
| **Nombre** | Inicio de sesion |
| **Módulo** | Autenticación |
| **Prioridad** | Alta |
| **Estado** | Implementado |
| **HU asociada** | HU-02 |
| **CU asociado** | CU-02 |

## Descripción
Usuarios inician sesión con correo y password.

## Entradas
| Campos requeridos | Validaciones básicas |
|---|---|
| `correo, password` | Tipos correctos, campos obligatorios completos |

## Proceso
1. Ingresa credenciales. 2. Verifica hash. 3. Genera sesión y redirige según rol.

## Salidas
| Escenarios | Resultados |
|---|---|
| API HTTP | 200: Éxito, 401: Credenciales inválidas |

## Endpoints asociados
- **Ruta:** `POST /api/login`

## Reglas de negocio
- Contraseña nunca se devuelve en texto plano.
