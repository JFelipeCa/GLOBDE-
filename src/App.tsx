import { Navigate, Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './Components/Navbar';
import ProtectedRoute from './Components/ProtectedRoute';
import CatalogoPage from './Pages/CatalogoPage';
import CitasPage from './Pages/CitasPage';
import ClientesPage from './Pages/ClientesPage';
import DashboardAdminPage from './Pages/DashboardAdminPage';
import DashboardBarberoPage from './Pages/DashboardBarberoPage';
import DashboardClientePage from './Pages/DashboardClientePage';
import FacturasPage from './Pages/FacturasPage';
import LoginPage from './Pages/LoginPage';
import PerfilPage from './Pages/PerfilPage';
import { cargarDatos } from './Store/dataSlice';
import { useAppDispatch, useAppSelector } from './Store/hooks';
import { ROL_ADMINISTRADOR, ROL_BARBERO, ROL_CLIENTE } from './types';
import './App.css';

function App() {
  const dispatch = useAppDispatch();
  const { usuario } = useAppSelector((state) => state.auth);

  useEffect(() => {
    dispatch(cargarDatos());
  }, [dispatch]);

  return (
    <>
      {usuario && <Navbar />}

      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<Navigate to={usuario ? '/admin' : '/login'} replace />} />

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
        <Route path="*" element={<Navigate to={usuario ? '/' : '/login'} replace />} />
      </Routes>
    </>
  );
}

export default App;
