import React from "react";
import { Document, Page, Text, View } from "@react-pdf/renderer";

const CrearPDF = ({ ticket }) => {
	const styles = {
		page: { flexDirection: "column", padding: 25 },
		table: {
			fontSize: 15,
			width: 400,
			display: "flex",
			flexDirection: "column",
			justifyContent: "flex-start",
			alignContent: "stretch",
			flexWrap: "nowrap",
			alignItems: "stretch",
		},
		row: {
			display: "flex",
			flexDirection: "row",
			justifyContent: "center",
			alignContent: "stretch",
			flexWrap: "nowrap",
			alignItems: "stretch",
			flexGrow: 0,
			flexShrink: 0,
			flexBasis: 35,
		},
		cell: {
		
			flexGrow: 1,
			flexShrink: 1,
			flexBasis: "auto",
			alignSelf: "stretch",
		},
		header: {
			backgroundColor: "white",
		},
		headerText: {
			fontSize: 15,
			fontWeight: 400,
			color: "black",
			margin: 8,
		},
		tableText: {
			margin: 1,
			fontSize: 1,
			color: "#1a245c",
		},
	};

	return (
		<Document>
			<Page style={[styles.page]} wrap>
				<View
					style={{
						display: "flex",
						flexDirection: "column",
						justifyContent: "center",
						alignItems: "stretch",
						backgroundColor: "white",
						padding: 10,
					}}
				>
					<Text style={{ fontSize: "18px" }}>{ticket.nombreBar}</Text>
					<Text style={{ fontSize: "18px" }}>
						Nro mesa: {ticket?.mesa?.nroMesa}
					</Text>
					<Text style={{ fontSize: "18px" }}>
						Fecha: {ticket.fechaCreacion}
					</Text>
					<Text style={{ fontSize: "18px" }}>
						Nro Ticket: {ticket.nroTicket}
					</Text>

					<Text style={{ fontSize: "18px" }}>Mozo: {ticket?.mozo?.nombre}</Text>
					<View style={[styles.table]}>
						<View style={[styles.row, styles.header]}>
							<Text style={[styles.headerText, styles.cell]}>Detalle</Text>
							<Text style={[styles.headerText, styles.cell]}>Cantidad</Text>
							<Text style={[styles.headerText, styles.cell]}>
								Precio unitario
							</Text>
							<Text style={[styles.headerText, styles.cell]}>Importe</Text>
						</View>
						{ticket?.ticketProductosDto?.map((ticketProducto) => (
							<View>
								<View style={[styles.row]}>
									<Text style={[styles.cell]}>
										{ticketProducto.nombreProducto}
									</Text>
									<Text style={[styles.cell]}>{ticketProducto.cantidad}</Text>
									<Text style={[styles.cell]}>
										{ticketProducto.precioProducto}
									</Text>
									<Text style={[styles.cell]}>
										{ticketProducto.precioProducto * ticketProducto.cantidad}
									</Text>
								</View>
							</View>
						))}
						,
					</View>
					<Text style={{ fontSize: "18px" }}>
						Metodo de pago: {ticket.metodoDePago}
					</Text>
					<Text style={{ fontSize: "18px" }}>
						Importe total: {ticket.importeTotal}
					</Text>
					<Text style={{ fontSize: "18px" }}>
						Descuento: {ticket.descuento}
					</Text>
					<Text style={{ fontSize: "18px" }}>
						Importe final: {ticket.importeFinal}
					</Text>
				</View>
			</Page>
		</Document>
	);
};

export default CrearPDF;
