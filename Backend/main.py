from datetime import date
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import mysql.connector

app = FastAPI(title="GLOBDE API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

DB_CONFIG = {
    "host":     "127.0.0.1",
    "port":     3306,
    "user":     "root",
    "password": "LauraC12.*",  
    "database": "globde",
}

ROL_ADMINISTRADOR = 1
ROL_BARBERO       = 2
ROL_CLIENTE       = 3


def get_connection():
    """Abre y retorna una conexión a la BD."""
    return mysql.connector.connect(**DB_CONFIG)


def fetchall(query: str, params: tuple = ()):
    """Ejecuta una SELECT y retorna lista de dicts."""
    conn = get_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute(query, params)
    rows = cursor.fetchall()
    cursor.close()
    conn.close()
    return [serializar(row) for row in rows]


def fetchone(query: str, params: tuple = ()):
    """Ejecuta una SELECT y retorna un solo dict o None."""
    conn = get_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute(query, params)
    row = cursor.fetchone()
    cursor.close()
    conn.close()
    return serializar(row) if row else None


def execute(query: str, params: tuple = ()):
    """Ejecuta INSERT/UPDATE/DELETE y retorna el lastrowid."""
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute(query, params)
    conn.commit()
    last_id = cursor.lastrowid
    cursor.close()
    conn.close()
    return last_id


def call_proc(proc_name: str, args: tuple = ()):
    """Llama a un procedimiento almacenado y retorna los resultados."""
    conn = get_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.callproc(proc_name, args)
    rows = []
    for result in cursor.stored_results():
        rows.extend(result.fetchall())
    cursor.close()
    conn.close()
    return [serializar(row) for row in rows]


def serializar(row: dict) -> dict:
    """Convierte date, Decimal y timedelta a tipos serializables por JSON."""
    if row is None:
        return None
    result = {}
    for key, value in row.items():
        if isinstance(value, date):
            result[key] = str(value)
        elif hasattr(value, "__float__"):         
            result[key] = float(value)
        elif hasattr(value, "total_seconds"):     
            total = int(value.total_seconds())
            h, rem = divmod(total, 3600)
            m, s   = divmod(rem, 60)
            result[key] = f"{h:02d}:{m:02d}:{s:02d}"
        else:
            result[key] = value
    return result


def ocultar_contrasena(usuario: dict) -> dict:
    return {k: v for k, v in usuario.items() if k != "contraseña"}


# ============================================================
# MODELOS PYDANTIC
# ============================================================

class LoginRequest(BaseModel):
    correo:    str
    contrasena: str


class ClienteCreate(BaseModel):
    nombre:    str
    telefono:  str
    correo:    str
    contrasena: str


class CitaCreate(BaseModel):
    id_cliente:   int
    id_usuario:   int
    id_servicio:  int
    fecha:        str
    hora:         str
    estado:       str = "pendiente"
    observaciones: str = ""


class ServicioCreate(BaseModel):
    nombre:           str
    descripcion:      str
    precio:           float
    duracion_minutos: int


class PerfilUpdate(BaseModel):
    nombre:    str
    correo:    str
    telefono:  str
    contrasena: str | None = None


# ============================================================
# ENDPOINTS
# ============================================================

@app.get("/")
def inicio():
    return {"mensaje": "API GLOBDE activa"}


# ------------------------------------------------------------
# AUTH
# ------------------------------------------------------------

@app.post("/api/login")
def login(payload: LoginRequest):
    usuario = fetchone(
        "SELECT * FROM usuarios WHERE correo = %s AND contrasena = %s AND activo = 1",
        (payload.correo, payload.contrasena),
    )
    if not usuario:
        raise HTTPException(status_code=401, detail="Correo o contraseña incorrectos")
    return ocultar_contrasena(usuario)


# ------------------------------------------------------------
# DATOS GLOBALES 
# ------------------------------------------------------------

@app.get("/api/datos")
def obtener_datos():
    return {
        "roles":            fetchall("SELECT * FROM roles"),
        "usuarios":         [ocultar_contrasena(u) for u in fetchall(
                                "SELECT * FROM usuarios WHERE activo = 1"
                            )],
        "clientes":         fetchall("SELECT * FROM clientes"),
        "catalogo_cortes":  fetchall("SELECT * FROM catalogo_cortes"),
        "servicios":        fetchall("SELECT * FROM servicios WHERE activo = 1"),
        "citas":            fetchall("SELECT * FROM citas"),
        "facturas":         fetchall("SELECT * FROM facturas"),
        "detalle_factura":  fetchall("SELECT * FROM detalle_factura"),
        "penalidades":      fetchall("SELECT * FROM penalidades"),
        "ranking_barberos": fetchall("SELECT * FROM ranking_barberos"),
    }


# ------------------------------------------------------------
# VISTAS SQL 
# Endpoints extra que usan las vistas de la BD directamente
# ------------------------------------------------------------

@app.get("/api/vistas/citas")
def vista_citas():
    """Listado de citas con nombres reales via Vista SQL."""
    return fetchall("SELECT * FROM vista_citas_detalle")


@app.get("/api/vistas/clientes")
def vista_clientes():
    """Resumen de clientes con historial via Vista SQL."""
    return fetchall("SELECT * FROM vista_clientes_resumen")


@app.get("/api/vistas/ingresos")
def vista_ingresos():
    """Ingresos por barbero via Vista SQL."""
    return fetchall("SELECT * FROM vista_ingresos_barbero")


# ------------------------------------------------------------
# PROCEDIMIENTOS ALMACENADOS 
# ------------------------------------------------------------

@app.get("/api/procedimientos/servicios")
def proc_servicios():
    """Catálogo de servicios via procedimiento almacenado."""
    return call_proc("sp_listar_servicios")


@app.get("/api/procedimientos/citas-barbero/{id_usuario}/{fecha}")
def proc_citas_barbero(id_usuario: int, fecha: str):
    """Agenda de un barbero en una fecha via procedimiento almacenado."""
    return call_proc("sp_citas_barbero_fecha", (id_usuario, fecha))


@app.get("/api/procedimientos/reporte/{anio}/{mes}")
def proc_reporte_mensual(anio: int, mes: int):
    """Reporte mensual de citas e ingresos via procedimiento almacenado."""
    return call_proc("sp_reporte_mensual", (anio, mes))


# ------------------------------------------------------------
# CLIENTES
# ------------------------------------------------------------

@app.get("/api/clientes")
def listar_clientes():
    return fetchall("SELECT * FROM clientes")


@app.post("/api/clientes")
def crear_cliente(payload: ClienteCreate):
    existente = fetchone(
        "SELECT id_usuario FROM usuarios WHERE correo = %s", (payload.correo,)
    )
    if existente:
        raise HTTPException(status_code=400, detail="El correo ya esta registrado")

    # Crear usuario con rol cliente
    id_usuario = execute(
        """INSERT INTO usuarios (nombre, correo, contrasena, telefono, id_rol)
           VALUES (%s, %s, %s, %s, %s)""",
        (payload.nombre, payload.correo, payload.contrasena, payload.telefono, ROL_CLIENTE),
    )

    # Crear registro en clientes
    id_cliente = execute(
        """INSERT INTO clientes (id_usuario, nombre, telefono, correo)
           VALUES (%s, %s, %s, %s)""",
        (id_usuario, payload.nombre, payload.telefono, payload.correo),
    )

    return fetchone("SELECT * FROM clientes WHERE id_cliente = %s", (id_cliente,))


# ------------------------------------------------------------
# USUARIOS
# ------------------------------------------------------------

@app.get("/api/usuarios")
def listar_usuarios():
    return [
        ocultar_contrasena(u)
        for u in fetchall("SELECT * FROM usuarios WHERE activo = 1")
    ]


@app.put("/api/usuarios/{id_usuario}")
def actualizar_usuario(id_usuario: int, payload: PerfilUpdate):
    usuario = fetchone(
        "SELECT * FROM usuarios WHERE id_usuario = %s", (id_usuario,)
    )
    if not usuario:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")

    if payload.contrasena:
        execute(
            """UPDATE usuarios
               SET nombre = %s, correo = %s, telefono = %s, contrasena = %s
               WHERE id_usuario = %s""",
            (payload.nombre, payload.correo, payload.telefono, payload.contrasena, id_usuario),
        )
    else:
        execute(
            """UPDATE usuarios
               SET nombre = %s, correo = %s, telefono = %s
               WHERE id_usuario = %s""",
            (payload.nombre, payload.correo, payload.telefono, id_usuario),
        )

    execute(
        """UPDATE clientes
           SET nombre = %s, correo = %s, telefono = %s
           WHERE id_usuario = %s""",
        (payload.nombre, payload.correo, payload.telefono, id_usuario),
    )

    actualizado = fetchone(
        "SELECT * FROM usuarios WHERE id_usuario = %s", (id_usuario,)
    )
    return ocultar_contrasena(actualizado)


# ------------------------------------------------------------
# SERVICIOS
# ------------------------------------------------------------

@app.get("/api/servicios")
def listar_servicios():
    return fetchall("SELECT * FROM servicios WHERE activo = 1")


@app.post("/api/servicios")
def crear_servicio(payload: ServicioCreate):
    id_servicio = execute(
        """INSERT INTO servicios (nombre, descripcion, precio, duracion_minutos)
           VALUES (%s, %s, %s, %s)""",
        (payload.nombre, payload.descripcion, payload.precio, payload.duracion_minutos),
    )
    return fetchone("SELECT * FROM servicios WHERE id_servicio = %s", (id_servicio,))


# ------------------------------------------------------------
# CITAS
# ------------------------------------------------------------

@app.get("/api/citas")
def listar_citas():
    return fetchall("SELECT * FROM citas")


@app.post("/api/citas")
def crear_cita(payload: CitaCreate):
    # Verificar choque de horario
    choque = fetchone(
        """SELECT id_cita FROM citas
           WHERE id_usuario = %s AND fecha = %s AND hora = %s AND estado != 'cancelada'""",
        (payload.id_usuario, payload.fecha, payload.hora),
    )
    if choque:
        raise HTTPException(
            status_code=400, detail="El barbero ya tiene una cita en ese horario"
        )

    id_cita = execute(
        """INSERT INTO citas
           (id_cliente, id_usuario, id_servicio, fecha, hora, estado, observaciones)
           VALUES (%s, %s, %s, %s, %s, %s, %s)""",
        (
            payload.id_cliente,
            payload.id_usuario,
            payload.id_servicio,
            payload.fecha,
            payload.hora,
            payload.estado,
            payload.observaciones,
        ),
    )
    return fetchone("SELECT * FROM citas WHERE id_cita = %s", (id_cita,))


@app.put("/api/citas/{id_cita}")
def actualizar_cita(id_cita: int, payload: CitaCreate):
    existente = fetchone("SELECT id_cita FROM citas WHERE id_cita = %s", (id_cita,))
    if not existente:
        raise HTTPException(status_code=404, detail="Cita no encontrada")

    execute(
        """UPDATE citas
           SET id_cliente = %s, id_usuario = %s, id_servicio = %s,
               fecha = %s, hora = %s, estado = %s, observaciones = %s
           WHERE id_cita = %s""",
        (
            payload.id_cliente,
            payload.id_usuario,
            payload.id_servicio,
            payload.fecha,
            payload.hora,
            payload.estado,
            payload.observaciones,
            id_cita,
        ),
    )
    return fetchone("SELECT * FROM citas WHERE id_cita = %s", (id_cita,))
