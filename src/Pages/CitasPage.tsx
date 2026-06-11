import { useMemo, useState, type FormEvent } from 'react';
import { editarCita, registrarCita } from '../Store/dataSlice';
import { useAppDispatch, useAppSelector } from '../Store/hooks';
import { ROL_BARBERO, ROL_CLIENTE, type Cita, type CitaPayload } from '../types';
import { claseEstado, formatearFecha, formatearMoneda } from '../utils/formatters';

const estadoInicial: CitaPayload = {
  id_cliente: 0,
  id_usuario: 0,
  id_servicio: 0,
  fecha: '',
  hora: '',
  estado: 'pendiente',
  observaciones: '',
};

function CitasPage() {
  const dispatch = useAppDispatch();
  const { usuario } = useAppSelector((state) => state.auth);
  const { usuarios, clientes, servicios, citas } = useAppSelector((state) => state.data);
  const [formulario, setFormulario] = useState<CitaPayload>(estadoInicial);
  const [idEditando, setIdEditando] = useState<number | null>(null);
  const [mensaje, setMensaje] = useState('');

  const clienteActual = clientes.find((cliente) => cliente.id_usuario === usuario?.id_usuario);
  const esCliente = usuario?.id_rol === ROL_CLIENTE;
  const barberos = usuarios.filter((item) => item.id_rol === ROL_BARBERO);

  const citasVisibles = useMemo(() => {
    if (esCliente) {
      return citas.filter((cita) => cita.id_cliente === clienteActual?.id_cliente);
    }
    if (usuario?.id_rol === ROL_BARBERO) {
      return citas.filter((cita) => cita.id_usuario === usuario.id_usuario);
    }
    return citas;
  }, [citas, clienteActual?.id_cliente, esCliente, usuario]);

  const cambiarCampo = (campo: keyof CitaPayload, valor: string) => {
    setFormulario((actual) => ({
      ...actual,
      [campo]: ['id_cliente', 'id_usuario', 'id_servicio'].includes(campo) ? Number(valor) : valor,
    }));
  };

  const guardar = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const payload = esCliente && clienteActual ? { ...formulario, id_cliente: clienteActual.id_cliente } : formulario;
    const resultado = idEditando
      ? await dispatch(editarCita({ idCita: idEditando, payload }))
      : await dispatch(registrarCita(payload));

    if (registrarCita.fulfilled.match(resultado) || editarCita.fulfilled.match(resultado)) {
      setFormulario(estadoInicial);
      setIdEditando(null);
      setMensaje(idEditando ? 'Cita actualizada correctamente.' : 'Cita registrada correctamente.');
    } else {
      setMensaje(String(resultado.payload || 'No se pudo guardar la cita.'));
    }
  };

  const cargarEdicion = (cita: Cita) => {
    setIdEditando(cita.id_cita);
    setFormulario({
      id_cliente: cita.id_cliente,
      id_usuario: cita.id_usuario,
      id_servicio: cita.id_servicio,
      fecha: cita.fecha,
      hora: cita.hora,
      estado: cita.estado,
      observaciones: cita.observaciones,
    });
  };

  return (
    <main className="container page-shell">
      <div className="page-heading">
        <h1>{esCliente ? 'Mis citas' : 'Gestion de citas'}</h1>
        <p>Agenda conectada a la API local segun rol de acceso.</p>
      </div>

      <section className="panel-card">
        <div className="panel-title">
          <div>
            <h2>{idEditando ? 'Editar cita' : 'Nueva cita'}</h2>
            <p>Selecciona cliente, barbero, servicio y horario.</p>
          </div>
        </div>

        <form className="form-agendar" onSubmit={guardar}>
          {!esCliente && (
            <label className="form-group">
              Cliente
              <select value={formulario.id_cliente || ''} onChange={(event) => cambiarCampo('id_cliente', event.target.value)} required>
                <option value="">Selecciona un cliente</option>
                {clientes.map((cliente) => (
                  <option key={cliente.id_cliente} value={cliente.id_cliente}>
                    {cliente.nombre}
                  </option>
                ))}
              </select>
            </label>
          )}

          <label className="form-group">
            Barbero
            <select value={formulario.id_usuario || ''} onChange={(event) => cambiarCampo('id_usuario', event.target.value)} required>
              <option value="">Selecciona un barbero</option>
              {barberos.map((barbero) => (
                <option key={barbero.id_usuario} value={barbero.id_usuario}>
                  {barbero.nombre}
                </option>
              ))}
            </select>
          </label>

          <label className="form-group">
            Servicio
            <select value={formulario.id_servicio || ''} onChange={(event) => cambiarCampo('id_servicio', event.target.value)} required>
              <option value="">Selecciona un servicio</option>
              {servicios.map((servicio) => (
                <option key={servicio.id_servicio} value={servicio.id_servicio}>
                  {servicio.nombre}
                </option>
              ))}
            </select>
          </label>

          <label className="form-group">
            Fecha
            <input type="date" value={formulario.fecha} onChange={(event) => cambiarCampo('fecha', event.target.value)} required />
          </label>

          <label className="form-group">
            Hora
            <input type="time" value={formulario.hora} onChange={(event) => cambiarCampo('hora', event.target.value)} required />
          </label>

          {!esCliente && (
            <label className="form-group">
              Estado
              <select value={formulario.estado} onChange={(event) => cambiarCampo('estado', event.target.value)}>
                <option value="pendiente">Pendiente</option>
                <option value="confirmada">Confirmada</option>
                <option value="cancelada">Cancelada</option>
                <option value="completada">Completada</option>
                <option value="no asistio">No asistio</option>
              </select>
            </label>
          )}

          <label className="form-group full-width">
            Observaciones
            <textarea value={formulario.observaciones} onChange={(event) => cambiarCampo('observaciones', event.target.value)} />
          </label>

          <button type="submit">{idEditando ? 'Guardar cambios' : 'Registrar cita'}</button>
          {idEditando && (
            <button type="button" className="btn-secundario" onClick={() => setIdEditando(null)}>
              Cancelar edicion
            </button>
          )}
        </form>
        {mensaje && <p className="message-box">{mensaje}</p>}
      </section>

      <ul id="listaCitas">
        {citasVisibles.map((cita) => {
          const cliente = clientes.find((item) => item.id_cliente === cita.id_cliente);
          const barbero = usuarios.find((item) => item.id_usuario === cita.id_usuario);
          const servicio = servicios.find((item) => item.id_servicio === cita.id_servicio);
          return (
            <li key={cita.id_cita}>
              <div className="item-head">
                <span className="item-title">{servicio?.nombre || 'Sin servicio'}</span>
                <span className={claseEstado(cita.estado)}>{cita.estado}</span>
              </div>
              <div className="item-meta">
                <span>Cliente: {cliente?.nombre || 'Sin cliente'}</span>
                <span>Barbero: {barbero?.nombre || 'Sin barbero'}</span>
                <span>{formatearFecha(cita.fecha)} | {cita.hora}</span>
                <span>{formatearMoneda(servicio?.precio || 0)}</span>
              </div>
              {cita.observaciones && <div className="item-subtitle">{cita.observaciones}</div>}
              {!esCliente && (
                <div className="item-actions">
                  <button type="button" className="btn-secundario" onClick={() => cargarEdicion(cita)}>
                    Editar
                  </button>
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
