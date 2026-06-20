// Integrante 3 creara la tabla aca
import { Container, Typography, Card, CardContent } from '@mui/material';

export default function ListaClientes() {
  return (
    <Container className="lista-container">
      <Card>
        <CardContent>
          <Typography variant="h5">Lista de Clientes (Vista Principal)</Typography>
          <Typography sx={{ mt: 1 }}>Aquí se renderizará la tabla de usuarios consumiendo GET /users de FakeStore API.</Typography>
        </CardContent>
      </Card>
    </Container>
  );
}