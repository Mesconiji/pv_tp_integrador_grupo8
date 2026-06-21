import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hook/userAuth';
import { Container, Box, Typography, TextField, Button, MenuItem, Alert } from '@mui/material';
import '../css/indexstyle.css';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nombreAdmin: '',
    sector: 'Soporte'
  });

  const [error, setError] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const usuarioSimulado = form.sector === 'Gerencia' ? 'gerente' : 'soporte';

    const exito = login({
      usuario: usuarioSimulado,
      password: '1234',
      nombreIngresado: form.nombreAdmin
    });

    if (exito) {
      setError(false);
      navigate('/dashboard');
    } else {
      setError(true);
    }
  };

  return (
    <Container maxWidth="sm" className="login-container">
      <Box component="form" onSubmit={handleSubmit} className="login-form">
        <Typography variant="h5" component="h2">Acceso del Administrador</Typography>

        <TextField
          label="Nombre del Administrador"
          name="nombreAdmin"
          value={form.nombreAdmin}
          onChange={handleChange}
          required
          fullWidth
          className="login-field"
        />

        <TextField
          select
          label="Sector"
          name="sector"
          value={form.sector}
          onChange={handleChange}
          fullWidth
          className="login-field"
        >
          <MenuItem value="Soporte">Soporte</MenuItem>
          <MenuItem value="Gerencia">Gerencia</MenuItem>
        </TextField>

        {error && <Alert severity="error">Error al procesar la autenticación del sector.</Alert>}

        <Button type="submit" variant="contained" className="login-button">Ingresar</Button>
      </Box>
    </Container>
  );
}