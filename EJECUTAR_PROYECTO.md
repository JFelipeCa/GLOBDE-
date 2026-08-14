# GLOBDE — cómo correr el proyecto completo

Guía para levantar la base de datos, el backend y el frontend, y comprobar qué
funciona hoy.

**El proyecto completo funciona de punta a punta.** El frontend habla con la
API antigua (v1) y no se tocó ni una línea de su código: la compatibilidad se
resolvió en el backend con un router de traducción. La sección 4 explica cómo
funciona y cómo apagarlo cuando el frontend migre.

---

## 1. Levantar todo con Docker

Requisito único: **Docker Desktop abierto** (en Windows, con WSL2). No
necesitas instalar Python, Node ni MySQL.

### Paso 1 — Crear los dos archivos de configuración

Son **dos**, y hacen cosas distintas. Este es el error más común: crear solo
uno.

```bash
cp .env.example .env                    # 1) clave de MySQL (raíz del proyecto)
cp backend/.env.example backend/.env    # 2) configuración de la API
```

> En PowerShell usa `copy .env.example .env` y
> `copy backend\.env.example backend\.env`.

- El **`.env` de la raíz** es el único que lee Docker Compose para reemplazar
  las `${...}` del `docker-compose.yml`. De ahí sale la clave con la que
  arranca MySQL, y esa misma clave se le inyecta al backend.
- El **`backend/.env`** configura la API por dentro (JWT, reglas de negocio,
  SMTP). No hace falta que le toques `DB_HOST` ni `DB_PASSWORD`: el compose los
  sobrescribe con los valores correctos de la red de Docker.

### Paso 2 — Poner un JWT_SECRET

Genera uno y pégalo en `backend/.env`:

```bash
python -c "import secrets; print(secrets.token_urlsafe(48))"
```

```ini
JWT_SECRET=<lo que imprimió el comando>
```

Si lo dejas vacío la API igual arranca, pero genera un secreto temporal y las
sesiones se caen en cada reinicio.

### Paso 3 — Arrancar

```bash
docker compose up --build
```

Levanta tres servicios:

| Servicio | URL | Qué es |
|---|---|---|
| `mysql` | `localhost:3307` | Base de datos, con `database/database.sql` ya cargado |
| `backend` | <http://localhost:8000/docs> | La API v2 |
| `frontend` | <http://localhost:5173> | La interfaz en React |

La primera vez tarda un par de minutos (compila imágenes e instala paquetes).
Espera a ver en la consola:

```
globde_backend   | INFO:     Application startup complete.
globde_frontend  |   ➜  Local:   http://localhost:5173/
```

Y abre <http://localhost:5173>. Para comprobar que **no** está en modo demo,
entra con `admin@globde.test` / `Globde2025*`: si ves las 5 citas y los 6
servicios de la semilla, está hablando con la base de datos real.

Para apagar: `Ctrl+C`, o `docker compose down` desde otra terminal.

### Desde VS Code

Con la extensión **Docker** instalada: clic derecho en `docker-compose.yml` →
**Compose Up**. Equivale al comando de arriba. Los logs de cada contenedor
quedan en el panel de Docker, y los puertos 5173/8000 se reenvían solos.

### Si algo falla

| Síntoma | Causa y solución |
|---|---|
| `env file ./backend/.env not found` | Te faltó el Paso 1. Copia los dos archivos. |
| El backend reinicia en bucle con `Access denied for user 'root'` | Cambiaste `DB_PASSWORD` en el `.env` de la raíz **después** de crear el volumen. MySQL conserva la clave del primer arranque: `docker compose down -v && docker compose up --build`. |
| `Conflict. The container name "/globde_mysql" is already in use` | Quedó un contenedor de un intento anterior (o de otra carpeta). Bórralos y vuelve a arrancar: `docker rm -f globde_mysql globde_backend globde_frontend`. |
| `port is already allocated` | Ya tienes algo en 5173, 8000 o 3307. Ciérralo o cambia el puerto de la izquierda en `docker-compose.yml` (p. ej. `"8001:8000"`). |
| El frontend carga pero muestra el aviso de modo demo | El backend aún no terminó de arrancar. Recarga a los 20 s. Si sigue, mira `docker compose logs backend`. |
| Vite arranca con un error de `esbuild`/`rollup` | Tenías `node_modules` de Windows o Mac en `frontend/`. Ya está cubierto por `.dockerignore`, pero fuerza la reconstrucción: `docker compose build --no-cache frontend`. |
| Quiero la base de datos limpia otra vez | `docker compose down -v` borra el volumen y `database.sql` se vuelve a ejecutar en el siguiente `up`. |

