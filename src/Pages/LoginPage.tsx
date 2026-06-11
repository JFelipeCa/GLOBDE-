import { useState, type FormEvent } from 'react';
import { Navigate } from 'react-router-dom';
import { iniciarSesion } from '../Store/authSlice';
import { useAppDispatch, useAppSelector } from '../Store/hooks';
import { ROL_ADMINISTRADOR, ROL_BARBERO, ROL_CLIENTE } from '../types';

function obtenerDestino(idRol: number) {
  if (idRol === ROL_ADMINISTRADOR) {
    return '/admin';
  }
  if (idRol === ROL_BARBERO) {
    return '/barbero';
  }
  if (idRol === ROL_CLIENTE) {
    return '/cliente';
  }
  return '/perfil';
}

function LoginPage() {
  const dispatch = useAppDispatch();
  const { usuario, estado, error } = useAppSelector((state) => state.auth);
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');

  if (usuario) {
    return <Navigate to={obtenerDestino(usuario.id_rol)} replace />;
  }

  const enviar = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(iniciarSesion({ correo, contrasena }));
  };

  return (
    <main className="login-container">
      <h1>GLOBDE</h1>
      <p>Ingresa con tu correo y contrasena para continuar.</p>

      <form className="form-grid single" onSubmit={enviar}>
        <label className="form-group">
          Correo
          <input
            type="email"
            value={correo}
            onChange={(event) => setCorreo(event.target.value)}
            placeholder="correo@globde.com"
            required
          />
        </label>

        <label className="form-group">
          Contrasena
          <input
            type="password"
            value={contrasena}
            onChange={(event) => setContrasena(event.target.value)}
            placeholder="Tu contrasena"
            required
          />
        </label>

        <button type="submit" disabled={estado === 'cargando'}>
          {estado === 'cargando' ? 'Ingresando...' : 'Ingresar'}
        </button>
      </form>

      {error && <p className="message-box error">{error}</p>}
    </main>
  );
}

export default LoginPage;
