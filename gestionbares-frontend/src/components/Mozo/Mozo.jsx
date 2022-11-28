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
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Button, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { TableHeaderCell } from "semantic-ui-react";
import Pagination from "@mui/material/Pagination";

import Grid from "@mui/material/Grid";

export default function Mozos() {
  const navigate = useNavigate();

  const [mozos, setMozos] = useState([]);
  const [mozosInfo, setMozosInfo] = useState();

  useEffect(() => {
    const getData = async () => {
      const mozosDisponibles = await getMozos(0);
      setMozos(mozosDisponibles.content);
      setMozosInfo(mozosDisponibles);
    };
    getData();
  }, []);

  const handleChange = async (event, value) => {
    const mozosDisponibles = await getMozos(value - 1);
    setMozos(mozosDisponibles.content);
    setMozosInfo(mozosDisponibles);
  };

  return (
    <Stack alignItems={"center"}>
      <Box>
        <Grid container>
          <Grid item xs={6}>
            <Grid item xs={6}>
              <Button
                onClick={() => navigate("/agregarMozo")}
                sx={{
                  mt: "20px",
                  mb: "1px",
                  mr: "-120px",
                  left: "-20px",
                  width: "200px",
                  borderRadius: "30px",
                }}
                component={Paper}
              >
                <h5 className="p2">AGREGAR MOZO</h5>
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
      <Pagination
        onChange={handleChange}
        shape="rounded"
        count={mozosInfo?.totalPages}
      />
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
      let url = `/editarMozo/${id}`;

      return navigate(url);
    }
  });
}
