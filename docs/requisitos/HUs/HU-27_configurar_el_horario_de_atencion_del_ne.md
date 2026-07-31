# HU-27 — configurar el horario de atención del negocio indicando los ...

[⬅ Volver al README principal](../../../README.md) · [Índice de Historias de Usuario](../../requisitos.md)

---

## Identificación

| Campo | Valor |
|---|---|
| **ID** | HU-27 |
| **Módulo** | Configuración del Negocio |
| **Rol** | Administrador |
| **CU asociado** | CU-27 |

---

## Historia

**Como** administrador,
**quiero** configurar el horario de atención del negocio indicando los días laborales y las franjas horarias disponibles,
**para** asegurar que el calendario de reservas solo muestre horarios reales de trabajo y evitar agendamientos fuera de horario.

---

## Criterios de aceptación

- **CA-1:** Dado que el administrador configura los días y franjas horarias, entonces el sistema deberá bloquear los horarios fuera del rango establecido.
- **CA-2:** Dado que la hora de cierre sea igual o anterior a la de apertura, entonces el sistema deberá mostrar un error de horario inválido.
- **CA-3:** Dado que se guarden los cambios, entonces el sistema deberá aplicarlos de inmediato al calendario de reservas.

---

[⬅ Volver al README principal](../../../README.md)
