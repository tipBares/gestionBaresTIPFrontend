import axios from "axios";
import Swal from "sweetalert2";
const baseUrl = process.env.REACT_APP_BASE_URL;

export async function getMozos() {
  try {
    const response = await axios({
      url: `${baseUrl}/Mozo/All`,
      method: "GET",
    });
    return response.data;
  } catch (err) {
    console.error(err);
  }
  return [];
}

export async function createMozo(data) {
  try {
    const response = await axios({
      url: `${baseUrl}/Mozo`,
      method: "POST",
      data: data,
    });
    Swal.fire({
      title: "Hecho!",
      text: "El mozo se creó correctamente",
      icon: "success",
      confirmButtonText: "Cerrar",
      timer: 1000,
    }).then((result) => {
      window.location = "/mozos";
    });
    return response.data;
  } catch (err) {
    Swal.fire({
      title: "Error!",
      text: "No se pudo crear el mozo porque ya existe un mozo con ese nick",
      icon: "error",
      confirmButtonText: "Cerrar",
    });
  }
  return [];
}

export async function deleteMozo(id) {
  try {
    const response = await axios({
      url: `${baseUrl}/Mozo/delete/${id}`,
      method: "DELETE",
    });
    Swal.fire({
      title: "Hecho!",
      text: "El mozo se ha borrado correctamente, presioné Cerrar para actualizar",
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
      text: "Error inesperado, asegurese que el mozo ya no fue borrado",
      icon: "error",
      confirmButtonText: "Cerrar",
    });
  }
  return [];
}

export async function editMozo(id, mozo) {
  try {
    const response = await axios({
      url: `${baseUrl}/Mozo/${id}`,
      method: "PUT",
      data: mozo,
    });
    Swal.fire({
      title: "Hecho!",
      text: "El mozo ha sido editado correctamente",
      icon: "success",
      confirmButtonText: "Regresar",
      timer: 1000,
    }).then((result) => {
      window.location = "/mozos";
    });
    return response;
  } catch (err) {
    console.error(err);
    Swal.fire({
      title: "Error!",
      text: "Error al editar el mozo, corrobore los datos(el nick debe ser único) y vuelva a intentarlo",
      icon: "error",
      confirmButtonText: "Ok",
    });
  }
}

export async function getMozoById(id) {
  try {
    const response = await axios({
      url: `${baseUrl}/Mozo/get/${id}`,
      method: "GET",
    });
    return response.data;
  } catch (err) {
    console.error(err);
  }
  return [];
}
