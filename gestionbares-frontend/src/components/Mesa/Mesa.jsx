import * as React from "react";
import { useState, useEffect, useRef } from "react";
import { getMesas } from "../../services/mesa-service";
import TableBarTwoToneIcon from "@mui/icons-material/TableBarTwoTone";
import { green } from "@mui/material/colors";
import { IconButton } from "@mui/material";
import { Popup, Grid } from "semantic-ui-react";
//import "./Mesa.scss";

export default function ListMesas() {
  const [mesas, setMesas] = useState([]);
  const [open, setOpen] = useState(false);
  const [icon, setIcon] = useState([]);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const mesasDisponibles = await getMesas();
    setMesas(mesasDisponibles);
    console.log(mesasDisponibles);
  };

  const PopupExamplePinned = () => (
    <Grid.Column>
      <Popup
        content={mesas && mesas[0] && mesas[0].nroMesa}
        on="click"
        position="top left"
        trigger={
          <IconButton>
            <TableBarTwoToneIcon sx={{ fontSize: 130, color: green[500] }} />
          </IconButton>
        }
      />
    </Grid.Column>
  );

  //<div <div class="ui top left popup transition visible" style="left: auto; right: auto; position: initial;"><div class="content">I will not flip!</div></div></div>
  return <PopupExamplePinned />;
}
