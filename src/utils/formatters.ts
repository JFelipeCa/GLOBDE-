export function formatearMoneda(valor: number) {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0,
  }).format(valor || 0);
}

export function formatearFecha(fecha: string) {
  if (!fecha) {
    return 'Sin fecha';
  }

  return new Date(`${fecha}T00:00:00`).toLocaleDateString('es-CO', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

export function claseEstado(estado: string) {
  return `badge badge-${estado.replace(/\s+/g, '-')}`;
}
