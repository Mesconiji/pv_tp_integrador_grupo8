import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../hook/userAuth';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import '../css/indexstyle.css';

const Nav = () => {
  const { auth, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <AppBar position="static" className="nav-appbar">
      <Toolbar className="nav-toolbar">
        <Box className="nav-group">
          <Typography variant="h6" component="div">Admin Panel</Typography>
          <Button color="inherit" component={RouterLink} to="/dashboard">Dashboard</Button>
          <Button color="inherit" component={RouterLink} to="/clientes">Lista de Clientes</Button>
        </Box>

        {auth?.estaLogeado && (
          <Box className="nav-group">
            <Typography variant="body2">{auth.usuario?.nombre} — <strong>{auth.usuario?.sector}</strong></Typography>
            <Button variant="contained" color="error" onClick={handleLogout} className="logout-button">Cerrar Sesión</Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Nav;