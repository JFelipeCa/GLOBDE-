# RF-004 — Cierre de sesion y proteccion

## Identificación
| Campo | Valor |
|---|---|
| **ID** | RF-004 |
| **Nombre** | Cierre de sesion y proteccion |
| **Módulo** | Autenticación |
| **Prioridad** | Alta |
| **Estado** | Implementado |
| **HU asociada** | HU-02 |
| **CU asociado** | CU-02 |

## Descripción
Cierre de sesión y validación de rutas protegidas.

## Entradas
| Campos requeridos | Validaciones básicas |
|---|---|
| `sesion_activa` | Tipos correctos, campos obligatorios completos |

## Proceso
1. Click en salir. 2. Limpia Redux/LocalStorage. 3. Redirige a login.

## Salidas
| Escenarios | Resultados |
|---|---|
| API HTTP | 200: Éxito, Redirección |

## Endpoints asociados
- **Ruta:** `POST /api/logout`

## Reglas de negocio
- Rutas protegidas validan rol antes de renderizar.
