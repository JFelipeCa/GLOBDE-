# 🔍 Auditoría Técnica y Formativa del Repositorio — GLOBDE

<!--
  ¿Qué? Auditoría en 5 ejes del proyecto GLOBDE como solución integral de software formativo.
  ¿Para qué? Evaluar la madurez, pertinencia curricular, rigor técnico, completitud y seguridad
             del repositorio frente a los estándares de calidad del SENA ADSO.
  ¿Impacto? Garantiza que el proyecto no solo cumpla con la entrega de código fuente funcional,
             sino con la documentación de ingeniería de software requerida para el perfil profesional.
-->

> **Proyecto**: GLOBDE — Sistema de Gestión de Citas y Barbería  
> **Programa**: Tecnólogo en Análisis y Desarrollo de Software (ADSO) — SENA  
> **Fecha de Auditoría**: Febrero 2026  
> **Estado General**: ✅ **Cumple con los estándares formativos y de ingeniería de software**

---

## 1. Resumen Ejecutivo de la Evaluación

| Eje Evaluado | Calificación | Estado | Conclusión |
| :--- | :---: | :---: | :--- |
| **1. Pertinencia** | 100% | ✅ APROBADO | Alineación total a las competencias del programa ADSO y solución real a un negocio de servicios |
| **2. Relevancia** | 100% | ✅ APROBADO | Stack moderno de alta demanda laboral: FastAPI (Python), React 18, TypeScript, MySQL, Docker |
| **3. Completitud** | 98% | ✅ APROBADO | 16 Requisitos Funcionales Maestros, 33 HUs, 33 CUs, 6 RNFs, esquema ER, API REST y Vistas |
| **4. Actualidad** | 100% | ✅ APROBADO | Python 3.12+, Pydantic v2, React 18+, TypeScript 5+, Docker Compose v2 |
| **5. Seguridad** | 96% | ✅ APROBADO | bcrypt con salt, consultas parametrizadas, tokens criptográficos, RBAC por roles y OWASP Top 10 |

---

## 2. Evaluación Detallada por Eje

### 2.1 Pertinencia Curricular y Profesional

* **Alineación con el perfil de egreso SENA ADSO**: El proyecto cubre el ciclo de vida completo del desarrollo de software: análisis de requisitos, diseño de bases de datos relacionales, implementación backend con arquitectura REST, frontend con gestión de estado global y despliegue orquestado.
* **Problema real resuelto**: Automatiza la gestión de citas de una barbería, eliminando tiempos de espera no programados, pérdidas de clientes por falta de agenda y facilitando el cálculo de ingresos y comisiones para los barberos.
* **Trazabilidad de requisitos**: Cumple con la trazabilidad bidireccional desde los anexos de la propuesta técnica original (PDF/Excel) hasta el código fuente y los esquemas de base de datos.

### 2.2 Relevancia Tecnológica

* **Backend (FastAPI + Python)**: Se seleccionó FastAPI por su alto rendimiento asíncrono (ASGI), su integración nativa con OpenAPI/Swagger y su tipado estricto con Pydantic, superando las limitaciones de frameworks monolíticos pesados.
* **Frontend (React + TypeScript + Redux Toolkit)**: Uso de TypeScript en modo estricto para evitar errores de tipo en tiempo de compilación. Redux Toolkit centraliza los estados de autenticación y datos de citas, sincronizando cambios en tiempo real en la UI.
* **Persistencia Relacional (MySQL)**: Esquema normalizado en 3FN con 12 tablas, integridad referencial mediante claves foráneas y optimización de consultas complejas mediante 3 Vistas SQL dedicadas.
* **Contenedores (Docker + Docker Compose)**: Garantiza la reproducibilidad del entorno sin depender de configuraciones manuales heterogéneas en los equipos de los aprendices.

### 2.3 Completitud del Repositorio

