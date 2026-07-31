# 💻 Instalación sin Docker (manual)

[⬅ Volver al README principal](../../README.md)

Usa esta guía si no tienes Docker instalado y prefieres correr todo directamente en tu máquina.

## Prerrequisitos

| Herramienta | Verificar con |
|---|---|
| Python 3.11+ | `python3 --version` |
| Node.js 18+ | `node --version` |
| MySQL Server (local, instalado en tu equipo) | `mysql --version` |
| Git | `git --version` |

## 1. Clonar el repositorio

```bash
git clone https://github.com/tu-usuario/globde.git
cd GLOBDE
```

## 2. Configurar la base de datos

1. Abre MySQL Workbench (o tu cliente de MySQL preferido).
2. Crea una nueva conexión a tu servidor local.
3. Ejecuta el script [`database/database.sql`](../../database/database.sql) — esto crea la base de datos `globde` con sus 12 tablas.

## 3. Configurar y ejecutar el Backend

```bash
cd backend

# Crear entorno virtual
python -m venv venv

# Activar entorno virtual
source venv/bin/activate        # Linux / macOS
venv\Scripts\activate           # Windows (CMD/PowerShell)

# Instalar dependencias
pip install -r requirements.txt

# Configurar variables de entorno
cp .env.example .env
# Edita .env con los datos de tu MySQL local (usuario, contraseña, puerto)

# Ejecutar el servidor
uvicorn app.main:app --reload
```

El backend queda disponible en `http://localhost:8000` (Swagger en `http://localhost:8000/docs`).

## 4. Configurar y ejecutar el Frontend

En otra terminal:

```bash
cd frontend
npm install
npm run dev
```

El frontend queda disponible en `http://localhost:5173`.

## 🪟 Nota para usuarios de Windows

También puedes usar el script `Arrancar-Globde.bat` (en la raíz del proyecto) para iniciar backend y frontend automáticamente, siempre que ya hayas configurado el entorno virtual y las dependencias al menos una vez.

---

[⬅ Volver al README principal](../../README.md)
