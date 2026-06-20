import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../hook/userAuth';
import Login from '../views/Login';
import Dashboard from '../views/Dashboard';
import ListaClientes from '../views/ListaClientes';
import DetalleCliente from '../views/DetalleCliente';

const RutaProtegida = ({ children }) => {
  const { auth } = useAuth();
  
  if (!auth || !auth.estaLogeado) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route 
        path="/dashboard" 
          element={
          <RutaProtegida>
            <Dashboard />
          </RutaProtegida>
        } 
      />
      
      <Route 
        path="/clientes" 
        element={
          <RutaProtegida>
            <ListaClientes />
          </RutaProtegida>
        } 
      />
      
      <Route 
        path="/clientes/:id" 
        element={
          <RutaProtegida>
            <DetalleCliente />
          </RutaProtegida>
        } 
      />

      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}