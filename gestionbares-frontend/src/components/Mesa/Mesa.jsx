import * as React from "react";
import { useState, useEffect, useRef } from "react";
import { getMesas } from "../../services/mesa-service";
import TableBarTwoToneIcon from "@mui/icons-material/TableBarTwoTone";
import { green } from "@mui/material/colors";
import { renderToStaticMarkup } from "react-dom/server";
import { divIcon } from "leaflet";
import { Marker, Popup } from "react-leaflet";
//import "./Mesa.scss";

export default function ListMesas() {
  const [mesas, setMesas] = useState([]);
  const [open, setOpen] = useState(false);
  const [icon, setIcon] = useState([]);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const ref = useRef();
  const toggleTooltip = () => ref.current.toggle();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const response = await getMesas();
    setMesas(response);
    console.log(mesas);
  };

  // const markers = <Marker icon={iconMesa}></Marker>;

  // const iconMesa = (
  //   <div>
  //     <TableBarTwoToneIcon sx={{ fontSize: 130, color: green[500] }}>
  //
  //     </TableBarTwoToneIcon>
  //   </div>
  // );

  // const customMesaIcon = divIcon({
  //   html: iconMesa,
  //   className: "dummy",
  // });
  // const popup = (

  // );

  return (
    <div>
      <TableBarTwoToneIcon sx={{ fontSize: 130, color: green[500] }} />
    </div>
  );
}
