# 📚 Documentación de GLOBDE

Índice general de toda la documentación del proyecto. Todo lo que hay aquí describe
el estado **real** del código en la rama de trabajo, no el plan inicial.

[⬅ Volver al README principal](../README.md)

---

## 🚀 Puesta en marcha

| Documento | Qué contiene |
| :--- | :--- |
| [`setup/con-docker.md`](setup/con-docker.md) | **Vía recomendada.** Levantar los 3 servicios con Docker Compose, `.env` obligatorio, Alembic automático, solución de errores frecuentes |
| [`setup/sin-docker.md`](setup/sin-docker.md) | Instalación manual: MySQL local, `uv sync`, `alembic upgrade head`, `pnpm install` |
| [`../database/README_DB.md`](../database/README_DB.md) | Cómo se gestiona la base de datos |
| [`../backend/alembic/README.md`](../backend/alembic/README.md) | Uso diario de Alembic, crear migraciones, detalles de MySQL |

---

## 🏗️ Referencia técnica

| Documento | Qué contiene |
| :--- | :--- |
| [`referencia-tecnica/architecture.md`](referencia-tecnica/architecture.md) | Arquitectura en 3 capas, flujo de una petición, estructura real de carpetas, decisiones de diseño |
| [`referencia-tecnica/api-endpoints.md`](referencia-tecnica/api-endpoints.md) | Catálogo de los **117 endpoints**, niveles de autorización, paginación y errores |
| [`referencia-tecnica/database-schema.md`](referencia-tecnica/database-schema.md) | Diccionario de datos: **20 tablas y 4 vistas** con columnas, tipos y claves foráneas |
| [`referencia-tecnica/design-system.md`](referencia-tecnica/design-system.md) | Tokens de Tailwind v4, paleta, clases propias y deuda técnica de estilos |
| [`../.github/copilot-instructions.md`](../.github/copilot-instructions.md) | Convenciones de código, seguridad, commits y migraciones |

---

## 📋 Requisitos

| Documento | Qué contiene |
| :--- | :--- |
| [`requisitos.md`](requisitos.md) | **Índice principal**: 33 Historias de Usuario ↔ 33 Casos de Uso, por módulo |
| [`restricciones.md`](restricciones.md) | Resumen de restricciones técnicas, de hardware, organizacionales, de seguridad y diseño |
| [`requisitos/restricciones.md`](requisitos/restricciones.md) | Versión detallada de las restricciones, con justificación |

### Historias de Usuario y Casos de Uso

- [`requisitos/HUs/`](requisitos/HUs/) — 33 historias de usuario (`HU-001` … `HU-033`).
- [`requisitos/CUs/`](requisitos/CUs/) — 33 casos de uso (`CU-01` … `CU-33`).

Ambas colecciones están enlazadas una a una desde [`requisitos.md`](requisitos.md).

### Requisitos funcionales

> [!WARNING]
> La carpeta `requisitos/RFs/` contiene **dos series solapadas** del mismo alcance,
> resultado de una reorganización a medias. Ninguna está enlazada desde
> `requisitos.md`. Antes de seguir añadiendo requisitos hay que elegir una y
> archivar la otra.

| Serie | Archivos | Formato | Descripción |
| :--- | ---: | :--- | :--- |
| **Granular** | 34 | `RF-0NN_slug-con-guiones.md` | Un requisito por acción concreta (`RF-002_inicio-de-sesion`, `RF-014_reserva-de-cita-cliente`…) |
| **Agrupada** | 16 | `RF-0NN_slug_con_guiones_bajos.md` | Requisitos agrupados por módulo (`RF-001_registro_y_autenticacion_usuarios`…) |

### Requisitos no funcionales

> [!WARNING]
> Tres RNFs (`RNF-003`, `RNF-005`, `RNF-006`) existen **por duplicado**: una versión
> corta de un solo bloque y otra detallada. Las detalladas (nombre más largo) son
> las que se mantienen al día.

| RNF | Versión vigente | Duplicado a archivar |
| :--- | :--- | :--- |
| RNF-001 | `RNF-001_seguridad.md` | — |
| RNF-002 | `RNF-002_rendimiento.md` | — |
| RNF-003 | `RNF-003_usabilidad_ux_ui.md` | `RNF-003_usabilidad-ux-ui.md` |
| RNF-004 | `RNF-004_accesibilidad.md` | — |
| RNF-005 | `RNF-005_mantenibilidad_calidad.md` | `RNF-005_mantenibilidad.md` |
| RNF-006 | `RNF-006_compatibilidad_portabilidad.md` | `RNF-006_compatibilidad.md` |

---

## 🎓 Conceptos y buenas prácticas

Material de apoyo formativo, no específico de GLOBDE:

| Documento | Qué contiene |
| :--- | :--- |
| [`conceptos/owasp-top-10.md`](conceptos/owasp-top-10.md) | Riesgos OWASP y cómo se mitigan en el proyecto |
| [`conceptos/accesibilidad-aria-wcag.md`](conceptos/accesibilidad-aria-wcag.md) | Pautas WCAG y atributos ARIA |
| [`conceptos/patrones-arquitectonicos.md`](conceptos/patrones-arquitectonicos.md) | Patrones de arquitectura aplicables |

---

## 📎 Anexos

Entregables formativos en formato binario (no editables desde git):

| Archivo | Contenido |
| :--- | :--- |
| `anexos/PROPUESTA_TECNICA.pdf` | Propuesta técnica del proyecto |
| `anexos/Globde_Casos_de_Uso_V2.docx.pdf` | Casos de uso, versión 2 |
| `anexos/Globde_Diagramas_de_Uso_V2.docx.pdf` | Diagramas de casos de uso, versión 2 |
| `anexos/Globde_HU_V2.xlsx` | Matriz de historias de usuario, versión 2 |

---

## 🔧 Estado de la documentación

| Aspecto | Estado |
| :--- | :--- |
| Esquema de base de datos | ✅ Al día — generado desde las migraciones de Alembic |
| Catálogo de endpoints | ✅ Al día — generado desde `backend/app/routers/` |
| Arquitectura y guías de setup | ✅ Al día |
| Design system | ✅ Al día, con la deuda técnica documentada |
| Índice HU/CU | ✅ Al día — 66 enlaces, 0 rotos |
| Requisitos funcionales (RFs) | ⚠️ Dos series duplicadas, pendiente de consolidar |
| Requisitos no funcionales | ⚠️ Tres duplicados, pendiente de archivar |
