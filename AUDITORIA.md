# 🔍 Revisión de Calidad del Proyecto — GLOBDE

<!--
  ¿Qué? Revisión interna del estado técnico y documental del proyecto GLOBDE.
  ¿Para qué? Identificar qué está cubierto, qué está parcialmente resuelto y qué queda pendiente,
             de modo que el equipo tenga un panorama honesto del estado real del sistema.
  ¿Impacto? Evita presentar el proyecto como terminado en aspectos que aún tienen deuda técnica
             y define un orden de prioridades para las siguientes iteraciones.
-->

> **Proyecto**: GLOBDE — Sistema de Gestión de Citas y Barbería  
> **Fecha de la revisión**: Febrero 2026  
> **Alcance**: código fuente (`backend/`, `frontend/`), base de datos (`database/`) y documentación (`docs/`)  
> **Realizada por**: equipo de desarrollo GLOBDE

---

## 1. Resumen del estado actual

| Eje revisado | Estado | Observación principal |
| :--- | :---: | :--- |
| **Pertinencia** | Cubierto | El sistema resuelve un problema real de agendamiento y cubre el ciclo completo: análisis, diseño de datos, construcción y despliegue |
| **Relevancia técnica** | Cubierto | Stack vigente y con demanda laboral: FastAPI, React 18, TypeScript, MySQL y Docker |
| **Completitud documental** | Cubierto | 16 RFs, 33 HUs, 33 CUs, 6 RNFs, esquema ER, referencia de API y guías de instalación |
| **Actualidad** | Cubierto | Python 3.12+, Pydantic v2, React 18+, TypeScript 5+, Docker Compose v2 |
| **Seguridad** | Parcial | Bien resueltos el hashing y las consultas parametrizadas; queda endurecer CORS y la validación de rol en el servidor |
| **Pruebas automatizadas** | Pendiente | No hay suite de tests en backend ni frontend |
| **Integración continua** | Pendiente | No hay workflows de CI que ejecuten build o lint en cada push |

---

## 2. Aspectos resueltos

### 2.1 Arquitectura y organización
- Separación clara en tres capas: SPA en React, API REST en FastAPI y persistencia en MySQL.
- Estado global centralizado con Redux Toolkit (`authSlice` para sesión y rol, `dataSlice` para datos de negocio).
- Cliente HTTP centralizado en `frontend/src/api/`, evitando llamadas dispersas por los componentes.

### 2.2 Modelo de datos
- Esquema relacional normalizado con 12 tablas e integridad referencial mediante claves foráneas.
- Tres vistas SQL (`vista_citas_detalle`, `vista_clientes_resumen`, `vista_ingresos_barbero`) que trasladan la agregación al motor de base de datos y simplifican las consultas del backend.
- Uso de baja lógica (`activo = 0`) en lugar de borrado físico, preservando el histórico de citas y facturación.

### 2.3 Seguridad implementada
- Contraseñas almacenadas con `bcrypt` y sal generada automáticamente; nunca en texto plano.
- Consultas a MySQL siempre parametrizadas (`cursor.execute(query, params)`), sin concatenación de cadenas.
- Tokens de recuperación generados con `secrets.token_urlsafe(32)`, con vigencia de 30 minutos y marca de un solo uso.
- Credenciales y configuración SMTP fuera del código, cargadas desde `.env` con plantilla `.env.example` versionada.

### 2.4 Documentación
- Documentación técnica separada por propósito: requisitos, referencia técnica, conceptos y guías de instalación.
- Trazabilidad explícita entre requisitos funcionales, historias de usuario, casos de uso, endpoints y tablas.
- Encabezados con ¿Qué? / ¿Para qué? / ¿Impacto? en todos los documentos, facilitando su lectura por personas ajenas al proyecto.

---

## 3. Hallazgos y deuda técnica

Estos puntos quedan documentados de forma explícita para no presentarlos como resueltos.

| # | Hallazgo | Ubicación | Riesgo | Acción propuesta |
| :---: | :--- | :--- | :---: | :--- |
| 1 | CORS configurado con `allow_origins=["*"]` | `backend/app/main.py` | Medio | Restringir a `http://localhost:5173` en desarrollo y a dominios concretos en producción |
| 2 | Validación de rol principalmente en el frontend | `ProtectedRoute.tsx` | Medio | Reforzar la verificación de rol también en los endpoints sensibles del backend |
| 3 | Sin pruebas automatizadas | `backend/`, `frontend/` | Medio | Incorporar `pytest` para el backend y Vitest + Testing Library para el frontend |
| 4 | Sin integración continua | `.github/workflows/` | Bajo | Añadir un workflow que ejecute build, lint y verificación de tipos en cada push |
| 5 | Toda la lógica del backend concentrada en un solo archivo | `backend/app/main.py` | Medio | Dividir en `routers/`, `services/` y `schemas/` para mejorar la mantenibilidad |
| 6 | Sin pasarela de pagos | Alcance del sistema | Bajo | Evaluar integración de pagos en línea en una siguiente versión |
| 7 | Notificaciones limitadas a correo electrónico | Módulo de notificaciones | Bajo | Considerar recordatorios por WhatsApp o SMS según necesidad del negocio |

---

## 4. Prioridades sugeridas para la próxima iteración

1. **Endurecer CORS y la validación de rol en el backend** — es el punto con mayor impacto en seguridad y el de menor esfuerzo.
2. **Modularizar `main.py`** — separar rutas, servicios y esquemas antes de que el archivo siga creciendo.
3. **Añadir una suite mínima de pruebas** — cubrir primero login, creación de cita y cambio de estado.
4. **Configurar integración continua** — automatizar la verificación de tipos y el build en cada push.
5. **Evaluar pagos en línea y notificaciones adicionales** — funcionalidades de valor comercial, no bloqueantes.

---

## 5. Conclusión de la revisión

El proyecto cumple con su objetivo funcional: permite registrar usuarios, gestionar clientes, barberos y servicios, agendar y controlar citas, acumular puntos de fidelización y generar reportes. La documentación técnica está completa y es trazable.

Los puntos pendientes se concentran en **automatización de pruebas, integración continua y endurecimiento de la configuración de seguridad**, aspectos que no impiden el funcionamiento del sistema pero que deben resolverse antes de considerar cualquier despliegue con datos reales.
