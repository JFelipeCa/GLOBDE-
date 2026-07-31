import { useState, type FormEvent } from 'react';
import StatCard from '../components/StatCard';
import { useAppSelector } from '../store/hooks';
import { ROL_CLIENTE, ROL_BARBERO } from '../types';
import { claseEstado, formatearFecha, formatearMoneda } from '../utils/formatters';

function DashboardAdminPage() {
  const { usuario } = useAppSelector((state) => state.auth);
  const { usuarios, clientes, citas, servicios, ranking_barberos } = useAppSelector((state) => state.data);

  const recientes = [...citas]
    .sort((a, b) => `${b.fecha}T${b.hora}`.localeCompare(`${a.fecha}T${a.hora}`))
    .slice(0, 5);

  const pendientes   = citas.filter((c) => c.estado === 'pendiente').length;
  const confirmadas  = citas.filter((c) => c.estado === 'confirmada').length;
  const completadas  = citas.filter((c) => c.estado === 'completada').length;
  const canceladas   = citas.filter((c) => c.estado === 'cancelada').length;

  const barberos = usuarios.filter((u) => u.id_rol === ROL_BARBERO);


  const [nuNombre,    setNuNombre]    = useState('');
  const [nuCorreo,    setNuCorreo]    = useState('');
  const [nuTelefono,  setNuTelefono]  = useState('');
  const [nuPassword,  setNuPassword]  = useState('');
  const [nuRol,       setNuRol]       = useState('2');
  const [nuMensaje,   setNuMensaje]   = useState('');
  const [nuCargando,  setNuCargando]  = useState(false);
  const [mostrarForm, setMostrarForm] = useState(false);

  const crearUsuario = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setNuCargando(true);
    setNuMensaje('');
    try {
      const res = await fetch('http://127.0.0.1:8000/api/usuarios/interno', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre:     nuNombre,
          correo:     nuCorreo,
          telefono:   nuTelefono,
          contrasena: nuPassword,
          id_rol:     Number(nuRol),
        }),
      });
      if (!res.ok) {
        const data = await res.json();
        setNuMensaje(`❌ ${data.detail || 'Error al crear usuario'}`);
      } else {
        setNuMensaje('✅ Usuario creado correctamente. Recarga la página para verlo en la lista.');
        setNuNombre(''); setNuCorreo(''); setNuTelefono(''); setNuPassword(''); setNuRol('2');
        setMostrarForm(false);
      }
    } catch {
      setNuMensaje('❌ No se pudo conectar con el servidor.');
    } finally {
      setNuCargando(false);
    }
  };

  const nivelColor = (nivel: string) =>
    nivel === 'Oro' ? '#c9a84c' : nivel === 'Plata' ? '#aaa' : '#cd7f32';

  return (
    <main className="container hero-shell">
      {/* HERO */}
      <section className="dashboard-hero">
        <div className="hero-copy">
          <span className="eyebrow">Vista administrativa</span>
          <h1>Hola, {usuario?.nombre} 👋</h1>
          <p>Gestiona clientes, barberos, servicios, facturas y agenda desde un solo panel.</p>
        </div>
        <div className="hero-deco">✂️</div>
      </section>

      <section className="stats-grid">
        <StatCard etiqueta="Clientes activos"  valor={clientes.length}  icono="👥" color="cyan" />
        <StatCard etiqueta="Usuarios internos" valor={usuarios.filter((u) => u.id_rol !== ROL_CLIENTE).length} icono="💼" color="default" />
        <StatCard etiqueta="Citas registradas" valor={citas.length}     icono="📅" color="cyan" />
        <StatCard etiqueta="Servicios"         valor={servicios.length} icono="✂️" color="cyan" />
      </section>

      <section className="dashboard-grid">
        <article className="panel-card">
          <div className="panel-title">
            <div>
              <h2>Actividad reciente</h2>
              <p>Últimas citas creadas en el sistema.</p>
            </div>
          </div>
          <div className="activity-list">
            {recientes.length === 0 && (
              <div className="activity-item">No hay citas registradas.</div>
            )}
            {recientes.map((cita) => {
              const cliente  = clientes.find((c) => c.id_cliente === cita.id_cliente);
              const barbero  = usuarios.find((u) => u.id_usuario === cita.id_usuario);
              const servicio = servicios.find((s) => s.id_servicio === cita.id_servicio);
              return (
                <article className="activity-item" key={cita.id_cita}>
                  <div className="item-head">
                    <span className="item-title">{servicio?.nombre || 'Sin servicio'}</span>
                    <span className={claseEstado(cita.estado)}>{cita.estado}</span>
                  </div>
                  <div className="item-meta">
                    <span>👤 {cliente?.nombre || 'Sin cliente'}</span>
                    <span>💈 {barbero?.nombre || 'Sin barbero'}</span>
                    <span>📅 {formatearFecha(cita.fecha)} | {cita.hora}</span>
                    <span>💰 {formatearMoneda(servicio?.precio || 0)}</span>
                  </div>
                </article>
              );
            })}
          </div>
        </article>

        <article className="panel-card">
          <div className="panel-title">
            <div>
              <h2>Resumen operativo</h2>
              <p>Estado general de agenda y catálogo.</p>
            </div>
          </div>
          <div className="summary-grid">
            <div className="summary-card" style={{ borderTop: '3px solid #c9a84c' }}>
              <strong style={{ color: '#c9a84c', fontSize: '2rem' }}>{pendientes}</strong>
              <span>⏳ Pendientes</span>
            </div>
            <div className="summary-card" style={{ borderTop: '3px solid #00d4c8' }}>
              <strong style={{ color: '#00d4c8', fontSize: '2rem' }}>{confirmadas}</strong>
              <span>✅ Confirmadas</span>
            </div>
            <div className="summary-card" style={{ borderTop: '3px solid #52b788' }}>
              <strong style={{ color: '#52b788', fontSize: '2rem' }}>{completadas}</strong>
              <span>🏁 Completadas</span>
            </div>
            <div className="summary-card" style={{ borderTop: '3px solid #e05252' }}>
              <strong style={{ color: '#e05252', fontSize: '2rem' }}>{canceladas}</strong>
              <span>❌ Canceladas</span>
            </div>
          </div>

          <div style={{ marginTop: '20px', padding: '16px', background: '#f7f7f7', borderRadius: '10px', border: '1px solid #e8e8e8' }}>
            <p style={{ fontSize: '11px', color: '#aaa', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px' }}>
              Servicio más popular
            </p>
            <p style={{ fontWeight: 600, color: '#111', fontSize: '15px' }}>
              ✂️ {servicios[0]?.nombre || '-'}
            </p>
            <p style={{ fontSize: '13px', color: '#777', marginTop: '4px' }}>
              {servicios[0]?.descripcion || ''}
            </p>
          </div>
        </article>
      </section>

      <section className="panel-card">
        <div className="panel-title">
          <div>
            <h2>💈 Equipo de barberos</h2>
            <p>Barberos activos y su posición en el ranking.</p>
          </div>
          <button type="button" onClick={() => setMostrarForm(!mostrarForm)}>
            {mostrarForm ? '✕ Cerrar' : '+ Agregar usuario'}
          </button>
        </div>

        {mostrarForm && (
          <form className="citas-form" onSubmit={crearUsuario} style={{ marginBottom: '24px' }}>
            <label className="form-group">
              Nombre completo
              <input value={nuNombre} onChange={(e) => setNuNombre(e.target.value)} placeholder="Ej: Pedro Ramírez" required maxLength={100} />
            </label>
            <label className="form-group">
              Correo electrónico
              <input type="email" value={nuCorreo} onChange={(e) => setNuCorreo(e.target.value)} placeholder="correo@globde.com" required />
            </label>
            <label className="form-group">
              Teléfono
              <input value={nuTelefono} onChange={(e) => setNuTelefono(e.target.value)} placeholder="3001234567" required maxLength={15} />
            </label>
            <label className="form-group">
              Contraseña
              <input type="password" value={nuPassword} onChange={(e) => setNuPassword(e.target.value)} placeholder="••••••••" required minLength={6} />
            </label>
            <label className="form-group">
              Rol
              <select value={nuRol} onChange={(e) => setNuRol(e.target.value)}>
                <option value="2">💈 Barbero</option>
                <option value="1">👑 Administrador</option>
              </select>
            </label>
            <div className="citas-form-actions">
              <button type="submit" disabled={nuCargando}>
                {nuCargando ? 'Creando...' : 'Crear usuario'}
              </button>
            </div>
          </form>
        )}

        {nuMensaje && <p className="message-box" style={{ marginBottom: '16px' }}>{nuMensaje}</p>}

        <ul id="listaCitas">
          {barberos.length === 0 && (
            <li style={{ padding: '20px', color: '#aaa', textAlign: 'center' }}>
              No hay barberos registrados.
            </li>
          )}
          {barberos.map((b) => {
            const ranking = ranking_barberos.find((r) => r.id_usuario === b.id_usuario);
            return (
              <li key={b.id_usuario}>
                <div className="item-head">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{
                      width: '40px', height: '40px', borderRadius: '50%',
                      background: '#f7f7f7', border: '2px solid #00d4c8',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '16px', fontWeight: 700, color: '#00d4c8', flexShrink: 0,
                    }}>
                      {b.nombre.charAt(0)}
                    </div>
                    <div>
                      <span className="item-title">{b.nombre}</span>
                      <div className="item-meta" style={{ marginTop: '2px' }}>
                        <span>✉️ {b.correo}</span>
                        <span>📞 {b.telefono}</span>
                      </div>
                    </div>
                  </div>
                  {ranking && (
                    <span className="badge" style={{
                      background: `${nivelColor(ranking.nivel)}20`,
                      color: nivelColor(ranking.nivel),
                    }}>
                      🏆 {ranking.nivel} · {ranking.total_citas} citas
                    </span>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </section>
    </main>
  );
}

export default DashboardAdminPage;