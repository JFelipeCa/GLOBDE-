import { useState, type FormEvent } from 'react';
import { guardarPerfilUsuario } from '../store/authSlice';
import { cargarDatos } from '../store/dataSlice';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { formatearFecha } from '../utils/formatters';

function PerfilPage() {
  const dispatch = useAppDispatch();
  const { usuario } = useAppSelector((state) => state.auth);
  const roles = useAppSelector((state) => state.data.roles);
  const rol = roles.find((r) => r.id_rol === usuario?.id_rol);

  const [nombre,    setNombre]    = useState(usuario?.nombre || '');
  const [correo,    setCorreo]    = useState(usuario?.correo || '');
  const [telefono,  setTelefono]  = useState(usuario?.telefono || '');
  const [contrasena,setContrasena]= useState('');
  const [mensaje,   setMensaje]   = useState('');

  if (!usuario) return null;

  const rolIcono: Record<number, string> = { 1: '👑', 2: '💈', 3: '👤' };

  const guardar = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const resultado = await dispatch(guardarPerfilUsuario({
      idUsuario: usuario.id_usuario,
      payload: { nombre, correo, telefono, contrasena: contrasena || undefined },
    }));
    if (guardarPerfilUsuario.fulfilled.match(resultado)) {
      dispatch(cargarDatos());
      setContrasena('');
      setMensaje('✅ Perfil actualizado correctamente.');
    } else {
      setMensaje(String(resultado.payload || 'No se pudo actualizar el perfil.'));
    }
  };

  return (
    <main className="container page-shell">
      <div className="page-heading">
        <span className="eyebrow">Cuenta</span>
        <h1>👤 Perfil</h1>
        <p>Gestiona tus datos de acceso y contacto.</p>
      </div>

      <section className="profile-hero">
        <article className="profile-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
            <div style={{
              width: '60px', height: '60px', borderRadius: '50%',
              background: '#f7f7f7', border: '2px solid #00d4c8',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '26px'
            }}>
              {rolIcono[usuario.id_rol] || '👤'}
            </div>
            <div>
              <h2 style={{ color: '#111', marginBottom: '4px' }}>{usuario.nombre}</h2>
              <p style={{ color: '#00d4c8', fontSize: '13px', fontWeight: 600 }}>{rol?.nombre || 'Usuario'}</p>
            </div>
          </div>
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
              <strong>Teléfono</strong>
              <span>{usuario.telefono}</span>
            </li>
            <li>
              <strong>Fecha de creación</strong>
              <span>{formatearFecha(usuario.fecha_creacion)}</span>
            </li>
            <li>
              <strong>Rol</strong>
              <span>{rol?.descripcion || '-'}</span>
            </li>
          </ul>
        </article>

        <article className="profile-card">
          <h2 style={{ marginBottom: '6px' }}>✏️ Actualizar datos</h2>
          <p style={{ marginBottom: '20px', color: '#aaa', fontSize: '13px' }}>Los cambios se guardan en la base de datos.</p>
          <form className="profile-grid" onSubmit={guardar}>
            <label className="form-group full-width">
              Nombre completo
              <input value={nombre} onChange={(e) => setNombre(e.target.value)} required />
            </label>
            <label className="form-group full-width">
              Correo electrónico
              <input type="email" value={correo} onChange={(e) => setCorreo(e.target.value)} required />
            </label>
            <label className="form-group full-width">
              Teléfono
              <input value={telefono} onChange={(e) => setTelefono(e.target.value)} required />
            </label>
            <label className="form-group full-width">
              Nueva contraseña <span style={{ color: '#aaa', textTransform: 'none', fontSize: '11px' }}>(dejar vacío para no cambiar)</span>
              <input type="password" value={contrasena} onChange={(e) => setContrasena(e.target.value)} placeholder="••••••••" />
            </label>
            <button type="submit">Guardar cambios</button>
          </form>
          {mensaje && <p className="message-box">{mensaje}</p>}
        </article>
      </section>
    </main>
  );
}

export default PerfilPage;