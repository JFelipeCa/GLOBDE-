import { useState, type FormEvent } from 'react';
import CardAccion from './CardAccion';

function Citas() {
  const [cliente, setCliente] = useState('');
  const [barbero, setBarbero] = useState('');
  const [servicio, setServicio] = useState('');
  const [fecha, setFecha] = useState('');
  const [hora, setHora] = useState('');
  const [citaAgendada, setCitaAgendada] = useState('');

  const manejarAccionCitas = (modulo: string) => {
    alert(`Acción realizada en el módulo ${modulo}: revisar agenda de citas`);
    console.log(`Acción realizada en el módulo ${modulo}: revisar agenda de citas`);
  };

  const enviarCita = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setCitaAgendada(
      `Cliente: ${cliente} | Barbero: ${barbero} | Servicio: ${servicio} | Fecha: ${fecha} | Hora: ${hora}`,
    );
  };

  return (
    <div className="login-container">
      <div className="card login-card">
        <h2>Modulo de Citas - Barberia</h2>

        <form className="login-form" onSubmit={enviarCita}>
          <label>
            Nombre del Cliente
            <input
              type="text"
              name="cliente"
              value={cliente}
              onChange={(e) => setCliente(e.target.value)}
              placeholder="Ingrese el nombre"
              required
            />
          </label>

          <label>
            Barbero
            <input
              type="text"
              name="barbero"
              value={barbero}
              onChange={(e) => setBarbero(e.target.value)}
              placeholder="Nombre del barbero"
              required
            />
          </label>

          <label>
            Servicio
            <select
              name="servicio"
              value={servicio}
              onChange={(e) => setServicio(e.target.value)}
              required
            >
              <option value="" disabled>
                Seleccione un servicio
              </option>
              <option value="Corte clásico">Corte clasico</option>
              <option value="Barba">Barba</option>
              <option value="Corte y barba">Corte y barba</option>
              <option value="Tintura">Tintura</option>
            </select>
          </label>

          <label>
            Fecha
            <input
              type="date"
              name="fecha"
              value={fecha}
              onChange={(e) => setFecha(e.target.value)}
              required
            />
          </label>

          <label>
            Hora
            <input
              type="time"
              name="hora"
              value={hora}
              onChange={(e) => setHora(e.target.value)}
              required
            />
          </label>

          <button type="submit">Agendar Cita</button>
        </form>

        {citaAgendada && (
          <div className="info-box">
            <h3>Cita agendada</h3>
            <p>{citaAgendada}</p>
          </div>
        )}
      </div>

      <CardAccion
        titulo="Citas"
        descripcion="Estado: agenda disponible para revisar reservas del dia."
        nombreAccion="Revisar Agenda"
        onEjecutar={manejarAccionCitas}
      />
    </div>
  );
}

export default Citas;
