# RNF-003 — Usabilidad y Experiencia de Usuario (UX/UI)

<!--
  ¿Qué? Requisito no funcional que establece los estándares de facilidad de uso, coherencia visual y retroalimentación interactiva.
  ¿Para qué? Facilitar el agendamiento ágil para clientes y la gestión sin fricciones para el personal de la barbería.
  ¿Impacto? Una interfaz confusa aumenta errores de agendamiento y llamadas innecesarias al salón.
-->

---

## Identificación

| Campo | Valor |
| :--- | :--- |
| **ID** | RNF-003 |
| **Nombre** | Usabilidad y Experiencia de Usuario (UX/UI) |
| **Categoría** | Usabilidad (ISO/IEC 25010 - Appropriateness recognisability, Learnability, Operability) |
| **Prioridad** | Alta |
| **Estado** | Implementado |

---

## Especificación de Requisitos

### RNF-003.1 — Diseño Adaptativo Mobile-First
La interfaz de usuario debe responder fluidamente a pantallas móviles (smartphones desde 320px de ancho), tablets y pantallas de escritorio hasta 4K, adaptando la barra de navegación lateral en menú desplegable y reestructurando las tarjetas de servicios en cuadrícula vertical.

### RNF-003.2 — Retroalimentación Visual Inmediata
- Toda acción que requiera procesamiento asíncrono (guardar cita, login, cambio de estado) debe mostrar indicadores visuales de carga (spinners, botones deshabilitados).
- Los errores de formulario deben indicarse en línea junto al campo afectado con texto descriptivo y color semántico rojo.

### RNF-003.3 — Estados de Citas Diferenciados por Color
Para facilitar la lectura rápida de la agenda por parte del barbero y administrador:
- **Pendiente / Confirmada**: Amarillo / Ámbar (`#F59E0B`)
- **En Atención / En Proceso**: Azul / Cian (`#00BCD4`)
- **Completada**: Verde esmeralda (`#10B981`)
- **Cancelada**: Rojo carmesí (`#EF4444`)
