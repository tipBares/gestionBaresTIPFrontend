import { Button, IconButton, Stack } from "@mui/material";
import * as React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Grid, Popup } from "semantic-ui-react";
import { SvgComponentMesa, SvgComponentMesaEnProceso } from "../../icons/abm";
import { direccionBar, nombreBar } from "../../services/datos-service";
import { getMesas } from "../../services/mesa-service";
import { createTicket } from "../../services/ticket-service";

export default function ListMesas() {
  const navigate = useNavigate();
  const [mesas, setMesas] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const mesasDisponibles = await getMesas();
      setMesas(mesasDisponibles);
    };
    getData();
  }, []);

  return (
    <Grid
      container
      spacing={{ xs: 2, md: 3 }}
      columns={{ xs: 4, sm: 8, md: 12 }}
    >
      {mesas.map((mesa, index) => (
        <div item p={2} xs={2} sm={4} md={4} key={index}>
          <Popup
            content={mesas && mesa && mesa.nroMesa}
            on="click"
            //position="top left"
            trigger={
              mesa.abierta ? (
                <Stack pt={2} spacing={2}>
                  <IconButton>
                    <SvgComponentMesa />
                  </IconButton>
                  {mesa.nroMesa}
                </Stack>
              ) : (
                <Stack pt={2} spacing={2}>
                  <IconButton>
                    <SvgComponentMesaEnProceso />
                  </IconButton>
                  {mesa.nroMesa}
                </Stack>
              )
            }
          >
            <p>numero de mesa: {mesa.nroMesa}</p>

            <Button
              style={{ display: !mesa.abierta ? "block" : "none" }}
              onClick={() => {
                create(mesa.id);
                navigate(`/abrirTicket/${mesa.id}`);
              }}
            >
              generar ticket
            </Button>

            <Button
              style={{ display: mesa.abierta ? "block" : "none" }}
              onClick={() => {
                navigate(`/abrirTicket/${mesa.id}`);
              }}
            >
              ver ticket
            </Button>
          </Popup>
        </div>
      ))}
    </Grid>
  );
}

function create(idMesa) {
  createTicket({ idMesa, nombreBar, direccionBar });
}
