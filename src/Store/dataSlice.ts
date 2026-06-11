import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { isAxiosError } from 'axios';
import {
  actualizarCita,
  crearCita,
  crearCliente,
  crearServicio,
  obtenerDatos,
} from '../api/globdeApi';
import type {
  Cita,
  CitaPayload,
  ClientePayload,
  DatosApi,
  EstadoCarga,
  ServicioPayload,
} from '../types';

interface DataState extends DatosApi {
  estado: EstadoCarga;
  error: string | null;
}

const initialState: DataState = {
  roles: [],
  usuarios: [],
  clientes: [],
  servicios: [],
  citas: [],
  facturas: [],
  detalle_factura: [],
  penalidades: [],
  ranking_barberos: [],
  catalogo_cortes: [],
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

export const cargarDatos = createAsyncThunk('data/cargarDatos', async (_, { rejectWithValue }) => {
  try {
    return await obtenerDatos();
  } catch (error) {
    return rejectWithValue(obtenerMensajeError(error));
  }
});

export const registrarCliente = createAsyncThunk(
  'data/registrarCliente',
  async (payload: ClientePayload, { rejectWithValue }) => {
    try {
      return await crearCliente(payload);
    } catch (error) {
      return rejectWithValue(obtenerMensajeError(error));
    }
  },
);

export const registrarServicio = createAsyncThunk(
  'data/registrarServicio',
  async (payload: ServicioPayload, { rejectWithValue }) => {
    try {
      return await crearServicio(payload);
    } catch (error) {
      return rejectWithValue(obtenerMensajeError(error));
    }
  },
);

export const registrarCita = createAsyncThunk(
  'data/registrarCita',
  async (payload: CitaPayload, { rejectWithValue }) => {
    try {
      return await crearCita(payload);
    } catch (error) {
      return rejectWithValue(obtenerMensajeError(error));
    }
  },
);

export const editarCita = createAsyncThunk(
  'data/editarCita',
  async ({ idCita, payload }: { idCita: number; payload: CitaPayload }, { rejectWithValue }) => {
    try {
      return await actualizarCita(idCita, payload);
    } catch (error) {
      return rejectWithValue(obtenerMensajeError(error));
    }
  },
);

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(cargarDatos.pending, (state) => {
        state.estado = 'cargando';
        state.error = null;
      })
      .addCase(cargarDatos.fulfilled, (state, action) => {
        Object.assign(state, action.payload);
        state.estado = 'correcto';
      })
      .addCase(cargarDatos.rejected, (state, action) => {
        state.estado = 'error';
        state.error = String(action.payload || 'No se pudo conectar con la API');
      })
      .addCase(registrarCliente.fulfilled, (state, action) => {
        state.clientes.push(action.payload);
      })
      .addCase(registrarServicio.fulfilled, (state, action) => {
        state.servicios.push(action.payload);
      })
      .addCase(registrarCita.fulfilled, (state, action) => {
        state.citas.push(action.payload);
      })
      .addCase(editarCita.fulfilled, (state, action) => {
        const indice = state.citas.findIndex((cita: Cita) => cita.id_cita === action.payload.id_cita);
        if (indice >= 0) {
          state.citas[indice] = action.payload;
        }
      });
  },
});

export default dataSlice.reducer;
