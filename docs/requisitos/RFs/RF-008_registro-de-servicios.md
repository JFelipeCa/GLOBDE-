# RF-008 — Registro de servicios

## Identificación
| Campo | Valor |
|---|---|
| **ID** | RF-008 |
| **Nombre** | Registro de servicios |
| **Módulo** | Servicios |
| **Prioridad** | Alta |
| **Estado** | Implementado |
| **HU asociada** | HU-07 |
| **CU asociado** | CU-07 |

## Descripción
Crear servicios de barbería con precio y duración.

## Entradas
| Campos requeridos | Validaciones básicas |
|---|---|
| `nombre, descripcion, precio, duracion, puntos` | Tipos correctos, campos obligatorios completos |

## Proceso
1. Llena datos del servicio. 2. Valida nombre único. 3. Guarda en BD.

## Salidas
| Escenarios | Resultados |
|---|---|
| API HTTP | 201: Creado, 409: Nombre duplicado |

## Endpoints asociados
- **Ruta:** `POST /api/servicios`

## Reglas de negocio
- Precio y duración deben ser > 0.