MySQL solo ejecuta `database.sql` al **crear** el volumen. Si editas el
esquema, `docker compose down -v` es obligatorio para que se recargue.

---

## 2. Sin Docker

Necesitas MySQL 8 o MariaDB 11, Python 3.11+ y Node 20+.

**Base de datos**

```bash
mysql -u root -p < database/database.sql
```

**Backend** (una terminal)

```bash
cd backend
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env          # DB_HOST=127.0.0.1 y tus credenciales
uvicorn app.main:app --reload
```

**Frontend** (otra terminal)

```bash
cd frontend
npm install
npm run dev
```

Vite redirige `/api` a `http://localhost:8000`, así que no hace falta
configurar ninguna URL.

---

## 3. Comprobar que el backend funciona

Esta parte sí está terminada y conectada a la base de datos real.

La forma más cómoda es <http://localhost:8000/docs>: la documentación
interactiva te deja ejecutar cualquiera de los 113 endpoints desde el
navegador. Pulsa **Authorize**, pega el token y prueba lo que quieras.

Para obtener el token:

```bash
curl -X POST http://localhost:8000/api/auth/login \
  -H 'Content-Type: application/json' \
  -d '{"correo":"admin@globde.test","contrasena":"Globde2025*"}'
```

```bash
TOKEN=<pega_el_access_token>
curl http://localhost:8000/api/reportes/dashboard -H "Authorization: Bearer $TOKEN"
curl http://localhost:8000/api/citas            -H "Authorization: Bearer $TOKEN"
curl "http://localhost:8000/api/citas/disponibilidad?id_barbero=1&fecha=2026-08-20&id_servicio=1" \
     -H "Authorization: Bearer $TOKEN"
```

Cuentas semilla, todas con la contraseña `Globde2025*`:

| Correo | Rol |
|---|---|
| `admin@globde.test` | administrador |
| `barbero1@globde.test` | barbero |
| `cliente1@example.com` | cliente |

Sirven para ver el control de permisos: con el token de un cliente,
`/api/usuarios` responde `403`.

**Las pruebas automatizadas** son la comprobación más completa:

```bash
cd backend
python -m pytest                        # 132 pruebas
python -m pytest -m "not integracion"   # 41 unitarias, sin base de datos
```

Recorren el flujo real: crear una cita, detectar solapamientos, cancelar y
devolver puntos, facturar, reseñar y revisar la auditoría. Para borrar los
datos que generan:

```bash
python scripts/limpiar_datos_prueba.py --si
```

---

## 4. Cómo se conectó el frontend sin modificarlo

El frontend fue escrito contra la API v1 y llama a cuatro rutas que la v2 ya no
expone con esa forma. Como no había que tocar su código, la traducción vive en
el backend: `backend/app/routers/legacy.py`.

Antes (backend v2 puro) el frontend arrancaba en modo demo, con el aviso
*«Conexión de backend no disponible — se mantendrá el modo demo con datos
locales»*. Estas eran las respuestas:

| Lo que pide el frontend | Antes | Ahora |
|---|---|---|
| `GET /api/datos` | `404` | `200` — servicios, barberos, clientes y citas reales |
| `POST /api/login` | `404` | `200` — perfil plano, como esperaba la v1 |
| `POST /api/clientes` (registro) | `401` | `201` — registro público |
| `POST /api/citas` con `id_usuario` y `hora` | `422` | `201` — cita creada |

### Qué hace el router de compatibilidad

