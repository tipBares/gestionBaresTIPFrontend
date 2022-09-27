import * as React from "react";
import { useState, useEffect, useRef } from "react";
import { getMesas } from "../../services/mesa-service";
import { IconButton } from "@mui/material";
import { Popup, Grid } from "semantic-ui-react";
import { SvgComponentMesa } from "../../icons/abm";
//import "./Mesa.scss";

export default function ListMesas() {
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
    <Grid.Column>
      <Popup
        content={mesas && mesas[0] && mesas[0].nroMesa}
        on="click"
        position="top left"
        trigger={
          <IconButton>
            <SvgComponentMesa />
          </IconButton>
        }
      />
    </Grid.Column>
  );

  return <PopupExamplePinned />;
}
