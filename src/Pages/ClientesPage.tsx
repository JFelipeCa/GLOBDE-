import { useState, type FormEvent } from 'react';
import { registrarCliente } from '../Store/dataSlice';
import { useAppDispatch, useAppSelector } from '../Store/hooks';

function ClientesPage() {
  const dispatch = useAppDispatch();
  const clientes = useAppSelector((state) => state.data.clientes);
  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [mensaje, setMensaje] = useState('');

  const guardar = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const resultado = await dispatch(registrarCliente({ nombre, telefono, correo, contrasena }));
    if (registrarCliente.fulfilled.match(resultado)) {
      setNombre('');
      setTelefono('');
      setCorreo('');
      setContrasena('');
      setMensaje('Cliente registrado correctamente.');
    } else {
      setMensaje(String(resultado.payload || 'No se pudo registrar el cliente.'));
    }
  };

  return (
    <main className="container page-shell">
      <div className="page-heading">
        <h1>Clientes</h1>
        <p>Registro y consulta de usuarios con rol cliente.</p>
      </div>

      <section className="panel-card">
        <form className="form-grid" onSubmit={guardar}>
          <input value={nombre} onChange={(event) => setNombre(event.target.value)} placeholder="Nombre" required />
          <input value={telefono} onChange={(event) => setTelefono(event.target.value)} placeholder="Telefono" required />
          <input type="email" value={correo} onChange={(event) => setCorreo(event.target.value)} placeholder="Correo" required />
          <input
            type="password"
            value={contrasena}
            onChange={(event) => setContrasena(event.target.value)}
            placeholder="Contrasena"
            required
          />
          <button type="submit">Agregar cliente</button>
        </form>
        {mensaje && <p className="message-box">{mensaje}</p>}
      </section>

      <ul id="listaClientes">
        {clientes.map((cliente) => (
          <li key={cliente.id_cliente}>
            <div className="item-head">
              <span className="item-title">{cliente.nombre}</span>
              <span className="badge badge-confirmada">Cliente</span>
            </div>
            <div className="item-meta">
              <span>{cliente.correo}</span>
              <span>{cliente.telefono}</span>
              <span>Puntaje: {cliente.puntaje}</span>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}

export default ClientesPage;
