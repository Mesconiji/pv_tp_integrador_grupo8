import { useNavigate } from 'react-router-dom'
import { Button, Snackbar, Alert, CircularProgress, Box, Typography, Container, Card, CardContent } from '@mui/material'
import { useAuth } from '../hook/userAuth'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import clienteService from '../services/clienteService'
import ErrorPage from './ErrorPage'

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
      <Box className="detalle-loader-box">
        <CircularProgress />
      </Box>
    )
  }

  if (!cliente) {
    return <ErrorPage />
  }


    const {
    name: { firstname, lastname },
    address: { street, number, zipcode, city },
    username,
    password,
  } = cliente

return (
    <Container maxWidth="md" className="detalle-container">
      <Card className="detalle-card">
        <CardContent>
          <Typography variant="h4" gutterBottom>
            Ficha del Cliente
          </Typography>

          <Typography variant="h6" gutterBottom>
            {firstname} {lastname}
          </Typography>

          <Box className="detalle-section">
            <Typography variant="subtitle1" className="detalle-section-title">Dirección</Typography>
            <Typography>Calle: {street}</Typography>
            <Typography>Número: {number}</Typography>
            <Typography>Código Postal: {zipcode}</Typography>
            <Typography>Ciudad: {city}</Typography>
          </Box>

          <Box className="detalle-section">
            <Typography variant="subtitle1" className="detalle-section-title">Credenciales</Typography>
            <Typography>Usuario: {username}</Typography>
            <Typography>Contraseña: {password}</Typography>
            {auth?.usuario?.sector === 'Gerencia' && (
              <Box className="detalle-button-box">
                <Button
                  variant="contained"
                  color="error"
                  onClick={eliminarCliente}
                >
                  Eliminar Cliente de la Base de Datos
                </Button>
              </Box>
            )}
          </Box>
        </CardContent>
      </Card>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={() => setOpen(false)}
      >
        <Alert severity="success">
          Cliente eliminado correctamente
        </Alert>
      </Snackbar>
    </Container>
  )
}


export default DetalleCliente