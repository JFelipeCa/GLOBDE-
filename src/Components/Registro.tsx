import { useState, type FormEvent } from 'react';
import CardAccion from './CardAccion';

function Registro() {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [datosRegistrados, setDatosRegistrados] = useState('');

  const manejarAccion = (mensaje: string) => {
    alert(`Accion realizada en Registro: ${mensaje}`);
    console.log(`Accion realizada en Registro: ${mensaje}`);
  };

  const enviarFormulario = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setDatosRegistrados(`Nombre: ${nombre} | Correo: ${correo} | Contrasena: ${contrasena}`);
  };

  return (
    <div className="login-container">
      <div className="card login-card">
        <h2>Modulo de Registro</h2>

        <form className="login-form" onSubmit={enviarFormulario}>
          <label>
            Nombre
            <input
              type="text"
              name="nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Ingrese su nombre"
              required
            />
          </label>

          <label>
            Correo Electronico
            <input
              type="email"
              name="correo"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              placeholder="Ingrese su correo"
              required
            />
          </label>

          <label>
            Contrasena
            <input
              type="password"
              name="contrasena"
              value={contrasena}
              onChange={(e) => setContrasena(e.target.value)}
              placeholder="Ingrese su contrasena"
              required
            />
          </label>

          <button type="submit">Registrarse</button>
        </form>

        {datosRegistrados && (
          <div className="info-box">
            <h3>Informacion ingresada</h3>
            <p>{datosRegistrados}</p>
          </div>
        )}
      </div>

      <CardAccion
        titulo="Registro de Usuario"
        descripcion="Estado: Activo"
        nombreAccion="Ejecutar Accion"
        onEjecutar={manejarAccion}
      />
    </div>
  );
}

export default Registro;
