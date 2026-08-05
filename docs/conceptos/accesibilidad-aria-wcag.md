# Accesibilidad Web — Estándares WCAG 2.1 AA y ARIA en GLOBDE

<!--
  ¿Qué? Guía pedagógica y técnica sobre la aplicación de las pautas de accesibilidad web (WCAG 2.1 AA) en GLOBDE.
  ¿Para qué? Garantizar que la interfaz sea operable, comprensible y robusta para personas con diversidad funcional.
  ¿Impacto? Cumple con la normativa internacional de inclusión digital y mejora la usabilidad general del sistema.
-->

> **Estándares**: Web Content Accessibility Guidelines (WCAG 2.1) Nivel AA / W3C WAI-ARIA  
> **Área**: Frontend React + Componentes UI en GLOBDE  

---

## 1. Los 4 Principios de Accesibilidad (POUR)

```
┌─────────────────┐   ┌─────────────────┐   ┌─────────────────┐   ┌─────────────────┐
│   PERCEPTIBLE   │   │    OPERABLE     │   │  COMPRENSIBLE   │   │     ROBUSTO     │
│ Contraste 4.5:1 │   │ Teclado 100%    │   │ Mensajes claros │   │ HTML5 Semántico │
│ e Iconos claros │   │ Foco visual     │   │ y feedback      │   │ y ARIA Labels   │
└─────────────────┘   └─────────────────┘   └─────────────────┘   └─────────────────┘
```

---

## 2. Aplicación Práctica en GLOBDE

### 2.1 Contraste de Color (Perceptible)
- Los textos principales claros (`#F9FAFB`) sobre fondos oscuros (`#0B0F19` / `#111827`) alcanzan una relación de contraste superior a **12:1**, superando ampliamente el mínimo de **4.5:1** exigido por WCAG AA.
- Los botones de acento cian (`#00BCD4`) utilizan tipografía negra `#000000` con contraste superior a **9:1**.

### 2.2 Navegabilidad por Teclado (Operable)
- Todos los elementos interactivos (botones de agendamiento, inputs de fecha, selectores de barbero) soportan navegación secuencial con `Tab` y activación con `Enter` / `Space`.
- Se preserva el anillo de enfoque (`ring-2 ring-cyan-400 focus:outline-none`) para usuarios sin puntero de ratón.

### 2.3 Formularios y Retroalimentación (Comprensible)
- Cada input cuenta con su etiqueta asociada `<label>` y mensajes de error específicos en color rojo accesible (`#EF4444`).
- Al enviar formularios, los botones reflejan el estado de carga (`disabled` y texto "Procesando...") para evitar envíos múltiples involuntarios.

### 2.4 HTML5 Semántico y Lectores de Pantalla (Robusto)
- Uso de etiquetas `<nav>`, `<header>`, `<main>`, `<section>`, `<footer>` y roles ARIA (`role="status"`, `aria-live="polite"`, `aria-label="Cerrar modal"`).
