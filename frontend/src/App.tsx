import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import LandingPage from './pages/LandingPage';
import CatalogoPage from './pages/CatalogoPage';
import CitasPage from './pages/CitasPage';
import ClientesPage from './pages/ClientesPage';
import DashboardAdminPage from './pages/DashboardAdminPage';
import DashboardBarberoPage from './pages/DashboardBarberoPage';
import DashboardClientePage from './pages/DashboardClientePage';
import FacturasPage from './pages/FacturasPage';
import PerfilPage from './pages/PerfilPage';
import PasswordResetPage from './pages/PasswordResetPage';
import { ReportesPage } from './pages/ReportesPage';
import { cargarDatos } from './store/dataSlice';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { ROL_ADMINISTRADOR, ROL_BARBERO, ROL_CLIENTE } from './types';
import './App.css';

function App() {
  const dispatch = useAppDispatch();
  const { usuario } = useAppSelector((state) => state.auth);
  const location = useLocation();
  const esLanding = location.pathname === '/';

  useEffect(() => {
    if (usuario) dispatch(cargarDatos());
  }, [dispatch, usuario]);

  return (
    <>
      {usuario && !esLanding && <Navbar />}

      <Routes>
        <Route path="/" element={<LandingPage />} />

        <Route path="/login" element={<Navigate to="/" replace />} />
        <Route path="/recuperar-contrasena" element={<PasswordResetPage />} />
        <Route path="/restablecer-password" element={<PasswordResetPage />} />

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
          path="/admin/reportes"
          element={
            <ProtectedRoute rolesPermitidos={[ROL_ADMINISTRADOR]}>
              <ReportesPage />
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

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default App;