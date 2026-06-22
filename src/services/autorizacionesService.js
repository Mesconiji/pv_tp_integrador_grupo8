const autorizacionesService = (() => {

  const usuariosPorDefecto = {
    gerente: {
      password: '1234',
      usuario: { nombre: 'Jorge', sector: 'Gerencia', correo: 'gerencia@empresa.com' }
    },
    soporte: {
      password: '1234',
      usuario: { nombre: 'Raul', sector: 'Soporte', correo: 'soporte@empresa.com' }
    }
  };

  const login = ({ nombre, password, sector }) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!nombre?.trim() || !password?.trim() || !sector) {
          reject(new Error('Complete todos los campos.'));
          return;
        }

        const registro = Object.values(usuariosPorDefecto).find(
          (u) => u.usuario.sector === sector
        );

        if (!registro) {
          reject(new Error('Sector inválido.'));
          return;
        }

        if (nombre.trim().toLowerCase() !== registro.usuario.nombre.toLowerCase()) {
          reject(new Error(`El nombre "${nombre}" no corresponde al sector ${sector}.`));
          return;
        }

        if (password !== registro.password) {
          reject(new Error('Contraseña incorrecta.'));
          return;
        }

        resolve(registro.usuario);
      }, 800);
    });
  };

  return { login };

})();

export default autorizacionesService;
