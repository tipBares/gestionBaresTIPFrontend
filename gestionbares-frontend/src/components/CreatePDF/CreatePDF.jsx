import React from "react";
import { Document, Page, Text, View } from "@react-pdf/renderer";

 const CrearPDF = () => {
    const lorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.";
    return (
      <Document>
        <Page
          size="A4"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "white",
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "white",
              padding: 10,
            }}
          >
            <Text style={{ color: "#3388af", fontSize: "42px" }}>
             Nro Ticket: Hola ticket
            </Text>
            <Text>Id Ticket Hola Enzo</Text>
            
            <Text
              style={{
                color: "gray",
                fontStyle: "italic",
                fontSize: "10px",
              }}
            >
              {lorem}
            </Text>
  
            {/* <Text style={{ textAlign: "justify", marginTop: "22px" }}>
              {ticket ? ticket.mozo.nombre : null}
            </Text> */}
          </View>
        </Page>
      </Document>
    );
  };

  export default CrearPDF;