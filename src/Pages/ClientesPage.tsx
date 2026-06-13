import { useState, type FormEvent } from 'react';
import { registrarCliente } from '../Store/dataSlice';
import { useAppDispatch, useAppSelector } from '../Store/hooks';

function ClientesPage() {
  const dispatch = useAppDispatch();
  const clientes = useAppSelector((state) => state.data.clientes);
  const [nombre,    setNombre]    = useState('');
  const [telefono,  setTelefono]  = useState('');
  const [correo,    setCorreo]    = useState('');
  const [contrasena,setContrasena]= useState('');
  const [mensaje,   setMensaje]   = useState('');

  const guardar = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const resultado = await dispatch(registrarCliente({ nombre, telefono, correo, contrasena }));
    if (registrarCliente.fulfilled.match(resultado)) {
      setNombre(''); setTelefono(''); setCorreo(''); setContrasena('');
      setMensaje('✅ Cliente registrado correctamente.');
    } else {
      setMensaje(String(resultado.payload || 'No se pudo registrar el cliente.'));
    }
  };

  const nivelPuntaje = (puntaje: number) => {
    if (puntaje >= 80) return { label: '🥇 VIP', color: '#c9a84c' };
    if (puntaje >= 40) return { label: '🥈 Regular', color: '#00d4c8' };
    return { label: '🥉 Nuevo', color: '#aaa' };
  };

  return (
    <main className="container page-shell">
      <div className="page-heading">
        <span className="eyebrow">Gestión</span>
        <h1>👥 Clientes</h1>
        <p>Registro y consulta de usuarios con rol cliente.</p>
      </div>

      <section className="panel-card">
        <div className="panel-title">
          <div>
            <h2>Agregar nuevo cliente</h2>
            <p>Completa los datos para crear el acceso del cliente.</p>
          </div>
        </div>
        <form className="form-grid" onSubmit={guardar}>
          <label className="form-group">
            Nombre completo
            <input value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Ej: Carlos Ruiz" required />
          </label>
          <label className="form-group">
            Teléfono
            <input value={telefono} onChange={(e) => setTelefono(e.target.value)} placeholder="3001234567" required />
          </label>
          <label className="form-group">
            Correo electrónico
            <input type="email" value={correo} onChange={(e) => setCorreo(e.target.value)} placeholder="correo@gmail.com" required />
          </label>
          <label className="form-group">
            Contraseña
            <input type="password" value={contrasena} onChange={(e) => setContrasena(e.target.value)} placeholder="••••••••" required />
          </label>
          <button type="submit">Agregar cliente</button>
        </form>
        {mensaje && <p className="message-box">{mensaje}</p>}
      </section>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
        <h2 style={{ fontSize: '16px', fontWeight: 600, color: '#111' }}>
          Clientes registrados <span style={{ color: '#00d4c8' }}>({clientes.length})</span>
        </h2>
      </div>

      <ul id="listaClientes">
        {clientes.map((cliente) => {
          const nivel = nivelPuntaje(cliente.puntaje);
          return (
            <li key={cliente.id_cliente}>
              <div className="item-head">
                <span className="item-title">👤 {cliente.nombre}</span>
                <span className="badge" style={{ background: `${nivel.color}20`, color: nivel.color }}>
                  {nivel.label}
                </span>
              </div>
              <div className="item-meta">
                <span>✉️ {cliente.correo}</span>
                <span>📞 {cliente.telefono}</span>
                <span>⭐ Puntaje: <strong style={{ color: '#c9a84c' }}>{cliente.puntaje}</strong></span>
                <span>📅 Registro: {cliente.fecha_registro}</span>
              </div>
            </li>
          );
        })}
      </ul>
    </main>
  );
}

export default ClientesPage;