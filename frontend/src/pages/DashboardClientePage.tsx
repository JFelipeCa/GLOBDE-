import { useState, type FormEvent } from 'react';
import StatCard from '../components/StatCard';
import { registrarCita } from '../store/dataSlice';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { ROL_BARBERO } from '../types';
import { claseEstado, formatearFecha, formatearMoneda } from '../utils/formatters';

function DashboardClientePage() {
  const dispatch = useAppDispatch();
  const { usuario } = useAppSelector((s) => s.auth);
  const { usuarios, clientes, servicios, citas } = useAppSelector((s) => s.data);

  const cliente      = clientes.find((c) => c.id_usuario === usuario?.id_usuario);
  const citasCliente = citas.filter((c) => c.id_cliente === cliente?.id_cliente);
  const barberos     = usuarios.filter((u) => u.id_rol === ROL_BARBERO);

  const pendientes  = citasCliente.filter((c) => c.estado === 'pendiente').length;
  const confirmadas = citasCliente.filter((c) => c.estado === 'confirmada').length;
  const completadas = citasCliente.filter((c) => c.estado === 'completada').length;
  const canceladas  = citasCliente.filter((c) => c.estado === 'cancelada').length;

  const [idServicio,    setIdServicio]    = useState('');
  const [idBarbero,     setIdBarbero]     = useState('');
  const [fecha,         setFecha]         = useState('');
  const [hora,          setHora]          = useState('');
  const [observaciones, setObservaciones] = useState('');
  const [mensaje,       setMensaje]       = useState('');

  const agendar = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!cliente) { setMensaje('No se encontró tu perfil de cliente.'); return; }
    const resultado = await dispatch(registrarCita({
      id_cliente: cliente.id_cliente, id_usuario: Number(idBarbero),
      id_servicio: Number(idServicio), fecha, hora,
      estado: 'pendiente', observaciones,
    }));
    if (registrarCita.fulfilled.match(resultado)) {
      setMensaje('✅ Cita solicitada correctamente.');
      setIdServicio(''); setIdBarbero(''); setFecha(''); setHora(''); setObservaciones('');
    } else {
      setMensaje(String(resultado.payload || 'No se pudo agendar la cita.'));
    }
  };

  return (
    <main className="container cliente-main">
      <section className="cliente-hero">
        <div className="hero-texto">
          <span className="hero-etiqueta">Vista cliente</span>
          <h1>Tu estilo empieza aquí, {usuario?.nombre} ✨</h1>
          <p>Consulta tus citas, solicita nuevos servicios y mantén tu perfil actualizado.</p>
        </div>
        <div className="hero-deco">✨</div>
      </section>

      <section className="stats-grid">
        <StatCard etiqueta="Puntaje acumulado"  valor={cliente?.puntaje || 0} icono="⭐" color="cyan" />
        <StatCard etiqueta="Citas pendientes"   valor={pendientes}            icono="⏳" color="default" />
        <StatCard etiqueta="Citas confirmadas"  valor={confirmadas}           icono="✅" color="cyan" />
        <StatCard etiqueta="Completadas"        valor={completadas}           icono="🏁" color="cyan" />
      </section>

      {canceladas > 0 && (
        <div style={{ background: '#fff0f0', border: '1px solid #fcc', borderRadius: '10px', padding: '12px 16px', fontSize: '13px', color: '#c0392b' }}>
          ⚠️ Tienes {canceladas} cita{canceladas > 1 ? 's' : ''} cancelada{canceladas > 1 ? 's' : ''}. Contáctanos si necesitas reagendar.
        </div>
      )}

      <div className="dashboard-grid">
        <section className="panel-card">
          <div className="panel-title">
            <div>
              <h2>📅 Agendar cita</h2>
              <p>Selecciona servicio, barbero, fecha y hora.</p>
            </div>
          </div>
          <form className="form-agendar" onSubmit={agendar}>
            <label className="form-group">
              ✂️ Servicio
              <select value={idServicio} onChange={(e) => setIdServicio(e.target.value)} required>
                <option value="">Selecciona un servicio</option>
                {servicios.map((s) => (
                  <option key={s.id_servicio} value={s.id_servicio}>
                    {s.nombre} — {formatearMoneda(s.precio)}
                  </option>
                ))}
              </select>
            </label>
            <label className="form-group">
              💈 Barbero
              <select value={idBarbero} onChange={(e) => setIdBarbero(e.target.value)} required>
                <option value="">Selecciona un barbero</option>
                {barberos.map((b) => (
                  <option key={b.id_usuario} value={b.id_usuario}>{b.nombre}</option>
                ))}
              </select>
            </label>
            <label className="form-group">
              📅 Fecha
              <input type="date" value={fecha} min={new Date().toISOString().split('T')[0]} onChange={(e) => setFecha(e.target.value)} required />
            </label>
            <label className="form-group">
              🕐 Hora
              <input type="time" value={hora} onChange={(e) => setHora(e.target.value)} required />
            </label>
            <label className="form-group full-width">
              💬 Observaciones
              <textarea value={observaciones} onChange={(e) => setObservaciones(e.target.value)} placeholder="Alguna preferencia o nota especial..." maxLength={300} />
            </label>
            <button type="submit">Solicitar cita</button>
          </form>
          {mensaje && <p className="message-box">{mensaje}</p>}
        </section>

        <section className="panel-card">
          <div className="panel-title">
            <div>
              <h2>Mis citas</h2>
              <p>Historial de tus reservas en Globde.</p>
            </div>
          </div>
          <ul className="lista-mis-citas">
            {citasCliente.length === 0 && (
              <li style={{ padding: '24px', color: '#aaa', textAlign: 'center' }}>
                Aún no tienes citas registradas. ¡Agenda tu primera!
              </li>
            )}
            {citasCliente.map((cita) => {
              const servicio = servicios.find((s) => s.id_servicio === cita.id_servicio);
              const barbero  = usuarios.find((u) => u.id_usuario === cita.id_usuario);
              return (
                <li className="cita-item" key={cita.id_cita}>
                  <div>
                    <span className="cita-servicio">✂️ {servicio?.nombre}</span>
                    <span className="cita-detalle">
                      💈 {barbero?.nombre} | 📅 {formatearFecha(cita.fecha)} | {cita.hora}
                    </span>
                    {cita.observaciones && (
                      <span className="cita-detalle">💬 {cita.observaciones}</span>
                    )}
                  </div>
                  <span className={claseEstado(cita.estado)}>{cita.estado}</span>
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