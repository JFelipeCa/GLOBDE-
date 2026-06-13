import { Navigate, Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './Components/Navbar';
import ProtectedRoute from './Components/ProtectedRoute';
import LandingPage from './Pages/LandingPage';
import CatalogoPage from './Pages/CatalogoPage';
import CitasPage from './Pages/CitasPage';
import ClientesPage from './Pages/ClientesPage';
import DashboardAdminPage from './Pages/DashboardAdminPage';
import DashboardBarberoPage from './Pages/DashboardBarberoPage';
import DashboardClientePage from './Pages/DashboardClientePage';
import FacturasPage from './Pages/FacturasPage';
import PerfilPage from './Pages/PerfilPage';
import { cargarDatos } from './Store/dataSlice';
import { useAppDispatch, useAppSelector } from './Store/hooks';
import { ROL_ADMINISTRADOR, ROL_BARBERO, ROL_CLIENTE } from './types';
import './App.css';

function App() {
  const dispatch = useAppDispatch();
  const { usuario } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (usuario) dispatch(cargarDatos());
  }, [dispatch, usuario]);

  return (
    <>
      {/* Navbar solo se muestra cuando el usuario está autenticado */}
      {usuario && <Navbar />}

      <Routes>
        {/* Landing pública — siempre accesible */}
        <Route path="/" element={<LandingPage />} />

        {/* Redirige /login a la landing (el modal está en la landing) */}
        <Route path="/login" element={<Navigate to="/" replace />} />

        {/* Rutas protegidas por rol */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute rolesPermitidos={[ROL_ADMINISTRADOR]}>
              <DashboardAdminPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/barbero"
          element={
            <ProtectedRoute rolesPermitidos={[ROL_BARBERO]}>
              <DashboardBarberoPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cliente"
          element={
            <ProtectedRoute rolesPermitidos={[ROL_CLIENTE]}>
              <DashboardClientePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/clientes"
          element={
            <ProtectedRoute rolesPermitidos={[ROL_ADMINISTRADOR, ROL_BARBERO]}>
              <ClientesPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/citas"
          element={
            <ProtectedRoute rolesPermitidos={[ROL_ADMINISTRADOR, ROL_BARBERO, ROL_CLIENTE]}>
              <CitasPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/catalogo"
          element={
            <ProtectedRoute rolesPermitidos={[ROL_ADMINISTRADOR, ROL_BARBERO, ROL_CLIENTE]}>
              <CatalogoPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/facturas"
          element={
            <ProtectedRoute rolesPermitidos={[ROL_ADMINISTRADOR]}>
              <FacturasPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/perfil"
          element={
            <ProtectedRoute rolesPermitidos={[ROL_ADMINISTRADOR, ROL_BARBERO, ROL_CLIENTE]}>
              <PerfilPage />
            </ProtectedRoute>
          }
        />

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default App;