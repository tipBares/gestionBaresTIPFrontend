import * as React from "react";
import { useState, useEffect } from "react";
import {
	deleteTicket,
	getTicket,
	getTicketByDate,
} from "../../services/ticket-service";
import IconButton from "@mui/material/IconButton";
import {
	SvgComponentEliminar,
	SvgComponentEditar,
	SvgComponentAgregar,
} from "../../icons/abm";
import Swal from "sweetalert2";
import { TableHeaderCell } from "semantic-ui-react";
import { useForm } from "react-hook-form";
//tabla basica
import Pagination from "@mui/material/Pagination";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { Box, Stack, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

export default function HistorialTickets() {
	const navigate = useNavigate();
	const [tickets, setTickets] = useState([]);
	const [ticketsInfo, setTicketsInfo] = useState();
	const [fecha, setFecha] = useState();

	useEffect(() => {
		getData();
	}, []);

	const getData = async () => {
		const ticketsDisponibles = await getTicket(0);
		setTicketsInfo(ticketsDisponibles);
		setTickets(ticketsDisponibles.content);
		console.log(ticketsDisponibles);
	};

	const handleChange = async (event, value) => {
		console.log("value: ", value);
		const ticketsDisponibles = await getTicket(value - 1);
		setTicketsInfo(ticketsDisponibles);
		setTickets(ticketsDisponibles.content);
	};

	const handleBuscarFecha = async (event) => {
		function formatDate(date) {
			var d = new Date(date),
				month = "" + (d.getMonth() + 1),
				day = "" + d.getDate(),
				year = d.getFullYear();

			if (month.length < 2) month = "0" + month;
			if (day.length < 2) day = "0" + day;

			return [year, month, day].join("-");
		}
		const fechaFormateada = formatDate(event);
		if (event) {
			setFecha(event);
			const ticketsDisponibles = await getTicketByDate(fechaFormateada, 0);
			setTicketsInfo(ticketsDisponibles);
			setTickets(ticketsDisponibles.content);
		} else {
			setFecha(null);
			const ticketsDisponibles = await getTicket(0);
			setTicketsInfo(ticketsDisponibles);
			setTickets(ticketsDisponibles.content);
		}
	};

	return (
		<Stack alignItems={"center"}>
			<Box height={"auto"} width={"auto"}>
				<Grid container>
					<Grid item xs={6}>
						<Grid item xs={6}></Grid>
						<div>
							<LocalizationProvider dateAdapter={AdapterDayjs}>
								<DatePicker
									label="Basic example"
									value={fecha}
									onChange={handleBuscarFecha}
									renderInput={(params) => <TextField {...params} />}
								/>
							</LocalizationProvider>
						</div>
						<TableContainer
							style={{ width: "1300px", marginTop: "45px" }}
							component={Paper}
						>
							<Table aria-label="simple table">
								<TableHead>
									<TableRow>
										<TableCell className="celda">
											<h5>ID</h5>
										</TableCell>
										<TableCell className="celda">
											<h5>Nro MESA</h5>
										</TableCell>
										<TableCell className="celda">
											<h5>FECHA</h5>
										</TableCell>
										<TableCell className="celda">
											<h5>MOZO</h5>
										</TableCell>
										<TableCell className="celda">
											<h5>METODO DE PAGO</h5>
										</TableCell>
										<TableCell className="celda">
											<h5>IMPORTE</h5>
										</TableCell>
										<TableCell className="celda">
											<h5>DESCUENTO</h5>
										</TableCell>
										<TableCell className="celda">
											<h5>IMPORTE FINAL</h5>
										</TableCell>
										<TableCell className="acciones">
											<h5>ACCIONES</h5>
										</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{tickets?.map((ticket) => (
										<TableRow
											key={ticket.id}
											sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
										>
											<TableCell
												sx={{ fontSize: "15px" }}
												align="left"
												component="th"
												scope="row"
											>
												{ticket.id}
											</TableCell>
											<TableCell sx={{ fontSize: "15px" }} align="left">
												{ticket.nroMesa}
											</TableCell>
											<TableCell sx={{ fontSize: "15px" }} align="left">
												{ticket.fechaCreacion}
											</TableCell>
											<TableCell sx={{ fontSize: "15px" }} align="left">
												{ticket.mozo}
											</TableCell>
											<TableCell sx={{ fontSize: "15px" }} align="left">
												{ticket.metodoPago}
											</TableCell>
											<TableCell sx={{ fontSize: "15px" }} align="left">
												{ticket.importe}
											</TableCell>
											<TableCell sx={{ fontSize: "15px" }} align="left">
												{ticket.descuento}
											</TableCell>
											<TableCell sx={{ fontSize: "15px" }} align="left">
												{ticket.importeFinal}
											</TableCell>
											<TableHeaderCell>
												{buttonEdit(ticket, navigate)}
												{buttonDelete(ticket)}
											</TableHeaderCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</TableContainer>
					</Grid>
				</Grid>
				<Pagination
					onChange={handleChange}
					shape="rounded"
					count={ticketsInfo?.totalPages}
					size="small"
				/>
			</Box>
		</Stack>
	);
}

function buttonDelete(ticket) {
	let button = (
		<IconButton onClick={() => deleteTicketA(ticket.id)}>
			<SvgComponentEliminar />
		</IconButton>
	);

	return button;
}

function deleteTicketA(id) {
	return Swal.fire({
		title: "Atencion!",
		text: "Está a punto de eliminar el ticket de la base de datos",
		icon: "warning",
		showCancelButton: true,
		cancelButtonColor: "blue",
		cancelButtonText: "Cancelar",
		confirmButtonColor: "red",
		confirmButtonText: "Confirmar",
	}).then((result) => {
		if (result.isConfirmed) {
			deleteTicket(id);
		}
	});
}

function buttonEdit(ticket, navigate) {
	let buttoon = (
		<IconButton onClick={() => editarTicket(ticket.id, navigate)}>
			<SvgComponentEditar />
		</IconButton>
	);
	return buttoon;
}

function editarTicket(id, navigate) {
	return Swal.fire({
		title: "Atencion!",
		text: "Está a punto de editar el ticket de la base de datos",
		icon: "warning",
		showCancelButton: true,
		cancelButtonColor: "blue",
		cancelButtonText: "Cancelar",
		confirmButtonColor: "red",
		confirmButtonText: "Confirmar",
	}).then((result) => {
		if (result.isConfirmed) {
			let url = `/editarTicket/${id}`;
			return navigate(url);
		}
	});
}