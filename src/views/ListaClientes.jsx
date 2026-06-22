import { useState, useEffect } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import {
  Container,
  Typography,
  Box,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Paper,
  CircularProgress,
  Button,
  Alert
} from '@mui/material'
import clienteService from '../services/clienteService'
import BuscadorClientes from '../components/BuscadorClientes'
import FormularioCliente from '../components/FormularioCliente'
import RegistroActividad from '../components/RegistroActividad'

const ListaClientes = () => {

  const [clientes, setClientes] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState('')
  const [busqueda, setBusqueda] = useState('')
  const [restaurando, setRestaurando] = useState(false)
  const [actividad, setActividad] = useState(() => clienteService.obtenerActividad())

  useEffect(() => {
    const cargarClientes = async () => {
      try {
        setError('')
        const data = await clienteService.obtenerClientes()
        setClientes(data)
      } catch {
        setError('No se pudieron cargar los clientes. Verifique su conexión e intente nuevamente.')
      } finally {
        setCargando(false)
      }
    }

    cargarClientes()
  }, [])

  const restaurarClientes = async () => {
    setRestaurando(true)
    const data = await clienteService.restaurarClientes()
    setClientes(data)
    setRestaurando(false)
  }

  const manejarClienteCreado = (cliente) => {
    setClientes((prev) => [...prev, cliente])
    setActividad(clienteService.obtenerActividad())
  }

  const clientesFiltrados = clientes.filter(({ name, address }) => {
    const texto = busqueda.trim().toLowerCase()
    if (!texto) return true
    const lastname = name?.lastname?.toLowerCase() || ''
    const city = address?.city?.toLowerCase() || ''
    return lastname.includes(texto) || city.includes(texto)
  })

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" align="center" gutterBottom>
        Lista de Clientes
      </Typography>

      {actividad && (
        <RegistroActividad mensaje={actividad.mensaje} fecha={actividad.fecha} />
      )}

      <FormularioCliente onClienteCreado={manejarClienteCreado} />

      {cargando ? (
        <Box className="loader-box">
          <CircularProgress />
        </Box>
      ) : error ? (
        <Box className="table-box">
          <Alert severity="error">{error}</Alert>
        </Box>
      ) : (
        <Box className="table-box">
          <Box className="buscador-box">
            <BuscadorClientes valor={busqueda} onBuscar={setBusqueda} />
          </Box>

          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Nombre Completo</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Teléfono</TableCell>
                  <TableCell>Ciudad</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {clientesFiltrados.map((cliente) => {
                  const { id, name, email, phone, address } = cliente
                  const { firstname, lastname } = name

                  return (
                    <TableRow key={id}>
                      <TableCell>{id}</TableCell>
                      <TableCell>{firstname} {lastname}</TableCell>
                      <TableCell>{email}</TableCell>
                      <TableCell>{phone}</TableCell>
                      <TableCell>{address?.city}</TableCell>
                      <TableCell>
                        <Button
                          component={RouterLink}
                          to={`/clientes/${id}`}
                          variant="outlined"
                          size="small"
                        >
                          Ver Ficha Completa
                        </Button>
                      </TableCell>
                    </TableRow>
                  )
                })}

                {clientesFiltrados.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} align="center">
                      No se encontraron clientes.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>

          <Box className="lista-acciones">
            <Button
              variant="contained"
              color="primary"
              onClick={restaurarClientes}
              disabled={restaurando}
            >
              {restaurando ? 'Restaurando...' : 'Restaurar Clientes (Predeterminado)'}
            </Button>
          </Box>
        </Box>
      )}
    </Container>
  )
}

export default ListaClientes