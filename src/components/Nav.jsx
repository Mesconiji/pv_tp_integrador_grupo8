import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../hook/userAuth';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import '../styles/indexstyle.css';

export default function Nav() {
  const { auth, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!auth || !auth.estaLogeado) return null;

  return (
    <AppBar position="static" className="nav-appbar">
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <Typography variant="h6" component="div">Admin Panel</Typography>
          <Button color="inherit" component={RouterLink} to="/dashboard">Dashboard</Button>
          <Button color="inherit" component={RouterLink} to="/clientes">Lista de Clientes</Button>
        </Box>

        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <Typography variant="body2">{auth.usuario?.nombre} — <strong>{auth.usuario?.sector}</strong></Typography>
          <Button variant="contained" color="error" onClick={handleLogout} className="logout-button">Cerrar Sesión</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}