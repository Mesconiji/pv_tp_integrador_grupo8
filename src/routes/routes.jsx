import { createBrowserRouter } from 'react-router-dom'

import App from '../App'
import Dashboard from '../views/Dashboard'
import ListaClientes from '../views/ListaClientes'
import DetalleCliente from '../views/DetalleCliente'
import PerfilUsuario from '../views/PerfilUsuario'
import ErrorPage from '../views/ErrorPage'
import RutaPrivada from '../components/RutaPrivada'

const routes = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { index: true,
        element: <Dashboard /> },
      { path: 'dashboard', 
        element: <Dashboard /> },
      {
        element: <RutaPrivada />,
        children: [
          { path: 'clientes', 
            element: <ListaClientes /> },
          { path: 'clientes/:id',
           element: <DetalleCliente /> },
          { path: 'perfil', 
            element: <PerfilUsuario /> },
          { path: '*', 
            element: <ErrorPage /> },
        ],
      },
    ],
  },
  { path: '*', element: <ErrorPage /> },
])

export default routes