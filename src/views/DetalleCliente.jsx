// Detalle temporal
import { Container, Card, CardContent, Typography } from '@mui/material';

export default function DetalleCliente() {
  return (
    <Container className="detalle-container">
      <Card>
        <CardContent>
          <Typography variant="h5">Ficha Profunda del Cliente (GET /users/:id)</Typography>
        </CardContent>
      </Card>
    </Container>
  );
}