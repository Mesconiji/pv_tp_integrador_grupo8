import { Alert } from '@mui/material';
import '../css/indexstyle.css';

const RegistroActividad = ({ mensaje, fecha }) => {
  return (
    <Alert severity="info" icon={false} className="registro-actividad">
      {mensaje} ({fecha})
    </Alert>
  );
};

export default RegistroActividad;