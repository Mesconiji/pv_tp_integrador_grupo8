/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useEffect } from 'react';
import autorizacionesService from '../services/autorizacionesService';


export const UsuarioContext = createContext();


export const UsuarioProvider = ({ children }) => {
  
  
  const [auth, setAuth] = useState(() => {
    const authGuardado = localStorage.getItem('auth');
    if (authGuardado) {
      return JSON.parse(authGuardado);
    }
    return { usuario: null, estaLogeado: false };
  });


  useEffect(() => {
    localStorage.setItem('auth', JSON.stringify(auth));
  }, [auth]);


  const login = async (credenciales) => {
    try {
      const perfil = await autorizacionesService.login(credenciales);
      setAuth({ usuario: perfil, estaLogeado: true });
      return { exito: true, mensaje: '' };
    } catch (error) {
      return { exito: false, mensaje: error.message };
    }
  };


  const logout = () => {
    setAuth({ usuario: null, estaLogeado: false });
  };


  const actualizarPerfil = (nuevosDatos) => {
    setAuth({ ...auth, usuario: { ...auth.usuario, ...nuevosDatos } });
  };

  return (
    <UsuarioContext.Provider value={{ auth, login, logout, actualizarPerfil }}>
      {children}
    </UsuarioContext.Provider>
  );
};