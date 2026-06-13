import StatCard from '../Components/StatCard';
import { useAppSelector } from '../Store/hooks';
import { ROL_CLIENTE } from '../types';
import { claseEstado, formatearFecha, formatearMoneda } from '../utils/formatters';

function DashboardAdminPage() {
  const { usuario } = useAppSelector((state) => state.auth);
  const { usuarios, clientes, citas, servicios } = useAppSelector((state) => state.data);

  const recientes = [...citas]
    .sort((a, b) => `${b.fecha}T${b.hora}`.localeCompare(`${a.fecha}T${a.hora}`))
    .slice(0, 5);

  const pendientes   = citas.filter((c) => c.estado === 'pendiente').length;
  const confirmadas  = citas.filter((c) => c.estado === 'confirmada').length;
  const completadas  = citas.filter((c) => c.estado === 'completada').length;
  const canceladas   = citas.filter((c) => c.estado === 'cancelada').length;

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

      {/* STATS */}
      <section className="stats-grid">
        <StatCard etiqueta="Clientes activos"  valor={clientes.length}  icono="👥" color="cyan" />
        <StatCard etiqueta="Usuarios internos" valor={usuarios.filter((u) => u.id_rol !== ROL_CLIENTE).length} icono="💼" color="default" />
        <StatCard etiqueta="Citas registradas" valor={citas.length}     icono="📅" color="cyan" />
        <StatCard etiqueta="Servicios"         valor={servicios.length} icono="✂️" color="gold" />
      </section>

      {/* DASHBOARD GRID */}
      <section className="dashboard-grid">
        {/* Actividad reciente */}
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

        {/* Resumen operativo */}
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
    </main>
  );
}

export default DashboardAdminPage;