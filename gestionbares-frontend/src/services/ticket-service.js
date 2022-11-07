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
