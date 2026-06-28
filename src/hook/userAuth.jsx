import { useContext } from 'react';
import { UsuarioContext } from '../context/UsuarioContext';

const useAuth = () => {
  return useContext(UsuarioContext);
};

export { useAuth };