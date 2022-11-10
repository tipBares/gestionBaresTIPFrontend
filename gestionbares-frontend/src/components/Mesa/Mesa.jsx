import * as React from "react";
import { useState, useEffect, useRef } from "react";
import { getMesas } from "../../services/mesa-service";
import { Button, IconButton } from "@mui/material";
import { Popup, Grid } from "semantic-ui-react";
import { SvgComponentMesa } from "../../icons/abm";
//import "./Mesa.scss";
import { createTicket } from "../../services/ticket-service";
import { nombreBar, direccionBar } from "../../services/datos-service";
import { useNavigate, useParams } from "react-router-dom";
import FormTicket from "../FormTicket/FormTicket";
const gridStyles = {
  marginTop: 222,
};

export default function ListMesas() {
  const { id } = useParams();
  console.log("id normal" + id);
  const navigate = useNavigate();
  const [mesas, setMesas] = useState([]);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    const getData = async () => {
      const mesasDisponibles = await getMesas();
      setMesas(mesasDisponibles);
      console.log(mesasDisponibles);
    };
    getData();
  }, []);

  const PopupExamplePinned = () => (
    <Grid.Column sx={gridStyles}>
      {mesas.map((mesa) => (
        <Popup
          content={mesas && mesa && mesa.nroMesa}
          on="click"
          position="top left"
          trigger={
            <IconButton>
              <SvgComponentMesa />
            </IconButton>
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
      ))}
    </Grid.Column>
  );

  return <PopupExamplePinned />;
}

function create(idMesa) {
  console.log(idMesa, nombreBar, direccionBar);
  createTicket({ idMesa, nombreBar, direccionBar });
}
