import StatCard from '../components/StatCard';
import { useAppSelector } from '../store/hooks';
import { claseEstado, formatearFecha } from '../utils/formatters';

function DashboardBarberoPage() {
  const { usuario } = useAppSelector((state) => state.auth);
  const { citas, clientes, servicios, ranking_barberos } = useAppSelector((state) => state.data);
  const citasBarbero = citas.filter((cita) => cita.id_usuario === usuario?.id_usuario);
  const ranking = ranking_barberos.find((item) => item.id_usuario === usuario?.id_usuario);

  return (
    <main className="container hero-shell">
      <section className="dashboard-hero">
        <div className="hero-copy">
          <span className="eyebrow">Vista barbero</span>
          <h1>Agenda de {usuario?.nombre}</h1>
          <p>Consulta tus citas asignadas, clientes y avance dentro del ranking.</p>
        </div>
        <div className="hero-deco">*</div>
      </section>

      <section className="stats-grid">
        <StatCard etiqueta="Citas asignadas" valor={citasBarbero.length} />
        <StatCard etiqueta="Pendientes" valor={citasBarbero.filter((cita) => cita.estado === 'pendiente').length} />
        <StatCard etiqueta="Nivel" valor={ranking?.nivel || 'Inicial'} />
      </section>

      <section className="panel-card">
        <div className="panel-title">
          <div>
            <h2>Mis proximas citas</h2>
            <p>Agenda filtrada por tu usuario de barbero.</p>
          </div>
        </div>
        <ul id="listaCitas">
          {citasBarbero.map((cita) => {
            const cliente = clientes.find((item) => item.id_cliente === cita.id_cliente);
            const servicio = servicios.find((item) => item.id_servicio === cita.id_servicio);
            return (
              <li key={cita.id_cita}>
                <div className="item-head">
                  <span className="item-title">{servicio?.nombre}</span>
                  <span className={claseEstado(cita.estado)}>{cita.estado}</span>
                </div>
                <div className="item-meta">
                  <span>{cliente?.nombre}</span>
                  <span>{formatearFecha(cita.fecha)} | {cita.hora}</span>
                </div>
              </li>
            );
          })}
        </ul>
      </section>
    </main>
  );
}

export default DashboardBarberoPage;
