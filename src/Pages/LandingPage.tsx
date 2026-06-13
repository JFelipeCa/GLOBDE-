import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../Store/hooks';
import { iniciarSesion as loginUsuario } from '../Store/authSlice';
import './LandingPage.css';

type ModalTab = 'login' | 'registro';

const validarNombre   = (n: string) => /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{3,100}$/.test(n.trim());
const validarCorreo   = (c: string) => /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/.test(c);
const validarTelefono = (t: string) => /^[0-9]{7,15}$/.test(t.replace(/\s/g, ""));
const validarPassword = (p: string) => p.length >= 6 && p.length <= 50;

export default function LandingPage() {
  const dispatch  = useAppDispatch();
  const navigate  = useNavigate();
  const { estado, error } = useAppSelector((s) => s.auth);
  const usuario   = useAppSelector((s) => s.auth.usuario);
  const cargando  = estado === 'cargando';

  const [modalAbierto, setModalAbierto] = useState(false);
  const [tab, setTab]                   = useState<ModalTab>('login');
  const [correo,      setCorreo]        = useState('');
  const [contrasena,  setContrasena]    = useState('');
  const [errLogin,    setErrLogin]      = useState('');
  const [regNombre,   setRegNombre]     = useState('');
  const [regCorreo,   setRegCorreo]     = useState('');
  const [regTelefono, setRegTelefono]   = useState('');
  const [regPassword, setRegPassword]   = useState('');
  const [regPassword2,setRegPassword2]  = useState('');
  const [regError,    setRegError]      = useState('');
  const [regExito,    setRegExito]      = useState('');

  const abrirModal  = (t: ModalTab = 'login') => { setTab(t); setModalAbierto(true); };
  const cerrarModal = () => setModalAbierto(false);

  const irAlDashboard = () => {
    if (!usuario) return;
    if (usuario.id_rol === 1) navigate('/admin');
    else if (usuario.id_rol === 2) navigate('/barbero');
    else navigate('/cliente');
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrLogin('');
    if (!validarCorreo(correo))   { setErrLogin('Ingresa un correo válido.'); return; }
    if (!contrasena)              { setErrLogin('La contraseña es obligatoria.'); return; }
    const result = await dispatch(loginUsuario({ correo, contrasena }));
    if (loginUsuario.fulfilled.match(result)) {
      cerrarModal();
      const rol = result.payload.id_rol;
      if (rol === 1) navigate('/admin');
      else if (rol === 2) navigate('/barbero');
      else navigate('/cliente');
    }
  };

  const handleRegistro = async (e: React.FormEvent) => {
    e.preventDefault();
    setRegError(''); setRegExito('');
    if (!validarNombre(regNombre)) { setRegError('El nombre solo debe contener letras y espacios (mín. 3 caracteres).'); return; }
    if (!validarCorreo(regCorreo))     { setRegError('Ingresa un correo válido.'); return; }
    if (!validarTelefono(regTelefono)) { setRegError('Ingresa un teléfono válido (7-15 dígitos).'); return; }
    if (!validarPassword(regPassword)) { setRegError('La contraseña debe tener al menos 6 caracteres.'); return; }
    if (regPassword !== regPassword2)  { setRegError('Las contraseñas no coinciden.'); return; }
    try {
      const res = await fetch('http://127.0.0.1:8000/api/clientes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre: regNombre, correo: regCorreo, telefono: regTelefono, contrasena: regPassword }),
      });
      if (!res.ok) {
        const data = await res.json();
        setRegError(data.detail || 'Error al registrarse');
      } else {
        setRegExito('¡Cuenta creada! Ya puedes iniciar sesión.');
        setRegNombre(''); setRegCorreo(''); setRegTelefono(''); setRegPassword(''); setRegPassword2('');
        setTimeout(() => setTab('login'), 1800);
      }
    } catch { setRegError('No se pudo conectar con el servidor'); }
  };

  const servicios = [
    { nombre: 'Corte clásico',    desc: 'Corte con máquina y tijera, acabado impecable.',  precio: '$20.000', tiempo: '30 min', icono: '✂️' },
    { nombre: 'Corte degradado',  desc: 'Fade moderno con degradado preciso y definido.',  precio: '$25.000', tiempo: '40 min', icono: '💈' },
    { nombre: 'Arreglo de barba', desc: 'Perfilado y arreglo de barba a navaja.',          precio: '$15.000', tiempo: '20 min', icono: '🪒' },
    { nombre: 'Corte + barba',    desc: 'Combo completo de corte y arreglo de barba.',     precio: '$35.000', tiempo: '50 min', icono: '⭐' },
    { nombre: 'Corte infantil',   desc: 'Corte especial para niños, cuidado y preciso.',   precio: '$18.000', tiempo: '25 min', icono: '👦' },
    { nombre: 'Tinte de cabello', desc: 'Aplicación de color profesional a tu gusto.',    precio: '$45.000', tiempo: '90 min', icono: '🎨' },
  ];

  const barberos = [
    { nombre: 'Carlos Mendez',  rol: 'Barbero Senior', nivel: 'Oro',    inicial: 'C' },
    { nombre: 'Andres Salgado', rol: 'Barbero',        nivel: 'Plata',  inicial: 'A' },
    { nombre: 'Ricardo Peña',   rol: 'Barbero',        nivel: 'Bronce', inicial: 'R' },
  ];

  const ventajas = [
    { icono: '📅', titulo: 'Agenda en segundos',    desc: 'Reserva tu cita en cualquier momento desde tu celular o computador, sin llamadas ni filas.' },
    { icono: '⭐', titulo: 'Programa de puntos',     desc: 'Acumula puntos con cada visita y canjéalos por descuentos y servicios exclusivos.' },
    { icono: '🔔', titulo: 'Recordatorios',          desc: 'Recibe notificaciones automáticas para que nunca olvides tu próxima cita.' },
    { icono: '💈', titulo: 'Barberos certificados',  desc: 'Todos nuestros barberos cuentan con formación profesional y años de experiencia.' },
    { icono: '🏆', titulo: 'Ranking de barberos',    desc: 'Sistema de reconocimiento que premia a los mejores barberos según su desempeño.' },
    { icono: '🔒', titulo: 'Datos seguros',          desc: 'Tu información personal está protegida. Solo tú y el personal autorizado pueden acceder.' },
  ];

  const testimonios = [
    { nombre: 'Diego Castillo',  texto: 'El mejor servicio de barbería que he encontrado. La app hace que agendar sea súper fácil.', nota: '⭐⭐⭐⭐⭐' },
    { nombre: 'Sofia Herrera',   texto: 'Me encanta el sistema de puntos. Ya llevo 80 puntos acumulados y el trato es excelente.', nota: '⭐⭐⭐⭐⭐' },
    { nombre: 'Esteban Rios',    texto: 'Carlos Mendez es un crack. Puntual, profesional y el resultado siempre supera mis expectativas.', nota: '⭐⭐⭐⭐⭐' },
  ];

  const equipo = [
    { nombre: 'Juan Felipe Cañón', rol: 'Líder de proyecto & Backend',  inicial: 'J', color: '#00d4c8' },
    { nombre: 'Dayanna Patiño',    rol: 'Diseño UI/UX & Frontend',      inicial: 'D', color: '#c9a84c' },
    { nombre: 'Laura Cepeda',      rol: 'Frontend & Base de datos',     inicial: 'L', color: '#00d4c8' },
  ];

  return (
    <div className="landing">

      {/* NAVBAR */}
      <nav className="l-nav">
        <div className="l-logo">
          <div className="l-logo-ring">G</div>
          <span className="l-logo-name">GLOBDE</span>
        </div>
        <ul className="l-nav-links">
          <li><a href="#servicios">Servicios</a></li>
          <li><a href="#ventajas">Ventajas</a></li>
          <li><a href="#barberos">Barberos</a></li>
          <li><a href="#nosotros">Nosotros</a></li>
        </ul>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          {usuario ? (
            <>
              <span style={{ fontSize: '13px', color: '#666' }}>👤 {usuario.nombre}</span>
              <button className="l-btn-dark" onClick={irAlDashboard}>Mi panel →</button>
            </>
          ) : (
            <>
              <button className="l-btn-ghost-dark" onClick={() => abrirModal('login')}>Iniciar sesión</button>
              <button className="l-btn-dark" onClick={() => abrirModal('registro')}>Reservar cita</button>
            </>
          )}
        </div>
      </nav>

      {/* HERO */}
      <section className="l-hero">
        <div className="l-hero-content">
          <div className="l-hero-tag"><span className="l-hero-dot" />Barbería profesional · Bogotá</div>
          <h1 className="l-hero-h">Tu corte,<br />tu <span className="l-cyan">carácter.</span></h1>
          <p className="l-hero-p">Agenda tu cita en segundos con los mejores barberos de la ciudad. Estilo, precisión y comodidad en un solo lugar.</p>
          <div className="l-hero-btns">
            <button className="l-btn-cyan" onClick={() => abrirModal('registro')}>Reservar ahora</button>
            <button className="l-btn-ghost" onClick={() => document.getElementById('servicios')?.scrollIntoView({ behavior: 'smooth' })}>Ver servicios</button>
          </div>
        </div>
        <div className="l-hero-stats">
          <div className="l-stat"><strong className="l-cyan">30+</strong><span>Citas este mes</span></div>
          <div className="l-stat l-stat-gold"><strong>15</strong><span>Clientes activos</span></div>
          <div className="l-stat"><strong className="l-cyan">3</strong><span>Barberos expertos</span></div>
        </div>
      </section>

      {/* SERVICIOS */}
      <section className="l-section l-section-gray" id="servicios">
        <div className="l-container">
          <p className="l-eyebrow">Lo que ofrecemos</p>
          <h2 className="l-section-h">Nuestros servicios</h2>
          <p className="l-section-sub">Calidad profesional en cada visita</p>
          <div className="l-services-grid">
            {servicios.map((s) => (
              <div key={s.nombre} className="l-scard">
                <div className="l-scard-icon">{s.icono}</div>
                <div className="l-scard-name">{s.nombre}</div>
                <div className="l-scard-desc">{s.desc}</div>
                <div className="l-scard-footer">
                  <span className="l-scard-price">{s.precio}</span>
                  <span className="l-scard-time">⏱ {s.tiempo}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* POR QUÉ ELEGIRNOS */}
      <section className="l-section" id="ventajas">
        <div className="l-container">
          <p className="l-eyebrow">¿Por qué elegirnos?</p>
          <h2 className="l-section-h">Una experiencia diferente</h2>
          <p className="l-section-sub">No solo un corte — una experiencia completa</p>
          <div className="l-ventajas-grid">
            {ventajas.map((v) => (
              <div key={v.titulo} className="l-ventaja-card">
                <div className="l-ventaja-icono">{v.icono}</div>
                <div className="l-ventaja-titulo">{v.titulo}</div>
                <div className="l-ventaja-desc">{v.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BARBEROS */}
      <section className="l-section l-section-gray" id="barberos">
        <div className="l-container">
          <p className="l-eyebrow">Nuestro equipo</p>
          <h2 className="l-section-h">Los mejores barberos</h2>
          <p className="l-section-sub">Expertos comprometidos con tu estilo</p>
          <div className="l-team-grid">
            {barberos.map((b) => (
              <div key={b.nombre} className="l-bcard">
                <div className="l-bcard-av">{b.inicial}</div>
                <div className="l-bcard-name">{b.nombre}</div>
                <div className="l-bcard-role">{b.rol}</div>
                <span className="l-bcard-badge">Nivel {b.nivel}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIOS */}
      <section className="l-section l-testimonios-bg">
        <div className="l-container">
          <p className="l-eyebrow" style={{ color: '#00d4c8' }}>Lo que dicen nuestros clientes</p>
          <h2 className="l-section-h" style={{ color: '#fff' }}>Reseñas reales</h2>
          <p className="l-section-sub" style={{ color: '#999' }}>La satisfacción de nuestros clientes habla por nosotros</p>
          <div className="l-testimonios-grid">
            {testimonios.map((t) => (
              <div key={t.nombre} className="l-testimonio-card">
                <div className="l-testimonio-nota">{t.nota}</div>
                <p className="l-testimonio-texto">"{t.texto}"</p>
                <div className="l-testimonio-nombre">— {t.nombre}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SOBRE NOSOTROS — EQUIPO DESARROLLADOR */}
      <section className="l-section" id="nosotros">
        <div className="l-container">
          <div className="l-nosotros-grid">
            <div className="l-nosotros-texto">
              <p className="l-eyebrow">Sobre nosotros</p>
              <h2 className="l-section-h">Creado con propósito</h2>
              <p style={{ fontSize: '15px', color: '#555', lineHeight: 1.8, marginBottom: '20px' }}>
                <strong>Globde</strong> nació como un proyecto académico con una visión clara: digitalizar y simplificar la gestión de barberías en Colombia. Creemos que la tecnología debe estar al servicio de los negocios locales, facilitando la comunicación entre clientes y profesionales.
              </p>
              <p style={{ fontSize: '14px', color: '#777', lineHeight: 1.7, marginBottom: '28px' }}>
                Desarrollado por estudiantes apasionados por el diseño y la programación, Globde integra una interfaz moderna con un sistema robusto de gestión de citas, clientes y pagos.
              </p>
              <div className="l-nosotros-equipo">
                {equipo.map((m) => (
                  <div key={m.nombre} className="l-miembro">
                    <div className="l-miembro-av" style={{ borderColor: m.color, color: m.color }}>{m.inicial}</div>
                    <div>
                      <div className="l-miembro-nombre">{m.nombre}</div>
                      <div className="l-miembro-rol">{m.rol}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="l-nosotros-stats">
              <div className="l-nosotros-stat">
                <strong>2026</strong>
                <span>Año de fundación</span>
              </div>
              <div className="l-nosotros-stat">
                <strong style={{ color: '#00d4c8' }}>100%</strong>
                <span>Hecho en Colombia</span>
              </div>
              <div className="l-nosotros-stat">
                <strong style={{ color: '#c9a84c' }}>3</strong>
                <span>Desarrolladores</span>
              </div>
              <div className="l-nosotros-stat">
                <strong style={{ color: '#00d4c8' }}>∞</strong>
                <span>Pasión por el código</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="l-cta" id="contacto">
        <div className="l-cta-text">
          <h2>¿Listo para tu próxima cita?</h2>
          <p>Regístrate gratis y agenda en menos de 2 minutos.</p>
        </div>
        <button className="l-btn-dark" onClick={() => abrirModal('registro')}>Crear cuenta gratis</button>
      </section>

      {/* FOOTER */}
      <footer className="l-footer-new">
        <div className="l-footer-col">
          <div className="l-logo" style={{ marginBottom: '14px' }}>
            <div className="l-logo-ring">G</div>
            <span className="l-logo-name" style={{ color: '#fff' }}>GLOBDE</span>
          </div>
          <p style={{ fontSize: '13px', color: '#555', maxWidth: '280px', lineHeight: 1.7 }}>
            Sistema de gestión de citas para barberías. Agenda, clientes, servicios y más en un solo lugar.
          </p>
        </div>
        <div className="l-footer-col">
          <p className="l-footer-heading">Navegación</p>
          <div className="l-footer-links">
            <a href="#servicios">Servicios</a>
            <a href="#ventajas">¿Por qué elegirnos?</a>
            <a href="#barberos">Barberos</a>
            <a href="#nosotros">Sobre nosotros</a>
          </div>
        </div>
        <div className="l-footer-col">
          <p className="l-footer-heading">Contáctanos</p>
          <div className="l-footer-links">
            <span>📍 Bogotá, Colombia</span>
            <span>📧 globde@barberia.com</span>
            <span>📞 +57 300 000 0000</span>
          </div>
        </div>
        <div className="l-footer-bottom">
          <p>© 2026 Globde · Desarrollado por <strong style={{ color: '#00d4c8' }}>Juan Cañón</strong>, <strong style={{ color: '#00d4c8' }}>Dayanna Patiño</strong> y <strong style={{ color: '#00d4c8' }}>Laura Cepeda</strong></p>
        </div>
      </footer>

      {/* MODAL */}
      {modalAbierto && (
        <div className="l-overlay" onClick={(e) => e.target === e.currentTarget && cerrarModal()}>
          <div className="l-modal">
            <div className="l-modal-tabs">
              <button className={`l-mtab ${tab === 'login' ? 'active' : ''}`} onClick={() => setTab('login')}>Iniciar sesión</button>
              <button className={`l-mtab ${tab === 'registro' ? 'active' : ''}`} onClick={() => setTab('registro')}>Registrarse</button>
              <button className="l-modal-close" onClick={cerrarModal}>✕</button>
            </div>
            {tab === 'login' ? (
              <form className="l-modal-body" onSubmit={handleLogin}>
                <h2 className="l-modal-h">Bienvenido de nuevo</h2>
                <p className="l-modal-sub">Ingresa tus datos para continuar</p>
                <div className="l-field"><label>Correo electrónico</label><input type="email" placeholder="tu@correo.com" value={correo} onChange={(e) => setCorreo(e.target.value)} required /></div>
                <div className="l-field"><label>Contraseña</label><input type="password" placeholder="••••••••" value={contrasena} onChange={(e) => setContrasena(e.target.value)} required /></div>
                {(errLogin || error) && <div className="l-msg l-msg-error">{errLogin || error}</div>}
                <button type="submit" className="l-modal-btn" disabled={cargando}>{cargando ? 'Ingresando...' : 'Ingresar'}</button>
                <p className="l-modal-foot">¿No tienes cuenta? <span className="l-link" onClick={() => setTab('registro')}>Regístrate aquí</span></p>
              </form>
            ) : (
              <form className="l-modal-body" onSubmit={handleRegistro}>
                <h2 className="l-modal-h">Crea tu cuenta</h2>
                <p className="l-modal-sub">Es gratis y solo toma un momento</p>
                <div className="l-field"><label>Nombre completo</label><input type="text" placeholder="Tu nombre completo" value={regNombre} onChange={(e) => setRegNombre(e.target.value)} maxLength={100} required /></div>
                <div className="l-field"><label>Correo electrónico</label><input type="email" placeholder="tu@correo.com" value={regCorreo} onChange={(e) => setRegCorreo(e.target.value)} required /></div>
                <div className="l-field"><label>Teléfono</label><input type="tel" placeholder="3001234567" value={regTelefono} onChange={(e) => setRegTelefono(e.target.value)} maxLength={15} required /></div>
                <div className="l-field"><label>Contraseña <span style={{ color: '#aaa', fontSize: '11px' }}>(mín. 6 caracteres)</span></label><input type="password" placeholder="••••••••" value={regPassword} onChange={(e) => setRegPassword(e.target.value)} minLength={6} required /></div>
                <div className="l-field"><label>Confirmar contraseña</label><input type="password" placeholder="••••••••" value={regPassword2} onChange={(e) => setRegPassword2(e.target.value)} minLength={6} required /></div>
                {regError && <div className="l-msg l-msg-error">{regError}</div>}
                {regExito && <div className="l-msg l-msg-exito">{regExito}</div>}
                <button type="submit" className="l-modal-btn">Crear cuenta</button>
                <p className="l-modal-foot">¿Ya tienes cuenta? <span className="l-link" onClick={() => setTab('login')}>Inicia sesión</span></p>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}