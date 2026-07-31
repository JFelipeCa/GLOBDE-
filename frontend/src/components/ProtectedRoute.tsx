import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../store/hooks';

interface ProtectedRouteProps {
  children: React.ReactNode;
  rolesPermitidos: number[];
}

function ProtectedRoute({ children, rolesPermitidos }: ProtectedRouteProps) {
  const { usuario } = useAppSelector((state) => state.auth);

  if (!usuario) {
    return <Navigate to="/login" replace />;
  }

  if (!rolesPermitidos.includes(usuario.id_rol)) {
    return <Navigate to="/perfil" replace />;
  }

  return children;
}

export default ProtectedRoute;
