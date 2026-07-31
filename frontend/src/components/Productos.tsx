import { useState } from 'react';
import CardAccion from './CardAccion';

function Productos() {
  const [productosDisponibles, setProductosDisponibles] = useState(12);

  const manejarAccionProductos = (modulo: string) => {
    setProductosDisponibles((total) => Math.max(total - 1, 0));
    alert(`Acción realizada en el módulo ${modulo}: revisar inventario de productos`);
    console.log(`Acción realizada en el módulo ${modulo}: revisar inventario de productos`);
  };

  return (
    <div className="card">
      <h2>Productos</h2>

      <p>Inventario de productos disponibles.</p>
      <p>Productos disponibles: {productosDisponibles}</p>

      <CardAccion
        titulo="Productos"
        descripcion="Estado: inventario disponible para revisión."
        nombreAccion="Revisar Productos"
        onEjecutar={manejarAccionProductos}
      />
    </div>
  );
}

export default Productos;
