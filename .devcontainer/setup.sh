#!/usr/bin/env bash
# ============================================================
# GLOBDE — Setup automático del Codespace (postCreateCommand)
# 1) Variables de entorno  2) Dependencias backend
# 3) Dependencias frontend 4) MySQL en Docker + espera
# ============================================================
set -e
cd "$(dirname "$0")/.."   # raíz del repositorio

echo "==> [1/4] Variables de entorno"
# Raíz: fija la contraseña de MySQL que usa docker-compose (${DB_PASSWORD:-changeme})
if [ ! -f .env ]; then
  printf 'DB_PASSWORD=changeme\n' > .env
  echo "   .env (raíz) creado con DB_PASSWORD=changeme"
fi
# Backend: debe coincidir con la contraseña de MySQL
if [ ! -f backend/.env ]; then
  cp backend/.env.example backend/.env
  echo "   backend/.env creado desde .env.example"
fi

echo "==> [2/4] Dependencias del backend (Python)"
python3 -m venv backend/venv || true
backend/venv/bin/pip install --quiet --upgrade pip
backend/venv/bin/pip install --quiet -r backend/requirements.txt
echo "   Backend listo (backend/venv)"

echo "==> [3/4] Dependencias del frontend (Node)"
cd frontend
npm install --no-audit --no-fund
cd ..
echo "   Frontend listo (node_modules)"

echo "==> [4/4] MySQL 8.0 (contenedor globde_mysql)"
docker compose up -d mysql

echo -n "   Esperando a que MySQL importe database.sql"
for i in $(seq 1 90); do
  # Consulta real a una tabla semilla: garantiza que el import terminó
  if docker compose exec -T mysql mysql -uroot -pchangeme globde \
      -e "SELECT COUNT(*) FROM usuarios;" >/dev/null 2>&1; then
    echo " ✅ MySQL listo en 127.0.0.1:3307 (base 'globde' importada)"
    break
  fi
  printf "."
  sleep 2
  if [ "$i" -eq 90 ]; then
    echo ""
    echo "⚠️  MySQL tardó demasiado. Revisa: docker compose logs mysql"
  fi
done

echo ""
echo "============================================================"
echo " ✅ Entorno GLOBDE configurado. Para arrancar:"
echo "    Backend : cd backend && source venv/bin/activate && uvicorn app.main:app --reload --host 0.0.0.0"
echo "    Frontend: cd frontend && npm run dev        (otra terminal)"
echo "    Abre el puerto 5173 reenviado 🌐"
echo "============================================================"
