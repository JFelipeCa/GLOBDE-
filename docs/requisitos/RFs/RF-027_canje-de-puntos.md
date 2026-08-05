# RF-027 — Canje de puntos

## Identificación
| Campo | Valor |
|---|---|
| **ID** | RF-027 |
| **Nombre** | Canje de puntos |
| **Módulo** | Fidelización |
| **Prioridad** | Media |
| **Estado** | Pendiente |
| **HU asociada** | HU-26 |
| **CU asociado** | CU-26 |

## Descripción
Cliente canjea puntos por descuentos.

## Entradas
| Campos requeridos | Validaciones básicas |
|---|---|
| `puntos_canje` | Tipos correctos, campos obligatorios completos |

## Proceso
1. Solicita canje. 2. Resta saldo. 3. Registra movimiento.

## Salidas
| Escenarios | Resultados |
|---|---|
| API HTTP | 200: Éxito |

## Endpoints asociados
- **Ruta:** `POST /api/puntos/canje`

## Reglas de negocio
- Saldo no puede quedar negativo.
