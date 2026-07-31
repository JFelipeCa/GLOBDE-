import { useState } from 'react';

type Pagina = 'login' | 'registro' | 'usuarios' | 'productos' | 'citas' | 'disponibilidad';

interface SidebarProps {
  paginaActual: Pagina;
  onCambiarPagina: (pagina: Pagina) => void;
}

function Sidebar({ paginaActual, onCambiarPagina }: SidebarProps) {
  const [ultimaOpcion, setUltimaOpcion] = useState('Inicio');

  const manejarCambioPagina = (pagina: Pagina, nombre: string) => {
    setUltimaOpcion(nombre);
    onCambiarPagina(pagina);
  };

  return (
    <aside className="sidebar">
      <h3>Menú</h3>
      <p className="sidebar-status">Ultima opción: {ultimaOpcion}</p>

      <ul className="sidebar-list">
        <li>
          <button
            className={paginaActual === 'login' ? 'sidebar-link active' : 'sidebar-link'}
            type="button"
            onClick={() => manejarCambioPagina('login', 'Inicio')}
          >
            Inicio
          </button>
        </li>
        <li>
          <button
            className={paginaActual === 'registro' ? 'sidebar-link active' : 'sidebar-link'}
            type="button"
            onClick={() => manejarCambioPagina('registro', 'Registro')}
          >
            Registro
          </button>
        </li>
        <li>
          <button
            className={paginaActual === 'usuarios' ? 'sidebar-link active' : 'sidebar-link'}
            type="button"
            onClick={() => manejarCambioPagina('usuarios', 'Usuarios')}
          >
            Usuarios
          </button>
        </li>
        <li>
          <button
            className={paginaActual === 'productos' ? 'sidebar-link active' : 'sidebar-link'}
            type="button"
            onClick={() => manejarCambioPagina('productos', 'Productos')}
          >
            Productos
          </button>
        </li>
        <li>
          <button
            className={paginaActual === 'citas' ? 'sidebar-link active' : 'sidebar-link'}
            type="button"
            onClick={() => manejarCambioPagina('citas', 'Citas')}
          >
            Citas
          </button>
        </li>
        <li>
          <button
            className={paginaActual === 'disponibilidad' ? 'sidebar-link active' : 'sidebar-link'}
            type="button"
            onClick={() => manejarCambioPagina('disponibilidad', 'Disponibilidad')}
          >
            Disponibilidad
          </button>
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;
