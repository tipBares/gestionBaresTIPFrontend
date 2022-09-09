import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
//import Mozo from "./components/Mozo";

import "./Header.scss";

export default function ButtonAppBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar style={{ background: "#2E3B55" }} position="static">
        <Toolbar>
          <Button style={{ margin: "10px 140px 15px 140px" }} color="inherit">
            Menú
          </Button>
          <Button
            href="/mozos"
            style={{ margin: "10px 140px 15px 140px" }}
            color="inherit"
          >
            Mozos
          </Button>
          <Button style={{ margin: "10px 140px 15px 140px" }} color="inherit">
            Historial Tickets
          </Button>
          <Button
            href="/"
            style={{ margin: "10px 140px 15px 140px" }}
            color="inherit"
          >
            Salón
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
