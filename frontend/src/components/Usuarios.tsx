import { useState } from 'react';
import CardAccion from './CardAccion';

function Usuarios() {
  const [usuariosActivos, setUsuariosActivos] = useState(4);

  const manejarAccionUsuarios = (modulo: string) => {
    setUsuariosActivos((total) => total + 1);
    alert(`Acción realizada en el módulo ${modulo}: consultar usuarios activos`);
    console.log(`Acción realizada en el módulo ${modulo}: consultar usuarios activos`);
  };

  return (
    <div className="card">
      <h2>Usuarios</h2>

      <p>Listado de usuarios registrados en el sistema.</p>
      <p>Usuarios activos consultados: {usuariosActivos}</p>

      <CardAccion
        titulo="Usuarios"
        descripcion="Estado: módulo disponible para consultar usuarios registrados."
        nombreAccion="Consultar Usuarios"
        onEjecutar={manejarAccionUsuarios}
      />
    </div>
  );
}

export default Usuarios;
