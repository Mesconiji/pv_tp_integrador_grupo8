import { useState } from 'react';
import {
  Container,
  Box,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  TextField,
  Button,
} from '@mui/material';
import { useAuth } from '../hook/userAuth';
import '../css/indexstyle.css';

const PerfilUsuario = () => {
  const { auth, actualizarPerfil } = useAuth();
  const usuario = auth?.usuario || {};

  const [enEdicion, setEnEdicion] = useState(false);
  const [nombre, setNombre] = useState(usuario.nombre || '');
  const [correo, setCorreo] = useState(usuario.correo || '');

  const handleGuardar = () => {
    actualizarPerfil({ nombre, correo });
    setEnEdicion(false);
  };

  const handleCancelar = () => {
    setNombre(usuario.nombre || '');
    setCorreo(usuario.correo || '');
    setEnEdicion(false);
  };

  const campos = [
    { key: 'nombre', label: 'Nombre', value: nombre, setter: setNombre, fallback: 'No definido', editable: true },
    { key: 'correo', label: 'Correo', value: correo, setter: setCorreo, fallback: 'No definido', editable: true },
    { key: 'sector', label: 'Sector', value: usuario.sector || 'No definido', editable: false },
  ];

  return (
    <Container maxWidth="md" className="perfil-container">
      <Box className="perfil-header">
        <Typography variant="h4" component="h1" gutterBottom>
          Perfil del Administrador
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Datos de la sesión activa. Podés editar tu nombre y correo.
        </Typography>
      </Box>

      <Paper elevation={3} className="perfil-paper">
        <List>
          {campos.map(({ key, label, value, setter, fallback, editable }) => (
            <ListItem key={key} disablePadding className="perfil-campo">
              {enEdicion && editable ? (
                <TextField
                  label={label}
                  value={value}
                  onChange={({ target: { value } }) => setter(value)}
                  fullWidth
                  size="small"
                />
              ) : (
                <ListItemText primary={label} secondary={value || fallback} />
              )}
            </ListItem>
          ))}
        </List>

        <Box className="perfil-acciones">
          {enEdicion ? (
            <>
              <Button variant="outlined" onClick={handleCancelar}>
                Cancelar
              </Button>
              <Button variant="contained" onClick={handleGuardar}>
                Guardar
              </Button>
            </>
          ) : (
            <Button variant="contained" onClick={() => setEnEdicion(true)}>
              Editar Perfil
            </Button>
          )}
        </Box>
      </Paper>
    </Container>
  );
};

export default PerfilUsuario;