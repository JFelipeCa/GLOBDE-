import axiosClient from './axiosClient';
import type {
  Cita,
  CitaPayload,
  Cliente,
  ClientePayload,
  DatosApi,
  LoginPayload,
  MensajeApi,
  PasswordForgotPayload,
  PasswordResetPayload,
  PerfilPayload,
  Servicio,
  ServicioPayload,
  Usuario,
} from '../types';

export async function loginUsuario(payload: LoginPayload) {
  const response = await axiosClient.post<Usuario>('/login', payload);
  return response.data;
}

export async function solicitarRecuperacionContrasena(payload: PasswordForgotPayload) {
  const response = await axiosClient.post<MensajeApi>('/password/forgot', payload);
  return response.data;
}

export async function restablecerContrasena(payload: PasswordResetPayload) {
  const response = await axiosClient.post<MensajeApi>('/password/reset', payload);
  return response.data;
}

export async function obtenerDatos() {
  const response = await axiosClient.get<DatosApi>('/datos');
  return response.data;
}

export async function crearCliente(payload: ClientePayload) {
  const response = await axiosClient.post<Cliente>('/clientes', payload);
  return response.data;
}

export async function crearServicio(payload: ServicioPayload) {
  const response = await axiosClient.post<Servicio>('/servicios', payload);
  return response.data;
}

export async function crearCita(payload: CitaPayload) {
  const response = await axiosClient.post<Cita>('/citas', payload);
  return response.data;
}

export async function actualizarCita(idCita: number, payload: CitaPayload) {
  const response = await axiosClient.put<Cita>(`/citas/${idCita}`, payload);
  return response.data;
}

export async function actualizarPerfil(idUsuario: number, payload: PerfilPayload) {
  const response = await axiosClient.put<Usuario>(`/usuarios/${idUsuario}`, payload);
  return response.data;
}
