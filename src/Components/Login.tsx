import { useState, type FormEvent } from 'react';
import CardAccion from './CardAccion';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [datosIngresados, setDatosIngresados] = useState('');

  const manejarAccionHijo = (nombreModulo: string) => {
    console.log(`Accion ejecutada desde el componente hijo en el modulo: ${nombreModulo}`);
    alert(`Se activo una ayuda o accion secundaria en: ${nombreModulo}`);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setDatosIngresados(`Usuario/Email: ${email} | Contrasena: ${password}`);
  };

  return (
    <div className="login-container">
      <div className="card login-card">
        <h2>Modulo de Inicio de Sesion - Globde</h2>

        <form className="login-form" onSubmit={handleSubmit}>
          <label>
            Correo Electronico
            <input
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>

          <label>
            Contrasena
            <input
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>

          <button type="submit">Ingresar</button>
        </form>

        {datosIngresados && (
          <div className="info-box">
            <h3>Informacion ingresada</h3>
            <p>{datosIngresados}</p>
          </div>
        )}
      </div>

      <CardAccion
        titulo="Soporte de Acceso"
        descripcion="Olvidaste tu contrasena o tienes problemas para entrar?"
        nombreAccion="Solicitar Ayuda"
        onEjecutar={manejarAccionHijo}
      />
    </div>
  );
}

export default Login;
