import axios from "axios";
import Swal from "sweetalert2";
const baseUrl = process.env.REACT_APP_BASE_URL;

export async function createProducto(data) {
  try {
    const response = await axios({
      url: `${baseUrl}/productos/${data.categoria}`,
      method: "POST",
      data: data,
    });
    Swal.fire({
      title: "Hecho!",
      text: "El producto se creó correctamente",
      icon: "success",
      confirmButtonText: "Cerrar",
    }).then((result) => {
      if (result.isConfirmed) {
        window.location = "/productos";
      }
    });
    return response.data;
  } catch (err) {
    Swal.fire({
      title: "Error!",
      text: "No se pudo crear el producto",
      icon: "error",
      confirmButtonText: "Cerrar",
    });
  }
  return [];
}

export async function editProducto(id, producto) {
  try {
    const response = await axios({
      url: `${baseUrl}/productos/${id}/${producto.categoria}`,
      method: "PUT",
      data: producto,
    });
    Swal.fire({
      title: "Hecho!",
      text: "El producto ha sido editado correctamente",
      icon: "success",
      confirmButtonText: "Regresar",
      timer: 1000,
    }).then((result) => {
      window.location = "/productos";
    });
    return response;
  } catch (err) {
    console.error(err);
    Swal.fire({
      title: "Error!",
      text: "Error al editar el productos, corrobore los datos son correctos y vuelva a intentarlo",
      icon: "error",
      confirmButtonText: "Ok",
    });
  }
}

export async function getProductos(pag) {
  try {
    const response = await axios({
      url: `${baseUrl}/productos/${pag}`,
      method: "GET",
    });
    return response.data;
  } catch (err) {
    console.error(err);
  }
  return [];
}

export async function getProductoById(id) {
  try {
    const response = await axios({
      url: `${baseUrl}/productos/get/${id}`,
      method: "GET",
    });
    return response.data;
  } catch (err) {
    console.error(err);
  }
  return [];
}

export async function deleteProducto(id) {
  try {
    const response = await axios({
      url: `${baseUrl}/productos/${id}`,
      method: "DELETE",
    });
    Swal.fire({
      title: "Hecho!",
      text: "El producto se ha borrado correctamente, presioné Cerrar para actualizar",
      icon: "success",
      confirmButtonText: "Cerrar",
    }).then((result) => {
      if (result.isConfirmed) {
        window.location = window.location.href;
      }
    });
    return response;
  } catch (err) {
    console.error(err);
    Swal.fire({
      title: "Error!",
      text: "Error inesperado, asegurese que el producto ya no fue borrado",
      icon: "error",
      confirmButtonText: "Cerrar",
    });
  }
  return [];
}

