const URL_BASE = 'https://fakestoreapi.com/users';
const STORAGE_CLIENTES = 'clientes_lista';
const STORAGE_ACTIVIDAD = 'actividad_clientes';

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

  const registrarActividad = (mensaje) => {
    const ahora = new Date();
    const fecha =
      ahora.toLocaleDateString('es-AR') +
      ' a las ' +
      ahora.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) +
      ' hs.';
    const actividad = { mensaje, fecha };
    try {
      sessionStorage.setItem(STORAGE_ACTIVIDAD, JSON.stringify(actividad));
    } catch {
      /* ignore */
    }
    return actividad;
  };

  const obtenerActividad = () => {
    try {
      const guardada = sessionStorage.getItem(STORAGE_ACTIVIDAD);
      return guardada ? JSON.parse(guardada) : null;
    } catch {
      return null;
    }
  };


  const inicializar = async () => {
    if (clientes.length > 0) return;
    if (cargarDesdeStorage()) return;

    const respuesta = await fetch(URL_BASE);
    if (!respuesta.ok) throw new Error('Error al obtener clientes');
    const data = await respuesta.json();
    clientes = data.map((cliente) => ({ ...cliente, visible: true }));
    guardarEnStorage();
  };

  const obtenerClientes = async () => {
    await inicializar();
    return clientes
      .filter((cliente) => cliente.visible !== false)
      .map((cliente) => ({ ...cliente }));
  };

  const obtenerClientePorId = async (id) => {
    try {
      await inicializar();
    } catch {
      return null;
    }
    const cliente = clientes.find(
      (c) => String(c.id) === String(id) && c.visible !== false
    );
    return cliente ? { ...cliente } : null;
  };

  const agregarCliente = async (nuevoCliente) => {
    const respuesta = await fetch(URL_BASE, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(nuevoCliente),
    });
    if (!respuesta.ok) throw new Error('Error al crear el cliente');

    const { id } = await respuesta.json();
    await inicializar();

    const idLocal = clientes.some((c) => String(c.id) === String(id))
      ? Date.now()
      : id;
    const creado = { ...nuevoCliente, id: idLocal, visible: true };
    clientes.push(creado);
    guardarEnStorage();

    const { firstname, lastname } = creado.name;
    registrarActividad(`Se dio de alta al cliente: ${firstname} ${lastname}.`);

    return { cliente: creado, idAsignado: id };
  };

  const eliminarCliente = async (id) => {
    await inicializar();

    try {
      const respuesta = await fetch(`${URL_BASE}/${id}`, { method: 'DELETE' });
      if (!respuesta.ok) throw new Error('Error al eliminar el cliente');
    } catch (error) {
      console.error(error);
    }

    const cliente = clientes.find((c) => String(c.id) === String(id));
    if (cliente) {
      cliente.visible = false;
      guardarEnStorage();

      const { firstname, lastname } = cliente.name;
      registrarActividad(`Se dio de baja al cliente: ${firstname} ${lastname}.`);

      return cliente;
    }
    return null;
  };


  const obtenerEstadisticas = async () => {
    try {
      await inicializar();
    } catch {
      return { total: 0, eliminados: 0 };
    }
    const total = clientes.filter((c) => c.visible !== false).length;
    const eliminados = clientes.filter((c) => c.visible === false).length;
    return { total, eliminados };
  };

  
  const restaurarClientes = async () => {
    try {
      const respuesta = await fetch(URL_BASE);
      if (!respuesta.ok) throw new Error('Error al obtener clientes');
      const data = await respuesta.json();
      clientes = data.map((cliente) => ({ ...cliente, visible: true }));
      guardarEnStorage();
    } catch (error) {
      console.error(error);
    }
    return clientes
      .filter((cliente) => cliente.visible !== false)
      .map((cliente) => ({ ...cliente }));
  };

  return {
    obtenerClientes,
    obtenerClientePorId,
    agregarCliente,
    eliminarCliente,
    obtenerEstadisticas,
    restaurarClientes,
    obtenerActividad,
  };

})();

export default clienteService;