- **`GET /datos`** reúne en una sola respuesta lo que la v2 sirve por separado,
  con las claves de la v1: las citas llevan `id_usuario` (el usuario del
  barbero) y `hora`, y cada barbero trae `rating`, `experiencia_anos`, `bio` y
  `especialidades`.
- **`POST /login`** valida igual que `/auth/login`, pero aplana la respuesta al
  perfil que el frontend lee. Incluye además `access_token` por si más adelante
  se migra a JWT; hoy el frontend lo ignora.
- **`POST /clientes`** atiende las dos versiones sobre la misma ruta: **con**
  token de admin o barbero se comporta exactamente como el alta v2 (misma
  validación, misma auditoría, misma respuesta); **sin** token es el registro
  público que usa el formulario del frontend.
- **`POST /citas`** acepta el payload v1 (`id_usuario` + `hora`) y lo traduce a
  `id_barbero` + `hora_inicio`, dejando que el backend calcule `hora_fin`. Si
  el payload ya viene en formato v2 y hay sesión, se delega tal cual en la
  ruta v2.

En `/docs`, `POST /api/clientes` y `POST /api/citas` aparecen con el esquema
v2: el generador de OpenAPI se queda con la última definición de cada ruta. En
ejecución responde el handler de compatibilidad, que acepta ambos formatos.

**Las reglas de negocio no se relajaron.** Toda cita creada por esta vía pasa
por las mismas validaciones: barbero activo y disponible, que preste el
servicio, fecha futura, jornada laboral, bloqueos de agenda y solapamiento
(`409`). Un cliente autenticado sigue sin poder agendar para otro (`403`).

### Cómo apagarlo

Es un puente temporal. En `backend/.env`:

```env
ENABLE_LEGACY_ROUTES=false
```

Con eso la API queda solo con el contrato v2 y el frontend vuelve al modo demo
hasta que migre. Lo recomendable para producción es apagarlo, porque `/datos`
responde sin autenticación (igual que en la v1).

### Lo que sigue pendiente del lado del frontend

Nada de esto bloquea el funcionamiento, pero conviene resolverlo:

- Guardar el `access_token` y enviarlo en cada petición, para pasar a los
  endpoints v2 y poder apagar el router legacy.
- El código de `src/pages/`, `src/store/` y `src/api/` **no se usa**: la app
  real cuelga de `App.tsx` → `AppContext.tsx`. Son restos de otra iteración que
  importan `axios`, `redux` y `react-router`, paquetes que ni siquiera están en
  el `package.json`. El build pasa porque Vite solo compila lo alcanzable desde
  `main.tsx`.
- `src/api/axiosClient.ts` tiene un error: para `localhost` devuelve una URL de
  Codespaces escrita a mano y terminada en `/api/login`. Es código muerto, pero
  conviene arreglarlo antes de reutilizarlo.

---

## 5. Qué contiene el paquete

```
GLOBDE-completo/
├── EJECUTAR_PROYECTO.md   ← este archivo
├── backend/               ← API v2 (código, 132 pruebas, Dockerfile, README)
├── frontend/              ← interfaz React + Vite (sin modificar, ver sección 4)
├── database/              ← database.sql y documentación del esquema
├── docs/                  ← requisitos y referencia técnica
├── docker-compose.yml     ← mysql + backend + frontend
├── .env.example           ← clave de MySQL para Docker (cópialo como .env)
└── globde-be-terminado.bundle  ← el commit del backend, para subirlo a GitHub
```

No incluye `.git/`, `node_modules/`, `__pycache__/` ni ningún `.env` con
credenciales reales.

---

## 6. Subir el backend a GitHub

Cuando lo hayas probado, desde tu clon del repositorio:

```bash
git fetch /ruta/al/globde-be-terminado.bundle feature/be-terminado:feature/be-terminado
git push -u origin feature/be-terminado
```

Obtienes los commits del backend tal cual (HEAD `dfccd44`). La rama `feature/db-v2-profesional` no
se toca. Al abrir el Pull Request apúntalo a esa rama de integración, **no a
`main`**, que según el README_DB está reservada para producción.
