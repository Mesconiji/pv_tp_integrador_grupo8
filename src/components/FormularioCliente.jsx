import { useState } from 'react';
import {
  Paper,
  Box,
  Typography,
  TextField,
  Button,
  Snackbar,
  Alert,
} from '@mui/material';
import clienteService from '../services/clienteService';
import '../css/indexstyle.css';

const FORM_INICIAL = {
  firstname: '',
  lastname: '',
  email: '',
  phone: '',
  city: '',
  username: '',
  password: '',
};

const FormularioCliente = ({ onClienteCreado }) => {
  const [form, setForm] = useState(FORM_INICIAL);
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');
  const [enviando, setEnviando] = useState(false);

  const manejarCambio = ({ target: { name, value } }) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const manejarSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMensaje('');
    const errores = [];
    if (Object.values(form).some((valor) => !valor.trim())) errores.push('Complete todos los campos.');
    if (form.email && !/^\S+@\S+\.\S+$/.test(form.email)) errores.push('El email no es válido.');
    if (form.phone && !/^\d+$/.test(form.phone)) errores.push('El teléfono debe ser numérico.');
    if (errores.length > 0) { setError(errores.join(' ')); return; }
    setEnviando(true);

    try {
      const { firstname, lastname, email, phone, city, username, password } = form;
      const nuevoCliente = {
        name: { firstname, lastname },
        email,
        phone,
        address: { city, street: '', number: '', zipcode: '' },
        username,
        password,
      };

      const { cliente, idAsignado } = await clienteService.agregarCliente(nuevoCliente);
      setMensaje(`Cliente creado correctamente. ID asignado por la API: ${idAsignado}`);
      setForm(FORM_INICIAL);
      if (onClienteCreado) onClienteCreado(cliente);
    } catch {
      setError('No se pudo crear el cliente. Intente nuevamente.');
    } finally {
      setEnviando(false);
    }
  };

  return (
    <Paper elevation={3} className="formulario-cliente">
      <Typography variant="h6" gutterBottom>
        Alta de Cliente
      </Typography>

      <Box component="form" onSubmit={manejarSubmit} noValidate className="formulario-grid">
        <TextField label="Nombre" name="firstname" value={form.firstname} onChange={manejarCambio} required />
        <TextField label="Apellido" name="lastname" value={form.lastname} onChange={manejarCambio} required />
        <TextField label="Email" name="email" type="email" value={form.email} onChange={manejarCambio} required />
        <TextField label="Teléfono" name="phone" value={form.phone} onChange={manejarCambio} required />
        <TextField label="Ciudad" name="city" value={form.city} onChange={manejarCambio} required />
        <TextField label="Usuario" name="username" value={form.username} onChange={manejarCambio} required />
        <TextField label="Contraseña" name="password" type="password" value={form.password} onChange={manejarCambio} required />

        <Button type="submit" variant="contained" color="success" disabled={enviando} className="formulario-boton">
          {enviando ? 'Creando...' : 'Crear Cliente'}
        </Button>
      </Box>

      {error && (
        <Alert severity="error" className="formulario-alert">
          {error}
        </Alert>
      )}

      <Snackbar
        open={!!mensaje}
        autoHideDuration={4000}
        onClose={() => setMensaje('')}
      >
        <Alert severity="success" onClose={() => setMensaje('')}>
          {mensaje}
        </Alert>
      </Snackbar>
    </Paper>
  );
};

export default FormularioCliente;