interface StatCardProps {
  etiqueta: string;
  valor: string | number;
}

function StatCard({ etiqueta, valor }: StatCardProps) {
  return (
    <article className="stat-card">
      <strong>{valor}</strong>
      <span>{etiqueta}</span>
    </article>
  );
}

export default StatCard;
