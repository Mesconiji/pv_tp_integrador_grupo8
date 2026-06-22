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
  Button
} from '@mui/material'
import clienteService from '../services/clienteService'

const ListaClientes = () => {

  const [clientes, setClientes] = useState([])
  const [cargando, setCargando] = useState(true)
  const [restaurando, setRestaurando] = useState(false)

  useEffect(() => {
    const cargarClientes = async () => {
      const data = await clienteService.obtenerClientes()
      setClientes(data)
      setCargando(false)
    }

    cargarClientes()
  }, [])

  const restaurarClientes = async () => {
    setRestaurando(true)
    const data = await clienteService.restaurarClientes()
    setClientes(data)
    setRestaurando(false)
  }

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" align="center" gutterBottom>
        Lista de Clientes
      </Typography>

      {cargando ? (
        <Box className="loader-box">
          <CircularProgress />
        </Box>
      ) : (
        <Box className="table-box">
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Nombre Completo</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Teléfono</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {clientes.map((cliente) => {
                  const { id, name, email, phone } = cliente
                  const { firstname, lastname } = name

                  return (
                    <TableRow key={id}>
                      <TableCell>{id}</TableCell>
                      <TableCell>{firstname} {lastname}</TableCell>
                      <TableCell>{email}</TableCell>
                      <TableCell>{phone}</TableCell>
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