/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useEffect } from 'react';


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


  const login = (credenciales) => {
    if (credenciales.usuario === 'gerente' && credenciales.password === '1234') {
      const datosGerencia = {
        nombre: credenciales.nombreIngresado || 'Gerencia',
        sector: 'Gerencia',
        correo: 'gerencia@empresa.com'
      };
      setAuth({ usuario: datosGerencia, estaLogeado: true });
      return true;
    }

    if (credenciales.usuario === 'soporte' && credenciales.password === '1234') {
      const datosSoporte = {
        nombre: credenciales.nombreIngresado || 'Soporte',
        sector: 'Soporte',
        correo: 'soporte@empresa.com'
      };
      setAuth({ usuario: datosSoporte, estaLogeado: true });
      return true;
    }

    return false;
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