// Panel principal con métricas globales TEMPORAL
import { Container, Card, CardContent, Typography } from '@mui/material';

export default function Dashboard() {
  return (
    <Container className="dashboard-container">
      <Card>
        <CardContent>
          <Typography variant="h5">Dashboard Principal</Typography>
          <Typography sx={{ mt: 1 }}>Métricas globales del sistema de administración.</Typography>
        </CardContent>
      </Card>
    </Container>
  );
}