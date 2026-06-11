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

  return (
    <main className="container hero-shell">
      <section className="dashboard-hero">
        <div className="hero-copy">
          <span className="eyebrow">Vista administrativa</span>
          <h1>Hola, {usuario?.nombre}</h1>
          <p>Gestiona clientes, barberos, servicios, facturas y agenda desde un solo panel.</p>
        </div>
        <div className="hero-deco">*</div>
      </section>

      <section className="stats-grid">
        <StatCard etiqueta="Clientes activos" valor={clientes.length} />
        <StatCard etiqueta="Usuarios internos" valor={usuarios.filter((item) => item.id_rol !== ROL_CLIENTE).length} />
        <StatCard etiqueta="Citas registradas" valor={citas.length} />
        <StatCard etiqueta="Servicios" valor={servicios.length} />
      </section>

      <section className="dashboard-grid">
        <article className="panel-card">
          <div className="panel-title">
            <div>
              <h2>Actividad reciente</h2>
              <p>Ultimas citas creadas en el sistema.</p>
            </div>
          </div>

          <div className="activity-list">
            {recientes.length === 0 && <div className="activity-item">No hay citas registradas.</div>}
            {recientes.map((cita) => {
              const cliente = clientes.find((item) => item.id_cliente === cita.id_cliente);
              const barbero = usuarios.find((item) => item.id_usuario === cita.id_usuario);
              const servicio = servicios.find((item) => item.id_servicio === cita.id_servicio);

              return (
                <article className="activity-item" key={cita.id_cita}>
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
                </article>
              );
            })}
          </div>
        </article>

        <article className="panel-card">
          <div className="panel-title">
            <div>
              <h2>Resumen operativo</h2>
              <p>Estado general de agenda y catalogo.</p>
            </div>
          </div>
          <div className="summary-grid">
            <div className="summary-card">
              <strong>{citas.filter((cita) => cita.estado === 'pendiente').length}</strong>
              <span>Citas pendientes</span>
            </div>
            <div className="summary-card">
              <strong>{citas.filter((cita) => cita.estado === 'confirmada').length}</strong>
              <span>Citas confirmadas</span>
            </div>
            <div className="summary-card">
              <strong>{servicios[0]?.nombre || '-'}</strong>
              <span>Servicio destacado</span>
            </div>
          </div>
        </article>
      </section>
    </main>
  );
}

export default DashboardAdminPage;
