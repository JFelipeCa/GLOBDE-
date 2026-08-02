# RF-014 — Programa de Fidelización y Canje de Puntos

<!--
  ¿Qué? Requisito funcional para la acumulación, consulta y canje de puntos de lealtad por servicios en la barbería.
  ¿Para qué? Premiar la fidelidad de los clientes recurrentes e incentivar un mayor volumen de citas.
  ¿Impacto? Incrementa la retención de clientes y el valor promedio de vida del cliente (LTV).
-->

---

## Identificación

| Campo | Valor |
| :--- | :--- |
| **ID** | RF-014 |
| **Nombre** | Programa de Fidelización y Canje de Puntos |
| **Módulo** | Fidelización y Marketing |
| **Prioridad** | Media-Alta |
| **Estado** | Implementado |
| **HUs Asociadas** | HU-23, HU-24, HU-25, HU-26 |
| **Fecha** | Febrero 2026 |

---

## Descripción

El sistema debe permitir que cada cliente acumule puntos automáticamente cada vez que una cita pasa al estado `'Completada'`. El cliente puede consultar su saldo desde su panel y el administrador o cajero puede procesar el canje de puntos por descuentos o servicios gratuitos.

---

## Entradas

| Campo | Tipo | Obligatorio | Validaciones |
| :--- | :--- | :--- | :--- |
| `id_cliente` | Entero | Sí | Identificador del cliente |
| `puntos_a_canjear` | Entero | Sí | Mayor a cero y menor o igual al saldo actual del cliente |

---

## Proceso

1. Al completar una cita, el backend añade puntos al saldo en `clientes.puntos`.
2. Para canjear, el cajero o cliente aplica los puntos en la factura.
3. El backend descuenta los puntos y genera el descuento correspondiente.

---

## Salidas

| Escenario | Código HTTP | Respuesta JSON |
| :--- | :--- | :--- |
| Consulta de Puntos | 200 OK | `{"id_cliente": 3, "nombre": "Juan", "puntos": 120}` |
| Canje Exitoso | 200 OK | `{"detail": "Canje aplicado exitosamente", "saldo_restante": 20}` |

---

## Endpoints Asociados

| Método | Ruta | Auth Requerida | Descripción |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/clientes` | Sí | Consulta de puntos por cliente |
| `PUT` | `/api/citas/{id_cita}` | Sí | Acredita puntos al completar servicio |
