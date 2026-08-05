import hashlib
import os
import secrets
import smtplib
from datetime import date, datetime, timedelta
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
import bcrypt
import mysql.connector

load_dotenv()

app = FastAPI(title="GLOBDE API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

DB_CONFIG = {
    "host":     os.getenv("DB_HOST", "127.0.0.1"),
    "port":     int(os.getenv("DB_PORT", "3306")),
    "user":     os.getenv("DB_USER", "root"),
    "password": os.getenv("DB_PASSWORD"),
    "database": os.getenv("DB_NAME", "globde"),
}

FRONTEND_URL = os.getenv("FRONTEND_URL", "http://localhost:5173")
RESET_TOKEN_MINUTES = int(os.getenv("RESET_TOKEN_MINUTES", "30"))

SMTP_HOST = os.getenv("SMTP_HOST", "")
SMTP_PORT = int(os.getenv("SMTP_PORT", "587"))
SMTP_USER = os.getenv("SMTP_USER", "")
SMTP_PASSWORD = os.getenv("SMTP_PASSWORD", "")
SMTP_FROM = os.getenv("SMTP_FROM", SMTP_USER)
SMTP_STARTTLS = os.getenv("SMTP_STARTTLS", "true").lower() == "true"

ROL_ADMINISTRADOR = 1
ROL_BARBERO       = 2
ROL_CLIENTE       = 3


def get_connection():
    return mysql.connector.connect(**DB_CONFIG)


def fetchall(query: str, params: tuple = ()):
    conn = get_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute(query, params)
    rows = cursor.fetchall()
    cursor.close()
    conn.close()
    return [serializar(row) for row in rows]


def fetchone(query: str, params: tuple = ()):
    conn = get_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute(query, params)
    row = cursor.fetchone()
    cursor.close()
    conn.close()
    return serializar(row) if row else None


def execute(query: str, params: tuple = ()):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute(query, params)
    conn.commit()
    last_id = cursor.lastrowid
    cursor.close()
    conn.close()
    return last_id


def execute_many(query: str, params: tuple = ()):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute(query, params)
    conn.commit()
    cursor.close()
    conn.close()


def call_proc(proc_name: str, args: tuple = ()):
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
    return {k: v for k, v in usuario.items() if k != "contrasena"}


def hash_password(password: str) -> str:
    return bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")


def es_hash_bcrypt(valor: str) -> bool:
    return valor.startswith("$2b$") or valor.startswith("$2a$") or valor.startswith("$2y$")


def verificar_password(id_usuario: int, password_ingresada: str, password_guardada: str) -> bool:
    """Verifica la contrasena. Si en la BD todavia esta en texto plano
    (usuarios creados antes de agregar hashing), compara en texto plano
    y de paso la migra a bcrypt para que quede protegida desde ese momento."""
    if es_hash_bcrypt(password_guardada):
        return bcrypt.checkpw(
            password_ingresada.encode("utf-8"), password_guardada.encode("utf-8")
        )

    if password_ingresada == password_guardada:
        execute(
            "UPDATE usuarios SET contrasena = %s WHERE id_usuario = %s",
            (hash_password(password_ingresada), id_usuario),
        )
        return True

    return False


def ensure_password_reset_table():
    execute_many(
        """CREATE TABLE IF NOT EXISTS password_reset_tokens (
            id_token INT AUTO_INCREMENT PRIMARY KEY,
            id_usuario INT NOT NULL,
            token_hash VARCHAR(64) NOT NULL,
            expires_at DATETIME NOT NULL,
            used TINYINT DEFAULT 0,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            INDEX idx_password_reset_token_hash (token_hash),
            INDEX idx_password_reset_usuario (id_usuario),
            CONSTRAINT fk_password_reset_usuario
                FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario)
                ON DELETE CASCADE
        )""",
    )


def hash_token(token: str) -> str:
    return hashlib.sha256(token.encode("utf-8")).hexdigest()


def validar_config_correo():
    if not SMTP_HOST or not SMTP_USER or not SMTP_PASSWORD or not SMTP_FROM:
        raise HTTPException(
            status_code=500,
            detail="Configura SMTP_HOST, SMTP_USER, SMTP_PASSWORD y SMTP_FROM en .env",
        )


def enviar_correo_recuperacion(destinatario: str, nombre: str, token: str):
    validar_config_correo()
    enlace = f"{FRONTEND_URL}/restablecer-password?token={token}"

    mensaje = MIMEMultipart()
    mensaje["Subject"] = "Restablece tu contraseña - GLOBDE"
    mensaje["From"] = SMTP_FROM
    mensaje["To"] = destinatario

    cuerpo_html = f"""
    <html>
        <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f8f9fa;">
            <table role="presentation" cellspacing="0" cellpadding="0" width="100%" style="background-color: #f8f9fa; padding: 40px 20px;">
                <tr>
                    <td align="center">
                        <table role="presentation" cellspacing="0" cellpadding="0" width="100%" style="max-width: 550px; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05); border: 1px solid #e9ecef;">
                            <tr>
                                <td align="center" style="background-color: #ffffff; padding: 35px 20px; border-bottom: 1px solid #e9ecef;">
                                    <h1 style="margin: 0; font-size: 26px; color: #000000; letter-spacing: 2px; font-weight: bold;">GLOBDE</h1>
                                </td>
                            </tr>
                            <tr>
                                <td style="padding: 40px 35px; background-color: #ffffff;">
                                    <h2 style="margin: 0 0 20px 0; font-size: 18px; color: #212529; font-weight: 600;">Hola, {nombre}:</h2>
                                    <p style="margin: 0 0 30px 0; font-size: 15px; color: #495057; line-height: 1.6;">
                                        Recibimos una solicitud para recuperar el acceso a tu cuenta. Ingresa al siguiente enlace para restablecer tu contraseña de forma segura:
                                    </p>
                                    <table role="presentation" cellspacing="0" cellpadding="0" width="100%">
                                        <tr>
                                            <td align="center" style="padding: 10px 0 35px 0;">
                                                <a href="{enlace}" target="_blank" style="background-color: #111111; color: #ffffff; padding: 14px 40px; text-decoration: none; border-radius: 6px; font-weight: 500; font-size: 15px; display: inline-block; letter-spacing: 0.5px;">
                                                    Restablecer Contraseña
                                                </a>
                                            </td>
                                        </tr>
                                    </table>
                                    <div style="background-color: #f8f9fa; border-left: 4px solid #00a896; padding: 15px; border-radius: 4px; margin-bottom: 10px;">
                                        <p style="margin: 0; font-size: 13px; color: #6c757d; line-height: 1.5;">
                                            Este enlace vence en {RESET_TOKEN_MINUTES} minutos. Si no solicitaste este cambio, puedes ignorar este correo de forma segura.
                                        </p>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td align="center" style="padding: 25px 20px; background-color: #ffffff; border-top: 1px solid #e9ecef;">
                                    <a href="{FRONTEND_URL}" style="color: #00a896; text-decoration: none; font-size: 14px; font-weight: 500;">Volver al inicio</a>
                                    <p style="margin: 20px 0 0 0; font-size: 11px; color: #adb5bd;">&copy; 2026 Globde. Todos los derechos reservados.</p>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </body>
    </html>
    """
    
    mensaje.attach(MIMEText(cuerpo_html, "html"))

    with smtplib.SMTP(SMTP_HOST, SMTP_PORT) as servidor:
        if SMTP_STARTTLS:
            servidor.starttls()
        servidor.login(SMTP_USER, SMTP_PASSWORD)
        servidor.send_message(mensaje)


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


class PasswordForgotRequest(BaseModel):
    correo: str


class PasswordResetRequest(BaseModel):
    token: str
    nueva_contrasena: str


@app.get("/")
def inicio():
    return {"mensaje": "API GLOBDE activa"}


@app.post("/api/login")
def login(payload: LoginRequest):
    usuario = fetchone(
        "SELECT * FROM usuarios WHERE correo = %s AND activo = 1",
        (payload.correo,),
    )
    if not usuario or not verificar_password(
        usuario["id_usuario"], payload.contrasena, usuario["contrasena"]
    ):
        raise HTTPException(status_code=401, detail="Correo o contraseña incorrectos")
    return ocultar_contrasena(usuario)


@app.post("/api/password/forgot")
def solicitar_recuperacion_password(payload: PasswordForgotRequest):
    ensure_password_reset_table()
    respuesta = {
        "mensaje": "Si el correo existe, se enviaron instrucciones de recuperacion."
    }

    usuario = fetchone(
        "SELECT id_usuario, nombre, correo FROM usuarios WHERE correo = %s AND activo = 1",
        (payload.correo,),
    )
    if not usuario:
        return respuesta

    token = secrets.token_urlsafe(32)
    token_hash = hash_token(token)
    expires_at = datetime.now() + timedelta(minutes=RESET_TOKEN_MINUTES)

    execute_many(
        "UPDATE password_reset_tokens SET used = 1 WHERE id_usuario = %s AND used = 0",
        (usuario["id_usuario"],),
    )
    execute(
        """INSERT INTO password_reset_tokens (id_usuario, token_hash, expires_at)
           VALUES (%s, %s, %s)""",
        (usuario["id_usuario"], token_hash, expires_at),
    )
    enviar_correo_recuperacion(usuario["correo"], usuario["nombre"], token)
    return respuesta


@app.post("/api/password/reset")
def restablecer_password(payload: PasswordResetRequest):
    ensure_password_reset_table()
    if len(payload.nueva_contrasena) < 6 or len(payload.nueva_contrasena) > 50:
        raise HTTPException(
            status_code=400,
            detail="La contrasena debe tener entre 6 y 50 caracteres",
        )

    token_hash = hash_token(payload.token)
    registro = fetchone(
        """SELECT id_token, id_usuario
           FROM password_reset_tokens
           WHERE token_hash = %s AND used = 0 AND expires_at > NOW()
           ORDER BY created_at DESC
           LIMIT 1""",
        (token_hash,),
    )
    if not registro:
        raise HTTPException(status_code=400, detail="El enlace no es valido o ya vencio")

    execute_many(
        "UPDATE usuarios SET contrasena = %s WHERE id_usuario = %s",
        (hash_password(payload.nueva_contrasena), registro["id_usuario"]),
    )
    execute_many(
        "UPDATE password_reset_tokens SET used = 1 WHERE id_token = %s",
        (registro["id_token"],),
    )
    return {"mensaje": "Contrasena actualizada correctamente"}


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


@app.get("/api/vistas/citas")
def vista_citas():
    return fetchall("SELECT * FROM vista_citas_detalle")


@app.get("/api/vistas/clientes")
def vista_clientes():
    return fetchall("SELECT * FROM vista_clientes_resumen")


@app.get("/api/vistas/ingresos")
def vista_ingresos():
    return fetchall("SELECT * FROM vista_ingresos_barbero")


@app.get("/api/procedimientos/servicios")
def proc_servicios():
    return call_proc("sp_listar_servicios")


@app.get("/api/procedimientos/citas-barbero/{id_usuario}/{fecha}")
def proc_citas_barbero(id_usuario: int, fecha: str):
    return call_proc("sp_citas_barbero_fecha", (id_usuario, fecha))


@app.get("/api/procedimientos/reporte/{anio}/{mes}")
def proc_reporte_mensual(anio: int, mes: int):
    return call_proc("sp_reporte_mensual", (anio, mes))


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

    id_usuario = execute(
        """INSERT INTO usuarios (nombre, correo, contrasena, telefono, id_rol)
           VALUES (%s, %s, %s, %s, %s)""",
        (payload.nombre, payload.correo, hash_password(payload.contrasena), payload.telefono, ROL_CLIENTE),
    )

    id_cliente = execute(
        """INSERT INTO clientes (id_usuario, nombre, telefono, correo)
           VALUES (%s, %s, %s, %s)""",
        (id_usuario, payload.nombre, payload.telefono, payload.correo),
    )

    return fetchone("SELECT * FROM clientes WHERE id_cliente = %s", (id_cliente,))


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
            (payload.nombre, payload.correo, payload.telefono, hash_password(payload.contrasena), id_usuario),
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


@app.get("/api/citas")
def listar_citas():
    return fetchall("SELECT * FROM citas")


@app.post("/api/citas")
def crear_cita(payload: CitaCreate):
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


# ------------------------------------------------------------
# USUARIOS INTERNOS (barberos y administradores)
# ------------------------------------------------------------

class UsuarioInternoCreate(BaseModel):
    nombre:    str
    correo:    str
    contrasena: str
    telefono:  str
    id_rol:    int  # 1=Admin, 2=Barbero


@app.post("/api/usuarios/interno")
def crear_usuario_interno(payload: UsuarioInternoCreate):
    if payload.id_rol not in [ROL_ADMINISTRADOR, ROL_BARBERO]:
        raise HTTPException(status_code=400, detail="Rol no permitido")

    existente = fetchone(
        "SELECT id_usuario FROM usuarios WHERE correo = %s", (payload.correo,)
    )
    if existente:
        raise HTTPException(status_code=400, detail="El correo ya está registrado")

    id_usuario = execute(
        """INSERT INTO usuarios (nombre, correo, contrasena, telefono, id_rol)
           VALUES (%s, %s, %s, %s, %s)""",
        (payload.nombre, payload.correo, hash_password(payload.contrasena), payload.telefono, payload.id_rol),
    )

    if payload.id_rol == ROL_BARBERO:
        execute(
            """INSERT INTO ranking_barberos (id_usuario, nivel, porcentaje_incremento, total_citas)
               VALUES (%s, 'Bronce', 0, 0)""",
            (id_usuario,),
        )

    usuario = fetchone(
        "SELECT * FROM usuarios WHERE id_usuario = %s", (id_usuario,)
    )
    return ocultar_contrasena(usuario)


@app.put("/api/usuarios/interno/{id_usuario}/desactivar")
def desactivar_usuario(id_usuario: int):
    usuario = fetchone(
        "SELECT * FROM usuarios WHERE id_usuario = %s", (id_usuario,)
    )
    if not usuario:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")

    execute(
        "UPDATE usuarios SET activo = 0 WHERE id_usuario = %s", (id_usuario,)
    )
    return {"mensaje": "Usuario desactivado correctamente"}