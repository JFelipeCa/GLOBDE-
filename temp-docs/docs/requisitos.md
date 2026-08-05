# Índice Maestro de Requisitos y Matriz de Trazabilidad — GLOBDE

<!--
  ¿Qué? Índice centralizado y matriz de trazabilidad cruzada de todos los requisitos del sistema GLOBDE.
  ¿Para qué? Garantizar que cada requerimiento del negocio tenga correspondencia directa con
             Historias de Usuario (HUs), Casos de Uso (CUs), Endpoints de la API y Tablas de la BD.
  ¿Impacto? Asegura la cobertura total del sistema sin vacíos funcionales ni características huérfanas.
-->

> **Proyecto**: GLOBDE — Sistema de Gestión de Citas y Barbería  
> **Total Requisitos Funcionales (RFs)**: 16 Requisitos Maestros  
> **Total Historias de Usuario (HUs)**: 33 Historias de Usuario  
> **Total Casos de Uso (CUs)**: 33 Casos de Uso  
> **Total Requisitos No Funcionales (RNFs)**: 6 Requisitos de Calidad  

---

## 🧭 ¿Por qué 16 Requisitos Funcionales Maestros para 33 HUs y CUs?

En ingeniería de software y según las buenas prácticas enseñadas en el SENA ADSO:
- Los **Requisitos Funcionales (RF)** definen las **capacidades y módulos de alto nivel** del sistema (ej. *Gestión de Citas*, *Programa de Fidelización*, *Autenticación y Perfil*).
- Las **Historias de Usuario (HUs)** representan las **necesidades de los usuarios por rol** divididas en pequeñas historias ágiles (ej. *HU-12: Agendar cita por admin*, *HU-13: Reserva autónoma por cliente*, *HU-14: Ver agenda diaria por barbero*).
- Los **Casos de Uso (CUs)** detallan los **flujos de interacción paso a paso, precondiciones y excepciones**.

Por tanto, los 16 RFs Maestros de Globde encapsulan y dan sustento formal a las 33 Historias de Usuario y 33 Casos de Uso del sistema con 100% de cobertura.

---

## 📊 Matriz de Trazabilidad Cruzada

| ID RF | Módulo y Nombre del Requisito Funcional | HUs Asociadas | CUs Asociados | Endpoints API Asociados | Tablas BD Afectadas |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **RF-001** | Registro y Autenticación de Usuarios | HU-01, HU-02 | CU-01, CU-02 | `POST /api/login`, `POST /api/clientes`, `POST /api/usuarios/interno` | `usuarios`, `roles`, `clientes` |
| **RF-002** | Recuperación y Restablecimiento de Contraseña | HU-03 | CU-03 | `POST /api/password/forgot`, `POST /api/password/reset` | `password_reset_tokens`, `usuarios` |
| **RF-003** | Gestión de Perfil y Control de Acceso por Rol | HU-02, HU-08 | CU-02, CU-08 | `GET /api/usuarios`, `PUT /api/usuarios/{id}`, `PUT /api/usuarios/interno/{id}/desactivar` | `usuarios`, `roles` |
| **RF-004** | Gestión y Administración de Clientes | HU-04, HU-05, HU-06 | CU-04, CU-05, CU-06 | `GET /api/clientes`, `POST /api/clientes`, `GET /api/vistas/clientes` | `clientes`, `usuarios`, `vista_clientes_resumen` |
| **RF-005** | Gestión de Barberos y Disponibilidad Horaria | HU-09, HU-10, HU-11 | CU-09, CU-10, CU-11 | `GET /api/usuarios`, `GET /api/procedimientos/citas-barbero/{id}/{fecha}` | `usuarios`, `citas` |
| **RF-006** | Catálogo de Servicios y Cortes | HU-07, HU-08 | CU-07, CU-08 | `GET /api/servicios`, `POST /api/servicios`, `GET /api/procedimientos/servicios` | `servicios`, `catalogo_cortes` |
| **RF-007** | Agendamiento y Reserva de Citas en Línea | HU-12, HU-13 | CU-12, CU-13 | `POST /api/citas`, `GET /api/citas` | `citas`, `clientes`, `servicios`, `usuarios` |
| **RF-008** | Control de Estados de Citas y Agenda de Barberos | HU-14, HU-15 | CU-14, CU-15 | `GET /api/citas`, `PUT /api/citas/{id_cita}`, `GET /api/vistas/citas` | `citas`, `vista_citas_detalle` |
| **RF-009** | Búsqueda, Filtrado y Consulta de Citas | HU-16 | CU-16 | `GET /api/citas`, `GET /api/vistas/citas` | `citas`, `vista_citas_detalle` |
| **RF-010** | Cancelación, Reprogramación y Penalidades | HU-17, HU-21 | CU-17, CU-21 | `PUT /api/citas/{id_cita}` | `citas`, `penalidades` |
| **RF-011** | Sistema de Calificación y Reseñas de Barberos | HU-18 | CU-18 | `PUT /api/citas/{id_cita}` | `citas`, `ranking_barberos` |
| **RF-012** | Historial y Seguimiento de Citas del Cliente | HU-19 | CU-19 | `GET /api/citas?id_cliente={id}` | `citas`, `servicios`, `usuarios` |
| **RF-013** | Notificaciones, Recordatorios y Alertas Masivas | HU-20, HU-21, HU-22 | CU-20, CU-21, CU-22 | `POST /api/citas`, Servicio SMTP | `citas`, `usuarios`, `clientes` |
| **RF-014** | Programa de Fidelización y Canje de Puntos | HU-23, HU-24, HU-25, HU-26 | CU-23, CU-24, CU-25, CU-26 | `PUT /api/citas/{id_cita}`, `GET /api/clientes` | `clientes`, `servicios`, `facturas` |
| **RF-015** | Configuración de Horarios del Negocio y Festivos | HU-27, HU-28 | CU-27, CU-28 | `GET /api/datos` | `citas`, `usuarios` |
| **RF-016** | Reportes Financieros, Estadísticas y Exportación | HU-29, HU-30, HU-31, HU-32, HU-33 | CU-29, CU-30, CU-31, CU-32, CU-33 | `GET /api/vistas/ingresos`, `GET /api/procedimientos/reporte/{anio}/{mes}` | `vista_ingresos_barbero`, `facturas`, `citas` |

