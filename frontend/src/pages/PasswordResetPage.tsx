import { useMemo, useState, type FormEvent } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { solicitarRecuperacionContrasena, restablecerContrasena } from '../api/globdeApi';

function PasswordResetPage() {
  const [searchParams] = useSearchParams();
  const token = useMemo(() => searchParams.get('token') || '', [searchParams]);

  const [correo, setCorreo] = useState('');
  const [nuevaContrasena, setNuevaContrasena] = useState('');
  const [confirmacion, setConfirmacion] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(false);

  const solicitarEnlace = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMensaje('');
    setError('');
    setCargando(true);

    try {
      const response = await solicitarRecuperacionContrasena({ correo });
      setMensaje(response.mensaje);
      setCorreo('');
    } catch {
      setError('No se pudo enviar el correo de recuperación.');
    } finally {
      setCargando(false);
    }
  };

  const cambiarContrasena = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMensaje('');
    setError('');

    if (nuevaContrasena.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres.');
      return;
    }
    if (nuevaContrasena !== confirmacion) {
      setError('Las contraseñas no coinciden.');
      return;
    }

    setCargando(true);
    try {
      const response = await restablecerContrasena({
        token,
        nueva_contrasena: nuevaContrasena,
      });
      setMensaje(response.mensaje);
      setNuevaContrasena('');
      setConfirmacion('');
    } catch {
      setError('El enlace no es válido, ya venció o no se pudo actualizar la contraseña.');
    } finally {
      setCargando(false);
    }
  };

  return (
    <main className="login-container reset-container">
      <h1>GLOBDE</h1>
      <p>
        {token
          ? 'Crea una nueva contraseña para tu cuenta.'
          : 'Ingresa tu correo y te enviaremos un enlace de recuperación.'}
      </p>

      {token ? (
        <form className="form-grid single" onSubmit={cambiarContrasena}>
          <label className="form-group">
            Nueva contrasena
            <input
              type="password"
              value={nuevaContrasena}
              onChange={(event) => setNuevaContrasena(event.target.value)}
              minLength={6}
              maxLength={50}
              required
            />
          </label>

          <label className="form-group">
            Confirmar contrasena
            <input
              type="password"
              value={confirmacion}
              onChange={(event) => setConfirmacion(event.target.value)}
              minLength={6}
              maxLength={50}
              required
            />
          </label>

          <button type="submit" disabled={cargando}>
            {cargando ? 'Guardando...' : 'Guardar nueva contraseña'}
          </button>
        </form>
      ) : (
        <form className="form-grid single" onSubmit={solicitarEnlace}>
          <label className="form-group">
            Correo
            <input
              type="email"
              value={correo}
              onChange={(event) => setCorreo(event.target.value)}
              placeholder="tu@correo.com"
              required
            />
          </label>

          <button type="submit" disabled={cargando}>
            {cargando ? 'Enviando...' : 'Enviar enlace'}
          </button>
        </form>
      )}

      {mensaje && <p className="message-box success">{mensaje}</p>}
      {error && <p className="message-box error">{error}</p>}

      <Link className="reset-link" to="/">
        Volver al inicio
      </Link>
    </main>
  );
}

export default PasswordResetPage;
