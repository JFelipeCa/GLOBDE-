import { useAppSelector } from '../Store/hooks';
import { formatearFecha, formatearMoneda } from '../utils/formatters';

function FacturasPage() {
  const { facturas, detalle_factura, citas, clientes, servicios } = useAppSelector((state) => state.data);

  const totalIngresos = facturas.reduce((sum, f) => sum + f.total, 0);

  return (
    <main className="container page-shell">
      <div className="page-heading">
        <span className="eyebrow">Finanzas</span>
        <h1>🧾 Facturas</h1>
        <p>Consulta de facturas y detalle de servicios asociados.</p>
      </div>

      {/* Resumen financiero */}
      <div className="stats-grid" style={{ marginBottom: '24px' }}>
        <article className="stat-card">
          <div style={{ fontSize: '1.4rem', marginBottom: '8px' }}>🧾</div>
          <strong style={{ color: '#00d4c8' }}>{facturas.length}</strong>
          <span>Total facturas</span>
        </article>
        <article className="stat-card">
          <div style={{ fontSize: '1.4rem', marginBottom: '8px' }}>💰</div>
          <strong style={{ color: '#c9a84c' }}>{formatearMoneda(totalIngresos)}</strong>
          <span>Ingresos totales</span>
        </article>
        <article className="stat-card">
          <div style={{ fontSize: '1.4rem', marginBottom: '8px' }}>📊</div>
          <strong style={{ color: '#111' }}>{formatearMoneda(facturas.length ? totalIngresos / facturas.length : 0)}</strong>
          <span>Promedio por factura</span>
        </article>
      </div>

      <section className="panel-card">
        <div className="panel-title">
          <div>
            <h2>Historial de facturas</h2>
            <p>Todas las transacciones registradas en el sistema.</p>
          </div>
        </div>
        <ul id="listaCitas">
          {facturas.length === 0 && (
            <li style={{ padding: '20px', color: '#aaa', textAlign: 'center' }}>No hay facturas registradas.</li>
          )}
          {facturas.map((factura) => {
            const cita     = citas.find((c) => c.id_cita === factura.id_cita);
            const cliente  = clientes.find((c) => c.id_cliente === cita?.id_cliente);
            const detalles = detalle_factura.filter((d) => d.id_factura === factura.id_factura);
            return (
              <li key={factura.id_factura}>
                <div className="item-head">
                  <span className="item-title">🧾 Factura #{factura.id_factura}</span>
                  <span className="badge" style={{ background: 'rgba(201,168,76,0.15)', color: '#c9a84c', fontSize: '14px', padding: '4px 12px' }}>
                    {formatearMoneda(factura.total)}
                  </span>
                </div>
                <div className="item-meta">
                  <span>👤 {cliente?.nombre || 'Sin cliente'}</span>
                  <span>📅 {formatearFecha(factura.fecha)}</span>
                </div>
                <div className="item-subtitle" style={{ marginTop: '8px', padding: '8px 12px', background: '#f7f7f7', borderRadius: '8px', fontSize: '13px', color: '#555' }}>
                  {detalles.map((d) => {
                    const servicio = servicios.find((s) => s.id_servicio === d.id_servicio);
                    return `✂️ ${servicio?.nombre || 'Servicio'} (${formatearMoneda(d.precio)})`;
                  }).join(' · ')}
                </div>
              </li>
            );
          })}
        </ul>
      </section>
    </main>
  );
}

export default FacturasPage;