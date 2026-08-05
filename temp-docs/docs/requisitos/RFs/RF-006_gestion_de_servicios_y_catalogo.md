# RF-006 — Catálogo de Servicios y Cortes

<!--
  ¿Qué? Requisito funcional para la administración de los servicios ofrecidos por la barbería (cortes, barba, combos, tratamientos).
  ¿Para qué? Proveer información transparente de tarifas, tiempos estimados de atención y puntos otorgados.
  ¿Impacto? Garantiza la correcta parametrización de precios, agendamiento de tiempos exactos y cálculo de facturación.
-->

---

## Identificación

| Campo | Valor |
| :--- | :--- |
| **ID** | RF-006 |
| **Nombre** | Catálogo de Servicios y Cortes |
| **Módulo** | Servicios |
| **Prioridad** | Alta |
| **Estado** | Implementado |
| **HUs Asociadas** | HU-07, HU-08 |
| **Fecha** | Febrero 2026 |

---

## Descripción

El sistema debe permitir al Administrador registrar nuevos servicios con su nombre, descripción, precio, duración estimada en minutos y puntos de fidelización asignados. Los servicios pueden ser activados o desactivados según disponibilidad del salón. Los clientes y el público en general pueden consultar el catálogo actualizado desde la landing page y el modal de agendamiento.

---

## Entradas

| Campo | Tipo | Obligatorio | Validaciones |
| :--- | :--- | :--- | :--- |
| `nombre` | Texto | Sí | Mínimo 3 caracteres (ej. "Corte Degradado + Barba") |
| `descripcion` | Texto | No | Detalle del servicio |
| `precio` | Decimal / Float | Sí | Mayor a 0 en COP (pesos colombianos) |
| `duracion_min` | Entero | Sí | Mínimo 15 minutos, máximo 240 minutos |
| `puntos_otorga` | Entero | No | Por defecto el 10% del precio o valor fijado |

---

## Proceso

1. El administrador ingresa a `/servicios` y completa los datos del nuevo servicio.
2. El backend inserta el registro en la tabla `servicios`.
3. Al consultar servicios en el catálogo público o agendamiento, el backend ejecuta `GET /api/servicios` o `GET /api/procedimientos/servicios` retornando la lista activa.

---

## Salidas

| Escenario | Código HTTP | Respuesta JSON |
| :--- | :--- | :--- |
| Listado de Servicios | 200 OK | `[{"id_servicio": 1, "nombre": "Corte Clásico", "precio": 25000.0, "duracion_min": 45, "activo": 1}]` |
| Servicio Creado | 201 Created | `{"id_servicio": 4, "nombre": "Perfilado de Barba", "precio": 15000.0, "duracion_min": 30}` |

---

## Endpoints Asociados

| Método | Ruta | Auth Requerida | Descripción |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/servicios` | No | Lista los servicios disponibles para el público |
| `POST` | `/api/servicios` | Sí (Admin) | Registra un nuevo servicio en el catálogo |
| `GET` | `/api/procedimientos/servicios` | No | Ejecuta consulta de servicios con métricas |

---

## Reglas de Negocio

- **RN-006.1**: El precio del servicio no puede ser negativo ni igual a cero.
- **RN-006.2**: La duración estimada se utiliza para calcular el fin estimado del turno y evitar traslapes.
