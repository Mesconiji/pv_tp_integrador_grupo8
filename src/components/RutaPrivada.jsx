import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hook/userAuth';

const RutaPrivada = () => {
  const { auth } = useAuth();

  if (!auth?.estaLogeado) return <Navigate to="/" replace />;

  return <Outlet />;
};

export default RutaPrivada;
