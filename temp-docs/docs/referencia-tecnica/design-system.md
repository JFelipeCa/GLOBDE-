# Design System & Identidad Visual — GLOBDE

<!--
  ¿Qué? Documentación del sistema de diseño, tokens visuales, paleta semiótica y componentes UI de GLOBDE.
  ¿Para qué? Asegurar la consistencia visual en todas las vistas (Landing Page, Dashboards, Modales y Tablas)
             y documentar las pautas de accesibilidad y contraste para el frontend.
  ¿Impacto? Evita la anarquía de colores hardcodeados y garantiza una experiencia de usuario profesional y armónica.
-->

> **Proyecto**: GLOBDE — Sistema de Gestión de Citas y Barbería  
> **Temática**: Barbería Clásica & Moderna Digital  
> **Enfoque**: Dark Theme Elegante con Acentos Tecnológicos y Dorados de Lealtad  

---

## 1. Filosofía y Semiótica del Color

La paleta cromática de Globde fue estructurada para transmitir elegancia, pulcritud y sofisticación propia de una barbería de alta gama:

```
┌─────────────────┐   ┌─────────────────┐   ┌─────────────────┐   ┌─────────────────┐
│     NEGRO       │   │      CIAN       │   │     DORADO      │   │     BLANCO      │
│   #000000       │   │    #00BCD4      │   │    #D4AF37      │   │    #FFFFFF      │
│ Fondo & Textos  │   │ Botones & Foco  │   │ Puntos & Estrell│   │ Textos y Tarjet │
└─────────────────┘   └─────────────────┘   └─────────────────┘   └─────────────────┘
```

---

## 2. Tokens Cromáticos Oficiales

| Token Semántico | Hexadecimal | RGB | Rol en la Interfaz |
| :--- | :---: | :---: | :--- |
| `--color-bg-main` | `#0B0F19` | `rgb(11, 15, 25)` | Fondo principal de la aplicación web |
| `--color-surface-card` | `#111827` | `rgb(17, 24, 39)` | Fondo de tarjetas, tablas, modales y barras de navegación |
| `--color-surface-hover`| `#1F2937` | `rgb(31, 41, 55)` | Estado hover sobre filas de tablas y botones secundarios |
| `--color-accent-cyan` | `#00BCD4` | `rgb(0, 188, 212)` | Acento primario, botones interactivos, links y loaders |
| `--color-gold-loyalty` | `#D4AF37` | `rgb(212, 175, 55)`| Insignias de puntos de fidelización y estrellas de calificación |
| `--color-text-primary` | `#F9FAFB` | `rgb(249, 250, 251)`| Títulos y textos de alto contraste |
| `--color-text-muted` | `#9CA3AF` | `rgb(156, 163, 175)`| Subtítulos, descripciones secundarias y metadatos |

---

## 3. Estados Semánticos de Citas (Badges)

Para identificar el estado de las citas en un vistazo, el sistema emplea badges con colores funcionales normalizados:

| Estado | Token Color | Fondo Hex | Borde / Texto | Significado |
| :--- | :--- | :---: | :---: | :--- |
| **Pendiente** | `badge-warning` | `#451A03` | `#F59E0B` | Cita agendada en espera de atención |
| **En Atención**| `badge-info` | `#083344` | `#00BCD4` | El cliente está siendo atendido en el sillón |
| **Completada** | `badge-success` | `#064E3B` | `#10B981` | Servicio terminado, cobrado y puntos sumados |
| **Cancelada** | `badge-danger` | `#450A0A` | `#EF4444` | Reserva anulada por cliente o administrador |

---

## 4. Tipografía y Jerarquía Visual

- **Fuente Primaria**: `system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`
- **Escala Modular**:
  - `H1 / Hero Title`: 32px - 40px (Bold 700)
  - `H2 / Título de Sección`: 24px - 28px (SemiBold 600)
  - `H3 / Tarjetas`: 18px - 20px (Medium 500)
  - `Body / Párrafos`: 14px - 16px (Regular 400)
  - `Badges & Captions`: 12px (Medium 500 / Uppercase tracking)

---

## 5. Componentes Principales de la UI

```
┌────────────────────────────────────────────────────────┐
│  StatCard Component                                    │
├────────────────────────────────────────────────────────┤
│  [ 📅 Ícono ]    Citas Agendadas Hoy                   │
│                  18 Citas                             │
│                  ▲ +12% vs ayer                        │
└────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────┐
│  ActionButton Component (`accent-cyan`)               │
├────────────────────────────────────────────────────────┤
│  [ + Nueva Cita ]   → Background: #00BCD4, Color: Black │
└────────────────────────────────────────────────────────┘
```
