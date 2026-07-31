interface StatCardProps {
  etiqueta: string;
  valor:    string | number;
  icono?:   string;
  color?:   'cyan' | 'gold' | 'green' | 'red' | 'default';
}

function StatCard({ etiqueta, valor, icono, color = 'default' }: StatCardProps) {
  const colorMap = {
    cyan:    '#00d4c8',
    gold:    '#c9a84c',
    green:   '#52b788',
    red:     '#e05252',
    default: '#111',
  };

  return (
    <article className={`stat-card ${color}`}>
      {icono && (
        <div style={{ fontSize: '1.5rem', marginBottom: '10px' }}>{icono}</div>
      )}
      <strong style={{ color: colorMap[color] }}>{valor}</strong>
      <span>{etiqueta}</span>
    </article>
  );
}

export default StatCard;