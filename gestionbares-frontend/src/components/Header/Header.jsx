import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

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
      <Grid container spacing={1}>
        <AppBar style={{ background: "#2E3B55" }} position="static">
          <Toolbar>
            <Grid item xs={2} md={4} lg={6} xl={8}>
              <Button style={{ margin: "30px 60px " }} color="inherit">
                Menú
              </Button>
            </Grid>
            <Grid item xs={2} md={4} lg={6} xl={8}>
              <Button
                href="/mozos"
                style={{ margin: "30px 60px " }}
                color="inherit"
              >
                Mozos
              </Button>
            </Grid>
            <Grid item xs={2} md={4} lg={6} xl={8}>
              <Button style={{ margin: "30px 80px " }} color="inherit">
                Historial Tickets
              </Button>
            </Grid>
            <Grid item xs={2} md={4} lg={6} xl={8}>
              <Button
                href="/"
                style={{ margin: "30px 110px " }}
                color="inherit"
              >
                Salón
              </Button>
            </Grid>
          </Toolbar>
        </AppBar>
      </Grid>
    </Box>
  );
}
