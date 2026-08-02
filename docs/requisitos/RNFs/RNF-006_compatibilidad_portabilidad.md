# RNF-006 — Compatibilidad y Portabilidad

<!--
  ¿Qué? Requisito no funcional que define el soporte multiplataforma y la portabilidad del entorno de ejecución.
  ¿Para qué? Garantizar que el sistema funcione uniformemente en diferentes sistemas operativos y navegadores.
  ¿Impacto? Sin portabilidad, el despliegue falla en entornos heterogéneos y los clientes experimentan errores según su navegador.
-->

---

## Identificación

| Campo | Valor |
| :--- | :--- |
| **ID** | RNF-006 |
| **Nombre** | Compatibilidad y Portabilidad |
| **Categoría** | Portabilidad (ISO/IEC 25010 - Adaptability, Installability, Replaceability) |
| **Prioridad** | Alta |
| **Estado** | Implementado |

---

## Especificación de Requisitos

### RNF-006.1 — Compatibilidad de Navegadores (Cross-Browser)
La aplicación web frontend debe ser 100% funcional y visualmente idéntica en las dos últimas versiones estables de los siguientes navegadores:
- Google Chrome / Chromium
- Mozilla Firefox
- Microsoft Edge
- Apple Safari (macOS e iOS)

### RNF-006.2 — Contenedorización con Docker y Docker Compose
Todo el backend y la base de datos MySQL deben poder ejecutarse de forma idéntica en Linux, macOS y Windows a través de `docker compose up -d`, sin requerir la instalación manual de MySQL o librerías del sistema operativo anfitrión.

### RNF-006.3 — Portabilidad de Base de Datos
El script `database/database.sql` debe estar estructurado en sintaxis estándar ANSI SQL / MySQL 8.0+ para poder migrarse o restaurarse en cualquier instancia local, remota o en la nube (AWS RDS, GCP Cloud SQL, PlanetScale o VPS local).
