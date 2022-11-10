import axios from "axios";
import Swal from "sweetalert2";
const baseUrl = process.env.REACT_APP_BASE_URL;

export async function getCategoriasAll() {
  try {
    const response = await axios({
      url: `${baseUrl}/categorias`,
      method: "GET",
    });
    return response.data;
  } catch (err) {
    console.error(err);
  }
  return [];
}

export async function getCategorias(pag) {
  try {
    const response = await axios({
      url: `${baseUrl}/categorias/paginas/${pag}`,
      method: "GET",
    });
    return response.data;
  } catch (err) {
    console.error(err);
  }
  return [];
}

export async function getCategoriaById(id) {
  try {
    const response = await axios({
      url: `${baseUrl}/categorias/${id}`,
      method: "GET",
    });
    return response.data;
  } catch (err) {
    console.error(err);
  }
  return [];
}

export async function createCategoria(data) {
  try {
    const response = await axios({
      url: `${baseUrl}/categorias`,
      method: "POST",
      data: data,
    });
    Swal.fire({
      title: "Hecho!",
      text: "La categoria se creó correctamente",
      icon: "success",
      confirmButtonText: "Cerrar",
      timer: 1000,
    }).then((result) => {
      window.location = "/categorias";
    });
    return response.data;
  } catch (err) {
    Swal.fire({
      title: "Error!",
      text: "No se pudo crear la categoria porque ya existe una categoria con ese nombre",
      icon: "error",
      confirmButtonText: "Cerrar",
    });
  }
  return [];
}

export async function deleteCategoria(id) {
  try {
    const response = await axios({
      url: `${baseUrl}/categorias/${id}`,
      method: "DELETE",
    });
    Swal.fire({
      title: "Hecho!",
      text: "La categoria se ha borrado correctamente, presioné Cerrar para actualizar",
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
      text: "Error inesperado, asegurese que la categoria ya no fue borrada",
      icon: "error",
      confirmButtonText: "Cerrar",
    });
  }
  return [];
}

export async function editCategoria(id, categoria) {
  try {
    const response = await axios({
      url: `${baseUrl}/categorias/${id}`,
      method: "PUT",
      data: categoria,
    });
    Swal.fire({
      title: "Hecho!",
      text: "La categoria ha sido editada correctamente",
      icon: "success",
      confirmButtonText: "Regresar",
      timer: 1000,
    }).then((result) => {
      window.location = "/categorias";
    });
    return response;
  } catch (err) {
    console.error(err);
    Swal.fire({
      title: "Error!",
      text: "Error al editar la categoria, corrobore los datos(el nombre debe ser único) y vuelva a intentarlo",
      icon: "error",
      confirmButtonText: "Ok",
    });
  }
}
