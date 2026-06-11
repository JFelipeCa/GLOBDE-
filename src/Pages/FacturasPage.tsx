import { useAppSelector } from '../Store/hooks';
import { formatearFecha, formatearMoneda } from '../utils/formatters';

function FacturasPage() {
  const { facturas, detalle_factura, citas, clientes, servicios } = useAppSelector((state) => state.data);

  return (
    <main className="container page-shell">
      <div className="page-heading">
        <h1>Facturas</h1>
        <p>Consulta de facturas y detalle de servicios asociados.</p>
      </div>

      <section className="panel-card">
        <ul id="listaCitas">
          {facturas.map((factura) => {
            const cita = citas.find((item) => item.id_cita === factura.id_cita);
            const cliente = clientes.find((item) => item.id_cliente === cita?.id_cliente);
            const detalles = detalle_factura.filter((item) => item.id_factura === factura.id_factura);

            return (
              <li key={factura.id_factura}>
                <div className="item-head">
                  <span className="item-title">Factura #{factura.id_factura}</span>
                  <span className="badge badge-confirmada">{formatearMoneda(factura.total)}</span>
                </div>
                <div className="item-meta">
                  <span>Cliente: {cliente?.nombre || 'Sin cliente'}</span>
                  <span>Fecha: {formatearFecha(factura.fecha)}</span>
                </div>
                <div className="item-subtitle">
                  {detalles
                    .map((detalle) => {
                      const servicio = servicios.find((item) => item.id_servicio === detalle.id_servicio);
                      return `${servicio?.nombre || 'Servicio'} (${formatearMoneda(detalle.precio)})`;
                    })
                    .join(', ')}
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
