# HU-26 — registrar el canje de puntos de un cliente como descuento ap...

[⬅ Volver al README principal](../../../README.md) · [Índice de Historias de Usuario](../../requisitos.md)

---

## Identificación

| Campo | Valor |
|---|---|
| **ID** | HU-26 |
| **Módulo** | Programa de Fidelización (Puntos) |
| **Rol** | Administrador |
| **CU asociado** | CU-26 |

---

## Historia

**Como** administrador,
**quiero** registrar el canje de puntos de un cliente como descuento aplicado al pago de un servicio,
**para** premiar la fidelidad del cliente y gestionar correctamente la reducción del saldo de puntos en el sistema.

---

## Criterios de aceptación

- **CA-1:** Dado que el administrador ingresa el canje, entonces el sistema deberá verificar que el cliente tenga puntos suficientes antes de proceder.
- **CA-2:** Dado que el cliente no tenga puntos suficientes, entonces el sistema deberá mostrar: 'Saldo de puntos insuficiente'.
- **CA-3:** Dado que el canje sea exitoso, entonces el sistema deberá descontar los puntos y registrar la transacción en el historial del cliente.

---

[⬅ Volver al README principal](../../../README.md)