---

## 📑 Listado Directo de Documentos de Requisitos

### Requisitos Funcionales Maestros (RFs)
- [RF-001: Registro y Autenticación de Usuarios](requisitos/RFs/RF-001_registro_y_autenticacion_usuarios.md)
- [RF-002: Recuperación y Restablecimiento de Contraseña](requisitos/RFs/RF-002_recuperacion_y_restablecimiento_contrasena.md)
- [RF-003: Gestión de Perfil y Control de Acceso por Rol](requisitos/RFs/RF-003_gestion_perfil_y_control_acceso.md)
- [RF-004: Gestión y Administración de Clientes](requisitos/RFs/RF-004_gestion_de_clientes.md)
- [RF-005: Gestión de Barberos y Disponibilidad Horaria](requisitos/RFs/RF-005_gestion_de_barberos_y_disponibilidad.md)
- [RF-006: Catálogo de Servicios y Cortes](requisitos/RFs/RF-006_gestion_de_servicios_y_catalogo.md)
- [RF-007: Agendamiento y Reserva de Citas en Línea](requisitos/RFs/RF-007_agendamiento_y_reserva_de_citas.md)
- [RF-008: Control de Estados de Citas y Agenda de Barberos](requisitos/RFs/RF-008_control_de_estados_y_agenda_del_barbero.md)
- [RF-009: Búsqueda, Filtrado y Consulta de Citas](requisitos/RFs/RF-009_busqueda_filtrado_y_gestion_de_citas.md)
- [RF-010: Cancelación, Reprogramación y Penalidades](requisitos/RFs/RF-010_cancelacion_reprogramacion_y_penalidades.md)
- [RF-011: Sistema de Calificación y Reseñas de Barberos](requisitos/RFs/RF-011_sistema_de_calificaciones_y_resenas.md)
- [RF-012: Historial y Seguimiento de Citas del Cliente](requisitos/RFs/RF-012_historial_y_seguimiento_de_citas.md)
- [RF-013: Notificaciones, Recordatorios y Alertas Masivas](requisitos/RFs/RF-013_notificaciones_recordatorios_y_alertas.md)
- [RF-014: Programa de Fidelización y Canje de Puntos](requisitos/RFs/RF-014_programa_de_fidelizacion_y_puntos.md)
- [RF-015: Configuración de Horarios del Negocio y Festivos](requisitos/RFs/RF-015_configuracion_de_horarios_del_negocio.md)
- [RF-016: Reportes Financieros, Estadísticas y Exportación](requisitos/RFs/RF-016_reportes_estadisticas_y_exportacion.md)

### Requisitos No Funcionales (RNFs)
- [RNF-001: Seguridad de la Información](requisitos/RNFs/RNF-001_seguridad.md)
- [RNF-002: Rendimiento y Tiempos de Respuesta](requisitos/RNFs/RNF-002_rendimiento.md)
- [RNF-003: Usabilidad y Experiencia de Usuario (UX/UI)](requisitos/RNFs/RNF-003_usabilidad_ux_ui.md)
- [RNF-004: Accesibilidad Web (WCAG 2.1 AA y ARIA)](requisitos/RNFs/RNF-004_accesibilidad.md)
- [RNF-005: Mantenibilidad y Calidad de Código](requisitos/RNFs/RNF-005_mantenibilidad_calidad.md)
- [RNF-006: Compatibilidad y Portabilidad](requisitos/RNFs/RNF-006_compatibilidad_portabilidad.md)
- [Restricciones Generales del Sistema](requisitos/restricciones.md)
