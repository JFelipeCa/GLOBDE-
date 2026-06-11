import { useState, type FormEvent } from 'react';
import CardAccion from './CardAccion';

function Disponibilidad() {
  const [barbero, setBarbero] = useState('');
  const [fecha, setFecha] = useState('');
  const [horaInicio, setHoraInicio] = useState('');
  const [horaFin, setHoraFin] = useState('');
  const [estado, setEstado] = useState('Disponible');
  const [resumen, setResumen] = useState('');

  const guardarDisponibilidad = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setResumen(
      `Barbero: ${barbero} | Fecha: ${fecha} | Horario: ${horaInicio} - ${horaFin} | Estado: ${estado}`,
    );
  };

  const manejarAccionDisponibilidad = (modulo: string) => {
    alert(`Accion realizada en ${modulo}: revisar horarios disponibles`);
    console.log(`Accion realizada en ${modulo}: revisar horarios disponibles`);
  };

  return (
    <div className="login-container">
      <div className="card login-card">
        <h2>Disponibilidad de Horarios</h2>

        <form className="login-form" onSubmit={guardarDisponibilidad}>
          <label>
            Barbero
            <input
              type="text"
              value={barbero}
              onChange={(e) => setBarbero(e.target.value)}
              placeholder="Nombre del barbero"
              required
            />
          </label>

          <label>
            Fecha
            <input type="date" value={fecha} onChange={(e) => setFecha(e.target.value)} required />
          </label>

          <label>
            Hora de Inicio
            <input
              type="time"
              value={horaInicio}
              onChange={(e) => setHoraInicio(e.target.value)}
              required
            />
          </label>

          <label>
            Hora de Fin
            <input
              type="time"
              value={horaFin}
              onChange={(e) => setHoraFin(e.target.value)}
              required
            />
          </label>

          <label>
            Estado
            <select value={estado} onChange={(e) => setEstado(e.target.value)} required>
              <option value="Disponible">Disponible</option>
              <option value="Ocupado">Ocupado</option>
              <option value="Descanso">Descanso</option>
            </select>
          </label>

          <button type="submit">Guardar Disponibilidad</button>
        </form>

        {resumen && (
          <div className="info-box">
            <h3>Informacion ingresada</h3>
            <p>{resumen}</p>
          </div>
        )}
      </div>

      <CardAccion
        titulo="Disponibilidad"
        descripcion="Permite definir horarios antes de agendar nuevas citas."
        nombreAccion="Revisar Horarios"
        onEjecutar={manejarAccionDisponibilidad}
      />
    </div>
  );
}

export default Disponibilidad;
