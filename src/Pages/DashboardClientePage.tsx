import { useState, type FormEvent } from 'react';
import StatCard from '../Components/StatCard';
import { registrarCita } from '../Store/dataSlice';
import { useAppDispatch, useAppSelector } from '../Store/hooks';
import { ROL_BARBERO } from '../types';
import { claseEstado, formatearFecha, formatearMoneda } from '../utils/formatters';

function DashboardClientePage() {
  const dispatch = useAppDispatch();
  const { usuario } = useAppSelector((state) => state.auth);
  const { usuarios, clientes, servicios, citas } = useAppSelector((state) => state.data);
  const cliente = clientes.find((item) => item.id_usuario === usuario?.id_usuario);
  const citasCliente = citas.filter((cita) => cita.id_cliente === cliente?.id_cliente);
  const barberos = usuarios.filter((item) => item.id_rol === ROL_BARBERO);
  const [idServicio, setIdServicio] = useState('');
  const [idBarbero, setIdBarbero] = useState('');
  const [fecha, setFecha] = useState('');
  const [hora, setHora] = useState('');
  const [observaciones, setObservaciones] = useState('');
  const [mensaje, setMensaje] = useState('');

  const agendar = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!cliente) {
      setMensaje('No se encontro el perfil de cliente.');
      return;
    }

    const resultado = await dispatch(
      registrarCita({
        id_cliente: cliente.id_cliente,
        id_usuario: Number(idBarbero),
        id_servicio: Number(idServicio),
        fecha,
        hora,
        estado: 'pendiente',
        observaciones,
      }),
    );

    if (registrarCita.fulfilled.match(resultado)) {
      setMensaje('Solicitud enviada correctamente.');
      setIdServicio('');
      setIdBarbero('');
      setFecha('');
      setHora('');
      setObservaciones('');
    } else {
      setMensaje(String(resultado.payload || 'No se pudo agendar la cita.'));
    }
  };

  return (
    <main className="container cliente-main">
      <section className="cliente-hero">
        <div className="hero-texto">
          <span className="hero-etiqueta">Vista cliente</span>
          <h1>Tu estilo empieza aqui, {usuario?.nombre}</h1>
          <p className="hero-sub">Consulta tus citas, solicita nuevos servicios y manten tu perfil actualizado.</p>
        </div>
        <div className="hero-deco">*</div>
      </section>

      <section className="stats-grid seccion">
        <StatCard etiqueta="Puntaje acumulado" valor={cliente?.puntaje || 0} />
        <StatCard etiqueta="Citas activas" valor={citasCliente.filter((cita) => cita.estado !== 'cancelada').length} />
        <StatCard etiqueta="Servicios disponibles" valor={servicios.length} />
      </section>

      <div className="dashboard-grid">
        <section className="stack">
          <article className="panel-card">
            <div className="panel-title">
              <div>
                <h2>Agendar cita</h2>
                <p>Selecciona servicio, barbero, fecha y hora.</p>
              </div>
            </div>

            <form className="form-agendar" onSubmit={agendar}>
              <label className="form-group">
                Servicio
                <select value={idServicio} onChange={(event) => setIdServicio(event.target.value)} required>
                  <option value="">Selecciona un servicio</option>
                  {servicios.map((servicio) => (
                    <option key={servicio.id_servicio} value={servicio.id_servicio}>
                      {servicio.nombre} - {formatearMoneda(servicio.precio)}
                    </option>
                  ))}
                </select>
              </label>

              <label className="form-group">
                Barbero
                <select value={idBarbero} onChange={(event) => setIdBarbero(event.target.value)} required>
                  <option value="">Selecciona un barbero</option>
                  {barberos.map((barbero) => (
                    <option key={barbero.id_usuario} value={barbero.id_usuario}>
                      {barbero.nombre}
                    </option>
                  ))}
                </select>
              </label>

              <label className="form-group">
                Fecha
                <input type="date" value={fecha} onChange={(event) => setFecha(event.target.value)} required />
              </label>

              <label className="form-group">
                Hora
                <input type="time" value={hora} onChange={(event) => setHora(event.target.value)} required />
              </label>

              <label className="form-group full-width">
                Observaciones
                <textarea value={observaciones} onChange={(event) => setObservaciones(event.target.value)} />
              </label>

              <button type="submit">Solicitar cita</button>
            </form>
            {mensaje && <p className="message-box">{mensaje}</p>}
          </article>
        </section>

        <section className="panel-card">
          <div className="panel-title">
            <div>
              <h2>Proximas citas</h2>
              <p>Resumen rapido de tus reservas.</p>
            </div>
          </div>
          <ul className="lista-mis-citas">
            {citasCliente.map((cita) => {
              const servicio = servicios.find((item) => item.id_servicio === cita.id_servicio);
              const barbero = usuarios.find((item) => item.id_usuario === cita.id_usuario);
              return (
                <li className="cita-item" key={cita.id_cita}>
                  <div>
                    <span className="cita-servicio">{servicio?.nombre}</span>
                    <span className="cita-detalle">
                      Con {barbero?.nombre} | {formatearFecha(cita.fecha)} | {cita.hora}
                    </span>
                  </div>
                  <div className="cita-acciones">
                    <span className={claseEstado(cita.estado)}>{cita.estado}</span>
                  </div>
                </li>
              );
            })}
          </ul>
        </section>
      </div>
    </main>
  );
}

export default DashboardClientePage;
