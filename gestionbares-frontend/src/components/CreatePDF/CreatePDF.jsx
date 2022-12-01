import React from "react";
import { Document, Page, Text, View } from "@react-pdf/renderer";

const CrearPDF = ({ ticket }) => {
  function padTo2Digits(num) {
    return num.toString().padStart(2, "0");
  }

  function format(date) {
    if (date) {
      date = new Date(date);
      return (
        [
          padTo2Digits(date.getDate()),
          padTo2Digits(date.getMonth() + 1),
          date.getFullYear(),
        ].join("-") +
        " " +
        [
          padTo2Digits(date.getHours()),
          padTo2Digits(date.getMinutes()),
          padTo2Digits(date.getSeconds()),
        ].join(":")
      );
    }
    return "";
  }

  ticket.fechaCreacionFormateada = format(ticket.fechaCreacion);

  const styles = {
    page: { flexDirection: "column", padding: 25, size: "C10" },
    table: {
      fontSize: 15,
      width: 500,
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
      fontSize: 16,
      fontWeight: 0,
      color: "black",
      margin: 0,
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
          <Text
            style={{ fontSize: "20px", textAlign: "center", lineHeight: 2 }}
          >
            {ticket.nombreBar}
          </Text>
          <Text style={{ fontSize: "18px", lineHeight: 1.5 }}>
            Nro mesa: {ticket?.mesa?.nroMesa}
          </Text>
          <Text style={{ fontSize: "18px", lineHeight: 1.5 }}>
            Fecha: {ticket.fechaCreacionFormateada}
          </Text>
          <Text style={{ fontSize: "18px", lineHeight: 1.5 }}>
            Nro Ticket: {ticket.nroTicket}
          </Text>

          <Text style={{ fontSize: "18px", lineHeight: 1.5 }}>
            Mozo: {ticket?.mozo?.nombre}
          </Text>
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
                    ${ticketProducto.precioProducto}
                  </Text>
                  <Text style={[styles.cell]}>
                    ${ticketProducto.precioProducto * ticketProducto.cantidad}
                  </Text>
                </View>
              </View>
            ))}
            ,
          </View>
          <Text style={{ fontSize: "18px", lineHeight: 1.5 }}>
            Metodo de pago: {ticket.metodoDePago}
          </Text>
          <Text style={{ fontSize: "18px", lineHeight: 1.5 }}>
            Importe total:$ {ticket.importeTotal}
          </Text>
          <Text style={{ fontSize: "18px", lineHeight: 1.5 }}>
            Descuento:% {ticket.descuento}
          </Text>
          <Text style={{ fontSize: "18px", lineHeight: 1.5 }}>
            Importe final:$ {ticket.importeFinal}
          </Text>
        </View>
      </Page>
    </Document>
  );
};

export default CrearPDF;
