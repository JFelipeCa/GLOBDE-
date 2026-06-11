import { useState } from 'react';

interface CardAccionProps {
  titulo: string;
  descripcion: string;
  nombreAccion: string;
  onEjecutar: (modulo: string) => void;
}

export function CardAccion({
  titulo,
  descripcion,
  nombreAccion,
  onEjecutar,
}: CardAccionProps) {
  const [vecesUsado, setVecesUsado] = useState(0);

  const manejarClick = () => {
    setVecesUsado(vecesUsado + 1);
    onEjecutar(titulo);
  };

  return (
    <div className="action-card">
      <h3>{titulo}</h3>
      <p>{descripcion}</p>
      <p>Veces usado: {vecesUsado}</p>
      <button type="button" onClick={manejarClick}>
        {nombreAccion}
      </button>
    </div>
  );
}

export default CardAccion;
