import { TextField } from '@mui/material';
import '../css/indexstyle.css';

const BuscadorClientes = ({ valor, onBuscar }) => {
  return (
    <TextField
      className="buscador-clientes"
      label="Buscar por apellido o ciudad"
      variant="outlined"
      fullWidth
      value={valor}
      onChange={({ target: { value } }) => onBuscar(value)}
    />
  );
};

export default BuscadorClientes;