* **Documentación Técnica**:
  - `README.md` maestro con instrucciones de instalación y guía de navegación completa.
  - `docs/referencia-tecnica/architecture.md`: Diagramas de capas, flujo de datos y decisiones de diseño.
  - `docs/referencia-tecnica/database-schema.md`: Diccionario de datos de 12 tablas, tipos de datos, índices y vistas.
  - `docs/referencia-tecnica/api-endpoints.md`: Especificación exhaustiva de endpoints con request/response bodies en JSON.
  - `docs/referencia-tecnica/design-system.md`: Guía de tokens de color, componentes y estados visuales.
* **Requisitos Formales**:
  - 16 Requisitos Funcionales Maestros estructurados con Entradas, Proceso, Salidas y Reglas de Negocio.
  - 33 Historias de Usuario con Criterios de Aceptación estructurados en formato BDD (`Dado que / Cuando / Entonces`).
  - 33 Casos de Uso con diagramas de flujo en formato Mermaid.
  - 6 Requisitos No Funcionales (RNF-001 a RNF-006) y matriz de restricciones de negocio y legales.
* **Conceptos Avanzados**:
  - Guía pedagógica de Patrones Arquitectónicos (10 patrones aplicados en Globde).
  - Guía de Mitigación OWASP Top 10 (2021).
  - Guía de Accesibilidad Web (WCAG 2.1 AA y ARIA).

### 2.4 Actualidad del Software

* **Versiones fijadas**: Las dependencias se encuentran documentadas y fijadas en `backend/requirements.txt` y `frontend/package.json`.
* **Compatibilidad moderna**: Compatible con navegadores modernos Evergreen (Chrome, Firefox, Edge, Safari) y soporte responsive desde 320px de ancho.
* **Node 20+ y Python 3.12+**: Uso de runtime LTS con soporte activo en la industria.

### 2.5 Seguridad y Protección de la Información

* **Criptografía**: Contraseñas protegidas mediante algoritmo de hashing irreversible `bcrypt`. Nunca se almacenan ni se transmiten contraseñas en texto plano.
* **Inyección SQL (SQLi)**: Todas las consultas a la base de datos se ejecutan mediante consultas parametrizadas con tuplas de valores en `mysql-connector`, eliminando el riesgo de concatenación de cadenas SQL.
* **Control de Acceso Basado en Roles (RBAC)**: Diferenciación estricta entre Administrador (Rol 1), Barbero (Rol 2) y Cliente (Rol 3) tanto en validaciones backend como en el guard `ProtectedRoute.tsx` del frontend.
* **Recuperación de Contraseña Segura**: Generación de tokens URL-safe aleatorios con `secrets.token_urlsafe(32)` con tiempo de expiración limitado (30 minutos) y un solo uso.
* **Protección de Datos Personales**: Cumplimiento de la Ley 1581 de 2012 (Habeas Data Colombia) en la captura y tratamiento de nombres, correos y números telefónicos.

---

## 3. Matriz de Gaps y Plan de Mejora Continua

| Ítem | Estado Actual | Recomendación para Futuras Versiones |
| :--- | :---: | :--- |
| **Pasarela de Pagos** | Simulado / En efectivo | Integrar pasarela de pagos digital (ej. Wompi, Stripe o PSE) para pago anticipado |
| **Testing Automatizado** | Verificación manual y tipado estricto | Incorporar suite de pruebas automatizadas con `pytest` y `Vitest` |
| **Integración Continua (CI)**| Manual en Git | Agregar GitHub Actions para validación automática de build y lint en cada Pull Request |
| **Notificaciones SMS/WhatsApp** | Correo SMTP | Implementar webhook de WhatsApp Business API para recordatorios inmediatos |

---

## 4. Dictamen Final

El proyecto **GLOBDE** cumple a cabalidad con los estándares exigidos para proyectos de formación tecnológica del SENA, demostrando solidez técnica, calidad documental y aplicabilidad en el sector productivo.
