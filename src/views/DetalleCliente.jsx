import { useNavigate } from 'react-router-dom'
import { Button, Snackbar, Alert } from '@mui/material'
import { useAuth } from '../hook/userAuth'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { CircularProgress, Box, Typography } from '@mui/material'
import clienteService from '../services/clienteService'  


const DetalleCliente = () => {
  
  const { id } = useParams()
  const navigate = useNavigate()
  const { auth } = useAuth()
  const [open, setOpen] = useState(false)
  const [cliente, setCliente] = useState(null)
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    
    clienteService.obtenerClientePorId(id)
      .then(setCliente)
      .finally(() => setCargando(false))
    
  }, [id])
  const eliminarCliente = async () => {
  try {

    await clienteService.eliminarCliente(id)

    setOpen(true)

    setTimeout(() => {
      navigate('/clientes')
    }, 2000)

  } catch (error) {
    console.error(error)
  }
}

  if (cargando) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    )
  }

  if (!cliente) {
    return (
      <Box p={4}>
        <Typography color="error">No se pudo cargar el cliente.</Typography>
      </Box>
    )
  }


// Desestructuracion de los Datos del cliente
    const {
    name: { firstname, lastname },
    address: { street, number, zipcode, city },
    username,
    password,
  } = cliente

return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>
        Ficha del Cliente
      </Typography>

      <Typography variant="h6">{firstname} {lastname}</Typography>

      <Box mt={2}>
        <Typography variant="subtitle1" fontWeight="bold">Dirección</Typography>
        <Typography>Calle: {street}</Typography>
        <Typography>Número: {number}</Typography>
        <Typography>Código Postal: {zipcode}</Typography>
        <Typography>Ciudad: {city}</Typography>
      </Box>

      <Box mt={2}>
        <Typography variant="subtitle1" fontWeight="bold">Credenciales</Typography>
        <Typography>Usuario: {username}</Typography>
        <Typography>Contraseña: {password}</Typography>
        {
  auth?.usuario?.sector === 'Gerencia' && (
    <Box mt={3}>
      <Button
        variant="contained"
        color="error"
        onClick={eliminarCliente}
      >
        Eliminar Cliente de la Base de Datos
      </Button>
    </Box>
  )
}
      </Box>
      <Snackbar
  open={open}
  autoHideDuration={3000}
  onClose={() => setOpen(false)}
>
  <Alert severity="success">
    Cliente eliminado correctamente
  </Alert>
</Snackbar>
    </Box>
  )
}

export default DetalleCliente