import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { isAxiosError } from 'axios';
import { loginUsuario, actualizarPerfil } from '../api/globdeApi';
import type { EstadoCarga, LoginPayload, PerfilPayload, Usuario } from '../types';

const STORAGE_KEY = 'globde_usuario';

interface AuthState {
  usuario: Usuario | null;
  estado:  EstadoCarga;
  error:   string | null;
}

function cargarSesionGuardada(): Usuario | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Usuario) : null;
  } catch {
    return null;
  }
}

const initialState: AuthState = {
  usuario: cargarSesionGuardada(),
  estado:  'inactivo',
  error:   null,
};

function obtenerMensajeError(error: unknown) {
  if (isAxiosError(error)) {
    const detalle = error.response?.data as { detail?: string } | undefined;
    return detalle?.detail || error.message;
  }
  return 'Ocurrió un error inesperado';
}

export const iniciarSesion = createAsyncThunk(
  'auth/iniciarSesion',
  async (payload: LoginPayload, { rejectWithValue }) => {
    try {
      return await loginUsuario(payload);
    } catch (error) {
      return rejectWithValue(obtenerMensajeError(error));
    }
  },
);

export const guardarPerfilUsuario = createAsyncThunk(
  'auth/guardarPerfilUsuario',
  async (
    { idUsuario, payload }: { idUsuario: number; payload: PerfilPayload },
    { rejectWithValue },
  ) => {
    try {
      return await actualizarPerfil(idUsuario, payload);
    } catch (error) {
      return rejectWithValue(obtenerMensajeError(error));
    }
  },
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    cerrarSesion(state) {
      state.usuario = null;
      state.estado  = 'inactivo';
      state.error   = null;
      localStorage.removeItem(STORAGE_KEY);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(iniciarSesion.pending, (state) => {
        state.estado = 'cargando';
        state.error  = null;
      })
      .addCase(iniciarSesion.fulfilled, (state, action) => {
        state.estado  = 'correcto';
        state.usuario = action.payload;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(action.payload));
      })
      .addCase(iniciarSesion.rejected, (state, action) => {
        state.estado = 'error';
        state.error  = String(action.payload || 'No se pudo iniciar sesión');
      })
      .addCase(guardarPerfilUsuario.fulfilled, (state, action) => {
        state.usuario = action.payload;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(action.payload));
      });
  },
});

export const { cerrarSesion } = authSlice.actions;
export default authSlice.reducer;