import axios from "axios";
import Swal from "sweetalert2";
const baseUrl = process.env.REACT_APP_BASE_URL;

export async function getTicket(pag) {
  try {
    const response = await axios({
      url: `${baseUrl}/tickets/${pag}`,
      method: "GET",
    });
    return response.data;
  } catch (err) {
    console.error(err);
  }
  return [];
}

export async function getTicketByDate(date, pag) {
  try {
    const response = await axios({
      url: `${baseUrl}/tickets/${date}/${pag}`,
      method: "GET",
    });
    return response.data;
  } catch (err) {
    console.error(err);
  }
  return [];
}

export async function deleteTicket(id) {
  try {
    const response = await axios({
      url: `${baseUrl}/tickets/${id}`,
      method: "DELETE",
    });
    Swal.fire({
      title: "Hecho!",
      text: "El ticket se ha borrado correctamente, presioné Cerrar para actualizar",
      icon: "success",
      timer: 1000,

      confirmButtonText: "Cerrar",
    }).then((result) => {
      window.location = window.location.href;
    });
    return response;
  } catch (err) {
    console.error(err);
    Swal.fire({
      title: "Error!",
      text: "Error inesperado, asegurese que el ticket ya no fue borrado",
      icon: "error",
      confirmButtonText: "Cerrar",
    });
  }
  return [];
}

export async function editTicket(id, ticket) {
  try {
    const response = await axios({
      url: `${baseUrl}/tickets/${id}`,
      method: "PUT",
      data: ticket,
    });
    Swal.fire({
      title: "Hecho!",
      text: "El ticket ha sido editado correctamente",
      icon: "success",
      confirmButtonText: "Regresar",
      timer: 1000,
    }).then((result) => {
      window.location = "/historialTickets";
    });
    return response;
  } catch (err) {
    console.error(err);
    Swal.fire({
      title: "Error!",
      text: "Error al editar el ticket, corrobore los datos son correctos y vuelva a intentarlo",
      icon: "error",
      confirmButtonText: "Ok",
    });
  }
}
export async function createTicketProducto(data) {
  try {
    const response = await axios({
      url: `${baseUrl}/tickets/productos`,
      method: "POST",
      data: data,
    });
    Swal.fire({
      title: "Hecho!",
      text: "El producto se agregó correctamente",
      icon: "success",
      timer: 1000,
      confirmButtonText: "Cerrar",
    });
    return response.data;
  } catch (err) {
    Swal.fire({
      title: "Error!",
      text: "No se pudo agregar el producto",
      icon: "error",
      confirmButtonText: "Cerrar",
    });
  }
  return [];
}

export async function createTicket(data) {
  const response = await axios({
    url: `${baseUrl}/tickets/${data.idMesa}`,
    method: "POST",
    data: data,
  });
  return response.data;
}

export async function getTicketById(id) {
  if (id) {
    try {
      const response = await axios({
        url: `${baseUrl}/tickets/byId/${id}`,
        method: "GET",
      });
      return response.data;
    } catch (err) {
      console.error(err);
    }
    return {};
  } else {
    return {};
  }
}

export async function updateMozoInTicket(id, idMozo) {
  try {
    const response = await axios({
      url: `${baseUrl}/tickets/${id}/mozos/${idMozo}`,
      method: "PUT",
    });

    return response;
  } catch (err) {
    console.error(err);
  }
}

export async function updateMetodoDePago(id, metodoDePago) {
  try {
    const response = await axios({
      url: `${baseUrl}/tickets/${id}/metodoDePago/?metodoDePago=${metodoDePago}`,
      method: "PUT",
    });

    return response;
  } catch (err) {
    console.error(err);
  }
}

export async function updateMesa(idTicket, idMesa) {
  try {
    const response = await axios({
      url: `${baseUrl}/tickets/${idTicket}/mesas/${idMesa}`,
      method: "PUT",
    });
    Swal.fire({
      title: "Hecho!",
      text: "La mesa se cambió correctamente, presioné Cerrar para actualizar",
      icon: "success",
      timer: 1000,
      confirmButtonText: "Cerrar",
    }).then((result) => {
      // /window.location = window.location.href;
    });
    return response;
  } catch (err) {
    console.error(err);
  }
}

export async function applyDiscount(id, porcentaje) {
  try {
    const response = await axios({
      url: `${baseUrl}/tickets/${id}/descuento/${porcentaje}`,
      method: "PUT",
    });

    return response;
  } catch (err) {
    console.error(err);
  }
}

export async function generarImporteTotal(id) {
  try {
    const response = await axios({
      url: `${baseUrl}/tickets/sumImporteTotal/${id}`,
      method: "PUT",
    });

    return response;
  } catch (err) {
    console.error(err);
  }
}

export async function deleteTicketProducto(idTicket, idProducto) {
  try {
    const response = await axios({
      url: `${baseUrl}/tickets/${idTicket}/productos/${idProducto}`,
      method: "DELETE",
    });
    Swal.fire({
      title: "Hecho!",
      text: "El producto se ha borrado correctamente, presioné Cerrar para actualizar",
      icon: "success",
      timer: 1000,
      confirmButtonText: "Cerrar",
    }).then((result) => {
      window.location = window.location.href;
    });
    return response;
  } catch (err) {
    console.error(err);
  }
}

export async function guardarTicket(idTicket) {
  try {
    const response = await axios({
      url: `${baseUrl}/tickets/historico/${idTicket}`,
      method: "PUT",
    });
    Swal.fire({
      title: "Hecho!",
      text: "El ticket se guardó correctamente, presioné Cerrar para actualizar",
      icon: "success",
      timer: 1000,
      confirmButtonText: "Cerrar",
    }).then((result) => {
      window.location = "/";
    });
    return response;
  } catch (err) {
    console.error(err);
  }
}

export async function cancelarTicket(idTicket, idMesa) {
  try {
    const response = await axios({
      url: `${baseUrl}/tickets/cancelar/${idTicket}/mesas/${idMesa}`,
      method: "PUT",
    });
    Swal.fire({
      title: "Hecho!",
      text: "El ticket se canceló correctamente, presioné Cerrar para actualizar",
      icon: "success",
      timer: 2000,
      confirmButtonText: "Cerrar",
    }).then((result) => {
      window.location = "/";
    });
    return response;
  } catch (err) {
    console.error(err);
  }
}
