import { useState, type FormEvent } from 'react';
import { registrarServicio } from '../store/dataSlice';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { ROL_CLIENTE } from '../types';
import { formatearMoneda } from '../utils/formatters';

const iconosServicio: Record<string, string> = {
  'Corte clásico':    '✂️',
  'Corte degradado':  '💈',
  'Arreglo de barba': '🪒',
  'Corte + barba':    '⭐',
  'Corte infantil':   '👦',
  'Tinte de cabello': '🎨',
};

const coloresServicio: Record<string, string> = {
  'Corte clásico':    '#00d4c8',
  'Corte degradado':  '#6da8ff',
  'Arreglo de barba': '#c9a84c',
  'Corte + barba':    '#52b788',
  'Corte infantil':   '#f78c6c',
  'Tinte de cabello': '#c792ea',
};

function CatalogoPage() {
  const dispatch  = useAppDispatch();
  const { usuario } = useAppSelector((s) => s.auth);
  const servicios   = useAppSelector((s) => s.data.servicios);

  const [nombre,      setNombre]      = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [precio,      setPrecio]      = useState('');
  const [duracion,    setDuracion]    = useState('');
  const [mensaje,     setMensaje]     = useState('');
  const [mostrarForm, setMostrarForm] = useState(false);

  const puedeCrear = usuario?.id_rol !== ROL_CLIENTE;

  const guardar = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const resultado = await dispatch(registrarServicio({
      nombre, descripcion,
      precio: Number(precio),
      duracion_minutos: Number(duracion),
    }));
    if (registrarServicio.fulfilled.match(resultado)) {
      setNombre(''); setDescripcion(''); setPrecio(''); setDuracion('');
      setMostrarForm(false);
      setMensaje('✅ Servicio agregado correctamente.');
    } else {
      setMensaje(String(resultado.payload || 'No se pudo agregar el servicio.'));
    }
  };

  return (
    <main className="container page-shell">

      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
        <div className="page-heading">
          <span className="eyebrow">Servicios</span>
          <h1>✂️ Catálogo de servicios</h1>
          <p>Todos los servicios disponibles para agendamiento.</p>
        </div>
        {puedeCrear && (
          <button type="button" style={{ marginTop: '8px' }}
            onClick={() => setMostrarForm(!mostrarForm)}>
            {mostrarForm ? '✕ Cerrar' : '+ Agregar servicio'}
          </button>
        )}
      </div>

      {mostrarForm && puedeCrear && (
        <section className="panel-card">
          <div className="panel-title">
            <div>
              <h2>Nuevo servicio</h2>
              <p>Completa los datos del servicio a agregar al catálogo.</p>
            </div>
          </div>
          <form className="citas-form" onSubmit={guardar}>
            <label className="form-group">
              Nombre del servicio
              <input value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Ej: Corte degradado" required maxLength={100} />
            </label>
            <label className="form-group">
              Precio (COP)
              <input type="number" value={precio} onChange={(e) => setPrecio(e.target.value)} placeholder="Ej: 25000" min={1000} required />
            </label>
            <label className="form-group">
              Duración (minutos)
              <input type="number" value={duracion} onChange={(e) => setDuracion(e.target.value)} placeholder="Ej: 40" min={5} max={300} required />
            </label>
            <label className="form-group citas-form-full">
              Descripción
              <textarea value={descripcion} onChange={(e) => setDescripcion(e.target.value)} placeholder="Describe brevemente el servicio..." maxLength={255} required />
            </label>
            <div className="citas-form-actions">
              <button type="submit">Agregar servicio</button>
            </div>
          </form>
          {mensaje && <p className="message-box">{mensaje}</p>}
        </section>
      )}

      {!mostrarForm && mensaje && <p className="message-box">{mensaje}</p>}

      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
        <span style={{ fontSize: '13px', color: '#777' }}>
          <strong style={{ color: '#00d4c8' }}>{servicios.length}</strong> servicios disponibles
        </span>
        <span style={{ fontSize: '13px', color: '#aaa' }}>·</span>
        <span style={{ fontSize: '13px', color: '#777' }}>
          Desde <strong style={{ color: '#c9a84c' }}>{formatearMoneda(Math.min(...servicios.map(s => s.precio)))}</strong>
        </span>
        <span style={{ fontSize: '13px', color: '#aaa' }}>·</span>
        <span style={{ fontSize: '13px', color: '#777' }}>
          Hasta <strong style={{ color: '#c9a84c' }}>{formatearMoneda(Math.max(...servicios.map(s => s.precio)))}</strong>
        </span>
      </div>

      <div className="catalogo-grid">
        {servicios.map((servicio) => {
          const icono = iconosServicio[servicio.nombre] || '✂️';
          const color = coloresServicio[servicio.nombre] || '#00d4c8';
          return (
            <article className="servicio-card" key={servicio.id_servicio}
              style={{ borderTop: `3px solid ${color}` }}>
              <div className="servicio-icono-wrap" style={{ background: `${color}15`, borderRadius: '12px', width: '52px', height: '52px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', marginBottom: '14px' }}>
                {icono}
              </div>
              <h3 style={{ color: '#111', marginBottom: '8px', fontSize: '15px' }}>{servicio.nombre}</h3>
              <p style={{ color: '#777', fontSize: '13px', lineHeight: 1.6, marginBottom: '16px', flexGrow: 1 }}>{servicio.descripcion}</p>
              <div className="servicio-footer">
                <span className="servicio-precio" style={{ color: '#c9a84c' }}>{formatearMoneda(servicio.precio)}</span>
                <span className="servicio-duración">⏱ {servicio.duracion_minutos} min</span>
              </div>
            </article>
          );
        })}
      </div>
    </main>
  );
}

export default CatalogoPage;