import { BrowserRouter as Router } from 'react-router-dom';
import { UsuarioProvider } from './context/UsuarioContext';
import Nav from './components/Nav';
import AppRoutes from './routes/routes';

function App() {
  return (
    <UsuarioProvider>
      <Router>
        <Nav />
        <AppRoutes />
      </Router>
    </UsuarioProvider>
  );
}

export default App;