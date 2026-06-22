import { Link } from 'react-router-dom';
import { Container, Box, Typography, Button } from '@mui/material';
import '../css/indexstyle.css';

const ErrorPage = () => {
  return (
    <Container maxWidth="sm" className="error-container">
      <Box className="error-box">
        <Typography variant="h1" component="h1" className="error-title">
          404
        </Typography>
        <Typography variant="h4" component="h2" gutterBottom className="error-subtitle">
          Página no encontrada
        </Typography>
        <Typography variant="body1" color="text.secondary" className="error-description">
          La página que buscas no existe. Por favor, regresa al inicio o navega a través del menú.
        </Typography>
        <Button component={Link} to="/" variant="contained" color="primary" className="error-button">
          Ir al inicio
        </Button>
      </Box>
    </Container>
  );
};

export default ErrorPage;
