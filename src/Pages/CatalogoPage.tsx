import { useState, type FormEvent } from 'react';
import { registrarServicio } from '../Store/dataSlice';
import { useAppDispatch, useAppSelector } from '../Store/hooks';
import { ROL_CLIENTE } from '../types';
import { formatearMoneda } from '../utils/formatters';

function CatalogoPage() {
  const dispatch = useAppDispatch();
  const { usuario } = useAppSelector((state) => state.auth);
  const servicios = useAppSelector((state) => state.data.servicios);
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [precio, setPrecio] = useState('');
  const [duracion, setDuracion] = useState('');
  const [mensaje, setMensaje] = useState('');
  const puedeCrear = usuario?.id_rol !== ROL_CLIENTE;

  const guardar = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const resultado = await dispatch(
      registrarServicio({
        nombre,
        descripcion,
        precio: Number(precio),
        duracion_minutos: Number(duracion),
      }),
    );

    if (registrarServicio.fulfilled.match(resultado)) {
      setNombre('');
      setDescripcion('');
      setPrecio('');
      setDuracion('');
      setMensaje('Servicio agregado correctamente.');
    } else {
      setMensaje(String(resultado.payload || 'No se pudo agregar el servicio.'));
    }
  };

  return (
    <main className="container page-shell">
      <div className="page-heading">
        <h1>Catalogo de servicios</h1>
        <p>Servicios disponibles para agendamiento y facturacion.</p>
      </div>

      {puedeCrear && (
        <section className="panel-card">
          <form className="form-grid" onSubmit={guardar}>
            <input value={nombre} onChange={(event) => setNombre(event.target.value)} placeholder="Nombre del servicio" required />
            <input type="number" value={precio} onChange={(event) => setPrecio(event.target.value)} placeholder="Precio" required />
            <input type="number" value={duracion} onChange={(event) => setDuracion(event.target.value)} placeholder="Duracion en minutos" required />
            <textarea value={descripcion} onChange={(event) => setDescripcion(event.target.value)} placeholder="Descripcion" required />
            <button type="submit">Agregar servicio</button>
          </form>
          {mensaje && <p className="message-box">{mensaje}</p>}
        </section>
      )}

      <div className="catalogo-grid">
        {servicios.map((servicio) => (
          <article className="servicio-card" key={servicio.id_servicio}>
            <div className="servicio-icono">*</div>
            <h3>{servicio.nombre}</h3>
            <p>{servicio.descripcion}</p>
            <div className="servicio-footer">
              <span className="servicio-precio">{formatearMoneda(servicio.precio)}</span>
              <span className="servicio-duracion">{servicio.duracion_minutos} min</span>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}

export default CatalogoPage;
