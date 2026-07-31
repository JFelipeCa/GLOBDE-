# HU-10 — asignar un horario de trabajo a cada barbero indicando los d...

[⬅ Volver al README principal](../../../README.md) · [Índice de Historias de Usuario](../../requisitos.md)

---

## Identificación

| Campo | Valor |
|---|---|
| **ID** | HU-10 |
| **Módulo** | Disponibilidad y Agendamiento de Citas |
| **Rol** | Administrador |
| **CU asociado** | CU-10 |

---

## Historia

**Como** administrador,
**quiero** asignar un horario de trabajo a cada barbero indicando los días y franjas horarias en que está disponible,
**para** que el sistema solo muestre turnos reales al momento de agendar citas y evitar reservas fuera del horario laboral.

---

## Criterios de aceptación

- **CA-1:** Dado que el administrador configura el horario de un barbero, entonces el sistema deberá bloquear automáticamente los horarios fuera de esa franja.
- **CA-2:** Dado que el barbero tenga citas en un horario que se intenta bloquear, entonces el sistema deberá mostrar una advertencia.
- **CA-3:** Dado que se guarden los cambios, entonces el calendario de ese barbero deberá reflejar su disponibilidad actualizada.

---

[⬅ Volver al README principal](../../../README.md)
