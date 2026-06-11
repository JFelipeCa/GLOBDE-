import { useState, type FormEvent } from 'react';
import { guardarPerfilUsuario } from '../Store/authSlice';
import { cargarDatos } from '../Store/dataSlice';
import { useAppDispatch, useAppSelector } from '../Store/hooks';
import { formatearFecha } from '../utils/formatters';

function PerfilPage() {
  const dispatch = useAppDispatch();
  const { usuario } = useAppSelector((state) => state.auth);
  const roles = useAppSelector((state) => state.data.roles);
  const rol = roles.find((item) => item.id_rol === usuario?.id_rol);
  const [nombre, setNombre] = useState(usuario?.nombre || '');
  const [correo, setCorreo] = useState(usuario?.correo || '');
  const [telefono, setTelefono] = useState(usuario?.telefono || '');
  const [contrasena, setContrasena] = useState('');
  const [mensaje, setMensaje] = useState('');

  if (!usuario) {
    return null;
  }

  const guardar = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const resultado = await dispatch(
      guardarPerfilUsuario({
        idUsuario: usuario.id_usuario,
        payload: {
          nombre,
          correo,
          telefono,
          contrasena: contrasena || undefined,
        },
      }),
    );

    if (guardarPerfilUsuario.fulfilled.match(resultado)) {
      dispatch(cargarDatos());
      setContrasena('');
      setMensaje('Perfil actualizado correctamente.');
    } else {
      setMensaje(String(resultado.payload || 'No se pudo actualizar el perfil.'));
    }
  };

  return (
    <main className="container page-shell">
      <div className="page-heading">
        <h1>Perfil</h1>
        <p>Gestiona tus datos de acceso y contacto.</p>
      </div>

      <section className="profile-hero">
        <article className="profile-card">
          <h2>{usuario.nombre}</h2>
          <p>{rol?.nombre || 'Usuario'}</p>
          <ul className="profile-list">
            <li>
              <strong>ID usuario</strong>
              <span>{usuario.id_usuario}</span>
            </li>
            <li>
              <strong>Correo</strong>
              <span>{usuario.correo}</span>
            </li>
            <li>
              <strong>Fecha creacion</strong>
              <span>{formatearFecha(usuario.fecha_creacion)}</span>
            </li>
          </ul>
        </article>

        <article className="profile-card">
          <h2>Actualizar datos</h2>
          <form className="profile-grid" onSubmit={guardar}>
            <label className="form-group full-width">
              Nombre
              <input value={nombre} onChange={(event) => setNombre(event.target.value)} required />
            </label>
            <label className="form-group full-width">
              Correo
              <input type="email" value={correo} onChange={(event) => setCorreo(event.target.value)} required />
            </label>
            <label className="form-group full-width">
              Telefono
              <input value={telefono} onChange={(event) => setTelefono(event.target.value)} required />
            </label>
            <label className="form-group full-width">
              Nueva contrasena
              <input type="password" value={contrasena} onChange={(event) => setContrasena(event.target.value)} />
            </label>
            <button type="submit">Guardar perfil</button>
          </form>
          {mensaje && <p className="message-box">{mensaje}</p>}
        </article>
      </section>
    </main>
  );
}

export default PerfilPage;
