import * as React from "react";
import { useState, useEffect } from "react";

import { getMesas } from "../../services/mesa-service";
// <a id="myLink" href="#" onclick="MyFunction();return false;">link text</a>

export default function ListMesas() {
  const [mesas, setMesas] = useState([]);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const response = await getMesas();
    setMesas(response);
    console.log(mesas);
  };

  return (
    <div>
      <a id="" href="#" onclick={handleOpen()} return false>
        <img src="C:\Users\Tomas\mesa.png"></img>
      </a>
    </div>
  );
}
