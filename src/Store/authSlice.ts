import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { isAxiosError } from 'axios';
import { loginUsuario } from '../api/globdeApi';
import type { EstadoCarga, LoginPayload, PerfilPayload, Usuario } from '../types';
import { actualizarPerfil } from '../api/globdeApi';

interface AuthState {
  usuario: Usuario | null;
  estado: EstadoCarga;
  error: string | null;
}

const initialState: AuthState = {
  usuario: null,
  estado: 'inactivo',
  error: null,
};

function obtenerMensajeError(error: unknown) {
  if (isAxiosError(error)) {
    const detalle = error.response?.data as { detail?: string } | undefined;
    return detalle?.detail || error.message;
  }
  return 'Ocurrio un error inesperado';
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
      state.estado = 'inactivo';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(iniciarSesion.pending, (state) => {
        state.estado = 'cargando';
        state.error = null;
      })
      .addCase(iniciarSesion.fulfilled, (state, action) => {
        state.estado = 'correcto';
        state.usuario = action.payload;
      })
      .addCase(iniciarSesion.rejected, (state, action) => {
        state.estado = 'error';
        state.error = String(action.payload || 'No se pudo iniciar sesion');
      })
      .addCase(guardarPerfilUsuario.fulfilled, (state, action) => {
        state.usuario = action.payload;
      });
  },
});

export const { cerrarSesion } = authSlice.actions;
export default authSlice.reducer;
