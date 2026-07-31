# HU-28 — registrar días festivos o cierres especiales del negocio par...

[⬅ Volver al README principal](../../../README.md) · [Índice de Historias de Usuario](../../requisitos.md)

---

## Identificación

| Campo | Valor |
|---|---|
| **ID** | HU-28 |
| **Módulo** | Configuración del Negocio |
| **Rol** | Administrador |
| **CU asociado** | CU-28 |

---

## Historia

**Como** administrador,
**quiero** registrar días festivos o cierres especiales del negocio para bloquearlos automáticamente en el calendario,
**para** evitar que los clientes agenden citas en fechas en que el establecimiento no estará en funcionamiento.

---

## Criterios de aceptación

- **CA-1:** Dado que el administrador registra un día no laborable, entonces el sistema deberá bloquear ese día en el calendario de reservas.
- **CA-2:** Dado que existan citas ya agendadas en ese día, entonces el sistema deberá mostrar una advertencia con las citas afectadas.
- **CA-3:** Dado que un cliente intente reservar en una fecha bloqueada, entonces el sistema deberá mostrar que no hay disponibilidad.

---

[⬅ Volver al README principal](../../../README.md)
