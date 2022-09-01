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

  const SvgComponent = (props) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width={64}
      height={64}
      {...props}
    >
      <image
        xlinkHref="data:image/png;base64,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"
        width={48}
        height={48}
        transform="scale(1.33333)"
      />
    </svg>
  );

  const PopupExamplePinned = () => (
    <Grid.Column>
      <Popup
        content={mesas && mesas[0] && mesas[0].nroMesa}
        on="click"
        position="top left"
        trigger={
          <IconButton>
            <SvgComponent />
          </IconButton>
        }
      />
    </Grid.Column>
  );

  return <PopupExamplePinned />;
}
