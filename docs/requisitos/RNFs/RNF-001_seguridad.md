# RNF-001 — Seguridad

## Identificación
| Campo | Valor |
|---|---|
| **ID** | RNF-001 |
| **Nombre** | Seguridad |
| **Prioridad** | Crítica |
| **Estado** | Parcial |

## Detalles de Implementación
1. Hashing contraseñas con bcrypt.\n2. Roles estrictos en backend (1:Admin, 2:Barbero, 3:Cliente).\n3. CORS limitado al dominio del frontend.\n4. Evitar SQL Injection usando parámetros `%s` en consultas MySQL.\n5. Secretos en archivo `.env`.
