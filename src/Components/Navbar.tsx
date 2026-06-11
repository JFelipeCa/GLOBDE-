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

  if (!usuario) {
    return null;
  }

  const enlaces =
    usuario.id_rol === ROL_CLIENTE
      ? [
          { to: '/cliente', texto: 'Inicio' },
          { to: '/citas', texto: 'Mis citas' },
          { to: '/catalogo', texto: 'Catalogo' },
          { to: '/perfil', texto: 'Perfil' },
        ]
      : [
          { to: usuario.id_rol === ROL_ADMINISTRADOR ? '/admin' : '/barbero', texto: 'Inicio' },
          { to: '/clientes', texto: 'Clientes' },
          { to: '/citas', texto: 'Citas' },
          { to: '/catalogo', texto: 'Catalogo' },
          ...(usuario.id_rol === ROL_ADMINISTRADOR ? [{ to: '/facturas', texto: 'Facturas' }] : []),
          { to: '/perfil', texto: 'Perfil' },
        ];

  const salir = () => {
    dispatch(cerrarSesion());
    navigate('/login');
  };

  return (
    <nav className="topbar">
      <h2>GLOBDE</h2>
      <ul>
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
            Cerrar sesion
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
