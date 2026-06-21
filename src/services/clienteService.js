const URL_BASE = 'https://fakestoreapi.com/users';
const STORAGE_CLIENTES = 'clientes_lista';

const clienteService = (() => {

  let clientes = [];

  const cargarDesdeStorage = () => {
    try {
      const almacenados = localStorage.getItem(STORAGE_CLIENTES);
      if (almacenados) {
        clientes = JSON.parse(almacenados);
        return true;
      }
    } catch {
      /* ignore */
    }
    return false;
  };


  const guardarEnStorage = () => {
    try {
      localStorage.setItem(STORAGE_CLIENTES, JSON.stringify(clientes));
    } catch {
      /* ignore */
    }
  };


  const inicializar = async () => {
    if (clientes.length > 0) return;
    if (cargarDesdeStorage()) return;

    try {
      const respuesta = await fetch(URL_BASE);
      if (!respuesta.ok) throw new Error('Error al obtener clientes');
      const data = await respuesta.json();
      clientes = data.map((cliente) => ({ ...cliente, visible: true }));
      guardarEnStorage();
    } catch (error) {
      console.error(error);
      clientes = [];
    }
  };

  const obtenerClientes = async () => {
    await inicializar();
    return clientes
      .filter((cliente) => cliente.visible !== false)
      .map((cliente) => ({ ...cliente }));
  };

  const obtenerClientePorId = async (id) => {
    await inicializar();
    const cliente = clientes.find(
      (c) => String(c.id) === String(id) && c.visible !== false
    );
    return cliente ? { ...cliente } : null;
  };

  const eliminarCliente = async (id) => {
    await inicializar();
    const cliente = clientes.find((c) => String(c.id) === String(id));
    if (cliente) {
      cliente.visible = false;
      guardarEnStorage();
      return cliente;
    }
    return null;
  };

  return {
    obtenerClientes,
    obtenerClientePorId,
    eliminarCliente,
  };

})();

export default clienteService;
