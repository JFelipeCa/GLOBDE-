import { NavLink, useNavigate } from 'react-router-dom';
import { cerrarSesion } from '../Store/authSlice';
import { useAppDispatch, useAppSelector } from '../Store/hooks';
import { ROL_ADMINISTRADOR, ROL_CLIENTE } from '../types';

function Navbar() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { usuario } = useAppSelector((state) => state.auth);
  const roles = useAppSelector((state) => state.data.roles);
  const rol = roles.find((item) => item.id_rol === usuario?.id_rol);

  if (!usuario) return null;

  const enlaces =
    usuario.id_rol === ROL_CLIENTE
      ? [
          { to: '/cliente',  texto: 'Inicio' },
          { to: '/citas',    texto: 'Mis citas' },
          { to: '/catalogo', texto: 'Catálogo' },
          { to: '/perfil',   texto: 'Perfil' },
        ]
      : [
          { to: usuario.id_rol === ROL_ADMINISTRADOR ? '/admin' : '/barbero', texto: 'Inicio' },
          { to: '/clientes', texto: 'Clientes' },
          { to: '/citas',    texto: 'Citas' },
          { to: '/catalogo', texto: 'Catálogo' },
          ...(usuario.id_rol === ROL_ADMINISTRADOR ? [{ to: '/facturas', texto: 'Facturas' }] : []),
          { to: '/perfil',   texto: 'Perfil' },
        ];

  const salir = () => {
    dispatch(cerrarSesion());
    navigate('/');
  };

  return (
    <nav className="topbar">
      {/* Logo — clic lleva a la landing */}
      <div
        style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}
        onClick={() => navigate('/')}
        title="Ver página de inicio"
      >
        <div style={{
          width: '34px', height: '34px', borderRadius: '50%',
          border: '2.5px solid #00d4c8', display: 'flex',
          alignItems: 'center', justifyContent: 'center',
          fontSize: '14px', fontWeight: 700, color: '#00d4c8', flexShrink: 0,
        }}>G</div>
        <h2 style={{ fontFamily: "'Playfair Display', serif", letterSpacing: '0.06em' }}>GLOBDE</h2>
      </div>

      <ul>
        {/* Enlace explícito a la landing */}
        <li>
          <NavLink to="/" end style={({ isActive }) => ({ color: isActive ? '#00d4c8' : undefined })}>
            🏠 Barbería
          </NavLink>
        </li>

        {enlaces.map((enlace) => (
          <li key={enlace.to}>
            <NavLink to={enlace.to}>{enlace.texto}</NavLink>
          </li>
        ))}

        <li className="nav-user">
          {usuario.nombre}
          <span>{rol?.nombre || 'Usuario'}</span>
        </li>
        <li>
          <button type="button" onClick={salir}>
            Cerrar sesión
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;