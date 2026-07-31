# 🐳 Instalación con Docker

[⬅ Volver al README principal](../../README.md)

Esta es la forma **recomendada** de levantar Globde, ya que evita instalar MySQL manualmente en tu equipo.

## Prerrequisitos

| Herramienta | Verificar con |
|---|---|
| Docker | `docker --version` |
| Docker Compose | `docker compose version` |
| Node.js 18+ (solo para el frontend) | `node --version` |
| Git | `git --version` |

## Pasos

### 1. Clonar el repositorio

```bash
git clone https://github.com/tu-usuario/globde.git
cd GLOBDE
```

### 2. Configurar variables de entorno del backend

```bash
cd backend
cp .env.example .env
```

Abre `backend/.env` y ajusta los valores si lo necesitas (usuario, contraseña y nombre de la base de datos). Por defecto funciona con los valores de ejemplo para desarrollo local.

### 3. Levantar MySQL + Backend

```bash
cd ..
docker compose up -d
```

Esto crea dos contenedores:

| Contenedor | Servicio | Puerto |
|---|---|---|
| `globde_mysql` | Base de datos MySQL 8.0 | `3307` (mapeado desde `3306`) |
| `globde_backend` | API FastAPI | `8000` |

Verifica que ambos estén corriendo:

```bash
docker compose ps
```

La base de datos se inicializa automáticamente con el script `database/database.sql` la primera vez que se crea el contenedor.

### 4. Levantar el Frontend

El frontend **no** está dockerizado en este proyecto — se ejecuta directamente con Node:

```bash
cd frontend
npm install
npm run dev
```

- Frontend: `http://localhost:5173`
- Backend (API): `http://localhost:8000`
- Documentación interactiva de la API (Swagger): `http://localhost:8000/docs`

## Apagar los contenedores

```bash
docker compose down
```

Para borrar también los datos de la base de datos (reinicio completo):

```bash
docker compose down -v
```

---

[⬅ Volver al README principal](../../README.md)
