import * as React from "react";
import { useState, useEffect, useRef } from "react";
import { getMesas } from "../../services/mesa-service";
import { Button, IconButton, Stack } from "@mui/material";
import { Popup, Grid, Label } from "semantic-ui-react";
import { SvgComponentMesa, SvgComponentMesaEnProceso } from "../../icons/abm";
import { createTicket } from "../../services/ticket-service";
import { nombreBar, direccionBar } from "../../services/datos-service";
import { useNavigate, useParams } from "react-router-dom";
import FormTicket from "../FormTicket/FormTicket";
const gridStyles = {
  marginTop: 222,
};

export default function ListMesas() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [mesas, setMesas] = useState([]);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    const getData = async () => {
      const mesasDisponibles = await getMesas();
      setMesas(mesasDisponibles);
    };
    getData();
  }, []);

  const PopupExamplePinned = () => (
    <div>
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
    </div>
  );

  return <PopupExamplePinned />;
}

function create(idMesa) {
  // console.log(idMesa, nombreBar, direccionBar);
  createTicket({ idMesa, nombreBar, direccionBar });
}
