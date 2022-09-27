//import React from "react";
import * as React from "react";
import { useState, useEffect } from "react";
import { deleteMozo, getMozos } from "../../services/mozo-service";
import IconButton from "@mui/material/IconButton";
import "./Mozo.scss";
import {
  SvgComponentEliminar,
  SvgComponentEditar,
  SvgComponentAgregar,
} from "../../icons/abm";
//tabla basica
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Button, Stack } from "@mui/material";
//import FormMozo from "../FormMozo/FormMozo";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { TableHeaderCell } from "semantic-ui-react";

//pruebo imports para responsive
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";

export default function Mozos() {
  const navigate = useNavigate();

  const [mozos, setMozos] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const mozosDisponibles = await getMozos();
      setMozos(mozosDisponibles);
      console.log(mozosDisponibles);
    };
    getData();
  }, []);

  return (
    <Stack alignItems={"center"}>
      <Box>
        <Grid container>
          <Grid item xs={6}>
            <Grid item xs={6}>
              <Button
                onClick={() => navigate("/agregarMozo")}
                // component={Link}
                // to="/agregarMozo"
                sx={{
                  //height: "45px",
                  mt: "20px",
                  mb: "1px",
                  mr: "-120px",
                  left: "-20px",
                  width: "200px",
                  borderRadius: "30px",
                }}
                component={Paper}
                // sx={{
                //   mt: 1,
                //   mb: 3,
                //   mr: 2,
                //   width: 90,
                //   //height: 65,
                //   padding: -9,
                //   borderRadius: "21px",
                // }}
              >
                <h5
                  className="p2"
                  // style={{
                  //   marginBottom: "50px",
                  //   marginTop: "20px",
                  //   marginRight: "30px",
                  // }}
                >
                  AGREGAR MOZO
                </h5>
                <div>
                  <SvgComponentAgregar />
                </div>
              </Button>
            </Grid>
            <TableContainer
              style={{ width: "500px", marginTop: "25px" }}
              component={Paper}
            >
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell className="celda">
                      <h5>NOMBRE</h5>
                    </TableCell>

                    <TableCell className="celda">
                      <h5>APELLIDO</h5>
                    </TableCell>
                    <TableCell className="celda">
                      <h5>NICK</h5>
                    </TableCell>
                    <TableCell className="acciones">
                      <h5>ACCIONES</h5>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {mozos.map((mozo) => (
                    <TableRow
                      key={mozo.nick}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell
                        sx={{ fontSize: "15px" }}
                        align="left"
                        component="th"
                        scope="row"
                      >
                        {mozo.nombre}
                      </TableCell>

                      <TableCell sx={{ fontSize: "15px" }} align="left">
                        {mozo.apellido}
                      </TableCell>
                      <TableCell sx={{ fontSize: "15px" }} align="left">
                        {mozo.nick}
                      </TableCell>
                      <TableHeaderCell>
                        {/* <IconButton >
                    <SvgComponentEditar />
                  </IconButton> */}
                        {buttonEdit(mozo, navigate)}
                        {buttonDelete(mozo)}
                      </TableHeaderCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </Box>
    </Stack>
  );
}

function buttonDelete(mozo) {
  let buttoon = (
    <IconButton onClick={() => borrarMozo(mozo.id)}>
      <SvgComponentEliminar />
    </IconButton>
  );

  return buttoon;
}

function borrarMozo(id) {
  return Swal.fire({
    title: "Atencion!",
    text: "Está a punto de eliminar el mozo de la base de datos",
    icon: "warning",
    showCancelButton: true,
    cancelButtonColor: "blue",
    cancelButtonText: "Cancelar",
    confirmButtonColor: "red",
    confirmButtonText: "Confirmar",
  }).then((result) => {
    if (result.isConfirmed) {
      deleteMozo(id);
    }
  });
}

function buttonEdit(mozo, navigate) {
  let buttoon = (
    <IconButton onClick={() => editarMozo(mozo.id, navigate)}>
      <SvgComponentEditar />
    </IconButton>
  );
  return buttoon;
}

function editarMozo(id, navigate) {
  return Swal.fire({
    title: "Atencion!",
    text: "Está a punto de editar el mozo de la base de datos",
    icon: "warning",
    showCancelButton: true,
    cancelButtonColor: "blue",
    cancelButtonText: "Cancelar",
    confirmButtonColor: "red",
    confirmButtonText: "Confirmar",
  }).then((result) => {
    if (result.isConfirmed) {
      console.log(id);
      let url = `/editarMozo/${id}`;
      // <Navigate to={url} replace={true} />;
      return navigate(url);
    }
  });
}
