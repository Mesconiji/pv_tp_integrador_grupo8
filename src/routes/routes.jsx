import { Routes, Route } from 'react-router-dom';
import Dashboard from '../views/Dashboard';
import ListaClientes from '../views/ListaClientes';
import DetalleCliente from '../views/DetalleCliente';
import ErrorPage from '../views/ErrorPage';
import RutaPrivada from '../components/RutaPrivada';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/dashboard" element={<Dashboard />} />

      <Route element={<RutaPrivada />}>
        <Route path="/clientes" element={<ListaClientes />} />
        <Route path="/clientes/:id" element={<DetalleCliente />} />
      </Route>

      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}
