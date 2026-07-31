export const ROL_ADMINISTRADOR = 1;
export const ROL_BARBERO = 2;
export const ROL_CLIENTE = 3;

export type EstadoCarga = 'inactivo' | 'cargando' | 'correcto' | 'error';

export interface Rol {
  id_rol: number;
  nombre: string;
  descripcion: string;
}

export interface Usuario {
  id_usuario: number;
  nombre: string;
  correo: string;
  telefono: string;
  id_rol: number;
  fecha_creacion: string;
}

export interface Cliente {
  id_cliente: number;
  id_usuario: number;
  nombre: string;
  telefono: string;
  correo: string;
  fecha_registro: string;
  puntaje: number;
}

export interface Servicio {
  id_servicio: number;
  nombre: string;
  descripcion: string;
  precio: number;
  duracion_minutos: number;
}

export interface Cita {
  id_cita: number;
  id_cliente: number;
  id_usuario: number;
  id_servicio: number;
  fecha: string;
  hora: string;
  estado: 'pendiente' | 'confirmada' | 'cancelada' | 'completada' | 'no asistio';
  observaciones: string;
}

export interface Factura {
  id_factura: number;
  id_cita: number;
  total: number;
  fecha: string;
}

export interface DetalleFactura {
  id_detalle: number;
  id_factura: number;
  id_servicio: number;
  precio: number;
}

export interface Penalidad {
  id_penalidad: number;
  id_cita: number;
  id_usuario: number;
  motivo: string;
  valor: number;
  fecha: string;
}

export interface RankingBarbero {
  id_ranking: number;
  id_usuario: number;
  nivel: string;
  porcentaje_incremento: number;
  total_citas: number;
}

export interface CatalogoCorte {
  id_corte: number;
  nombre: string;
  descripcion: string;
  imagen_url: string;
}

export interface DatosApi {
  roles: Rol[];
  usuarios: Usuario[];
  clientes: Cliente[];
  servicios: Servicio[];
  citas: Cita[];
  facturas: Factura[];
  detalle_factura: DetalleFactura[];
  penalidades: Penalidad[];
  ranking_barberos: RankingBarbero[];
  catalogo_cortes: CatalogoCorte[];
}

export interface LoginPayload {
  correo: string;
  contrasena: string;
}

export interface PasswordForgotPayload {
  correo: string;
}

export interface PasswordResetPayload {
  token: string;
  nueva_contrasena: string;
}

export interface MensajeApi {
  mensaje: string;
}

export interface ClientePayload {
  nombre: string;
  telefono: string;
  correo: string;
  contrasena: string;
}

export interface CitaPayload {
  id_cliente: number;
  id_usuario: number;
  id_servicio: number;
  fecha: string;
  hora: string;
  estado: Cita['estado'];
  observaciones: string;
}

export interface ServicioPayload {
  nombre: string;
  descripcion: string;
  precio: number;
  duracion_minutos: number;
}

export interface PerfilPayload {
  nombre: string;
  correo: string;
  telefono: string;
  contrasena?: string;
}
