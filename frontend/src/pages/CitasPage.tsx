import { useMemo, useState, type FormEvent } from 'react';
import { editarCita, registrarCita } from '../store/dataSlice';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { ROL_BARBERO, ROL_CLIENTE, type Cita, type CitaPayload } from '../types';
import { claseEstado, formatearFecha, formatearMoneda } from '../utils/formatters';

const estadoInicial: CitaPayload = {
  id_cliente: 0, id_usuario: 0, id_servicio: 0,
  fecha: '', hora: '', estado: 'pendiente', observaciones: '',
};

const ESTADOS_ADMIN = ['todos', 'pendiente', 'confirmada', 'completada', 'cancelada', 'no asistió'] as const;

function CitasPage() {
  const dispatch = useAppDispatch();
  const { usuario } = useAppSelector((s) => s.auth);
  const { usuarios, clientes, servicios, citas } = useAppSelector((s) => s.data);

  const [formulario,   setFormulario]   = useState<CitaPayload>(estadoInicial);
  const [idEditando,   setIdEditando]   = useState<number | null>(null);
  const [mensaje,      setMensaje]      = useState('');
  const [filtroEstado, setFiltroEstado] = useState('todos');
  const [mostrarForm,  setMostrarForm]  = useState(false);

  const clienteActual = clientes.find((c) => c.id_usuario === usuario?.id_usuario);
  const esCliente     = usuario?.id_rol === ROL_CLIENTE;
  const barberos      = usuarios.filter((u) => u.id_rol === ROL_BARBERO);

  const citasVisibles = useMemo(() => {
    let lista = citas;
    if (esCliente)                              lista = lista.filter((c) => c.id_cliente === clienteActual?.id_cliente);
    else if (usuario?.id_rol === ROL_BARBERO)   lista = lista.filter((c) => c.id_usuario === usuario.id_usuario);
    if (!esCliente && filtroEstado !== 'todos') lista = lista.filter((c) => c.estado === filtroEstado);
    return [...lista].sort((a, b) => `${b.fecha}T${b.hora}`.localeCompare(`${a.fecha}T${a.hora}`));
  }, [citas, clienteActual, esCliente, usuario, filtroEstado]);

  const cambiarCampo = (campo: keyof CitaPayload, valor: string) => {
    setFormulario((prev) => ({
      ...prev,
      [campo]: ['id_cliente','id_usuario','id_servicio'].includes(campo) ? Number(valor) : valor,
    }));
  };

  const guardar = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const payload = esCliente && clienteActual
      ? { ...formulario, id_cliente: clienteActual.id_cliente }
      : formulario;
    const resultado = idEditando
      ? await dispatch(editarCita({ idCita: idEditando, payload }))
      : await dispatch(registrarCita(payload));

    if (registrarCita.fulfilled.match(resultado) || editarCita.fulfilled.match(resultado)) {
      setFormulario(estadoInicial);
      setIdEditando(null);
      setMostrarForm(false);
      setMensaje(idEditando ? '✅ Cita actualizada.' : '✅ Cita registrada correctamente.');
    } else {
      setMensaje(String(resultado.payload || 'No se pudo guardar la cita.'));
    }
  };

  const cargarEdicion = (cita: Cita) => {
    setIdEditando(cita.id_cita);
    setFormulario({
      id_cliente: cita.id_cliente, id_usuario: cita.id_usuario,
      id_servicio: cita.id_servicio, fecha: cita.fecha,
      hora: cita.hora, estado: cita.estado, observaciones: cita.observaciones,
    });
    setMostrarForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const conteoAdmin = (estado: string) =>
    estado === 'todos' ? citas.length : citas.filter((c) => c.estado === estado).length;

  return (
    <main className="container page-shell">

      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
        <div className="page-heading">
          <span className="eyebrow">Agenda</span>
          <h1>📅 {esCliente ? 'Mis citas' : 'Gestión de citas'}</h1>
          <p>{esCliente ? 'Consulta y gestiona tus reservas.' : 'Administra todas las citas del sistema.'}</p>
        </div>
        <button type="button" style={{ marginTop: '8px' }}
          onClick={() => { setMostrarForm(!mostrarForm); setIdEditando(null); setFormulario(estadoInicial); }}>
          {mostrarForm ? '✕ Cerrar' : '+ Nueva cita'}
        </button>
      </div>

      {mostrarForm && (
        <section className="panel-card">
          <div className="panel-title">
            <div>
              <h2>{idEditando ? '✏️ Editar cita' : '📅 Nueva cita'}</h2>
              <p>Selecciona servicio, barbero, fecha y hora.</p>
            </div>
          </div>
          <form className="citas-form" onSubmit={guardar}>
            {!esCliente && (
              <label className="form-group">
                👤 Cliente
                <select value={formulario.id_cliente || ''} onChange={(e) => cambiarCampo('id_cliente', e.target.value)} required>
                  <option value="">Selecciona un cliente</option>
                  {clientes.map((c) => <option key={c.id_cliente} value={c.id_cliente}>{c.nombre}</option>)}
                </select>
              </label>
            )}
            <label className="form-group">
              💈 Barbero
              <select value={formulario.id_usuario || ''} onChange={(e) => cambiarCampo('id_usuario', e.target.value)} required>
                <option value="">Selecciona un barbero</option>
                {barberos.map((b) => <option key={b.id_usuario} value={b.id_usuario}>{b.nombre}</option>)}
              </select>
            </label>
            <label className="form-group">
              ✂️ Servicio
              <select value={formulario.id_servicio || ''} onChange={(e) => cambiarCampo('id_servicio', e.target.value)} required>
                <option value="">Selecciona un servicio</option>
                {servicios.map((s) => <option key={s.id_servicio} value={s.id_servicio}>{s.nombre} — {formatearMoneda(s.precio)}</option>)}
              </select>
            </label>
            <label className="form-group">
              📅 Fecha
              <input type="date" value={formulario.fecha} min={new Date().toISOString().split('T')[0]} onChange={(e) => cambiarCampo('fecha', e.target.value)} required />
            </label>
            <label className="form-group">
              🕐 Hora
              <input type="time" value={formulario.hora} onChange={(e) => cambiarCampo('hora', e.target.value)} required />
            </label>
            {!esCliente && (
              <label className="form-group">
                🔖 Estado
                <select value={formulario.estado} onChange={(e) => cambiarCampo('estado', e.target.value)}>
                  <option value="pendiente">Pendiente</option>
                  <option value="confirmada">Confirmada</option>
                  <option value="cancelada">Cancelada</option>
                  <option value="completada">Completada</option>
                  <option value="no asistio">No asistió</option>
                </select>
              </label>
            )}
            <label className="form-group citas-form-full">
              💬 Observaciones
              <textarea value={formulario.observaciones} onChange={(e) => cambiarCampo('observaciones', e.target.value)} placeholder="Alguna preferencia o nota especial..." maxLength={300} />
            </label>
            <div className="citas-form-actions">
              <button type="submit">{idEditando ? 'Guardar cambios' : 'Registrar cita'}</button>
              {idEditando && (
                <button type="button" className="btn-secundario" onClick={() => { setIdEditando(null); setMostrarForm(false); }}>Cancelar</button>
              )}
            </div>
          </form>
          {mensaje && <p className="message-box">{mensaje}</p>}
        </section>
      )}

      {!mostrarForm && mensaje && <p className="message-box">{mensaje}</p>}

      {!esCliente && (
        <div className="citas-filtros">
          {ESTADOS_ADMIN.map((estado) => (
            <button key={estado} type="button"
              onClick={() => setFiltroEstado(estado)}
              className={filtroEstado === estado ? 'filtro-btn filtro-btn-active' : 'filtro-btn'}>
              {estado === 'todos' ? 'Todas' : estado} ({conteoAdmin(estado)})
            </button>
          ))}
        </div>
      )}

      <ul id="listaCitas">
        {citasVisibles.length === 0 && (
          <li style={{ padding: '32px', textAlign: 'center', color: '#aaa' }}>
            {esCliente ? 'Aún no tienes citas registradas. ¡Agenda la primera desde tu panel!' : `No hay citas ${filtroEstado !== 'todos' ? `con estado "${filtroEstado}"` : 'registradas'}.`}
          </li>
        )}
        {citasVisibles.map((cita) => {
          const cliente  = clientes.find((c) => c.id_cliente === cita.id_cliente);
          const barbero  = usuarios.find((u) => u.id_usuario === cita.id_usuario);
          const servicio = servicios.find((s) => s.id_servicio === cita.id_servicio);
          return (
            <li key={cita.id_cita}>
              <div className="item-head">
                <span className="item-title">✂️ {servicio?.nombre || 'Sin servicio'}</span>
                <span className={claseEstado(cita.estado)}>{cita.estado}</span>
              </div>
              <div className="item-meta">
                {!esCliente && <span>👤 {cliente?.nombre || 'Sin cliente'}</span>}
                <span>💈 {barbero?.nombre || 'Sin barbero'}</span>
                <span>📅 {formatearFecha(cita.fecha)} | {cita.hora}</span>
                <span>💰 {formatearMoneda(servicio?.precio || 0)}</span>
              </div>
              {cita.observaciones && (
                <div className="item-subtitle" style={{ marginTop: '6px', fontSize: '13px', color: '#777' }}>
                  💬 {cita.observaciones}
                </div>
              )}
              {!esCliente && (
                <div className="item-actions" style={{ marginTop: '10px' }}>
                  <button type="button" className="btn-secundario" onClick={() => cargarEdicion(cita)}>✏️ Editar</button>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </main>
  );
}

export default CitasPage;