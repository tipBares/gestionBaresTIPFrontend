//import React from "react";
import * as React from "react";
import { useState, useEffect } from "react";
import { getMozos } from "../../services/mozo-service";
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
import { Box, Stack } from "@mui/material";

export default function ListMozos() {
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
      <TableContainer
        style={{ width: "500px", marginTop: "45px" }}
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
              <TableCell className="acciones">
                <h5>ACCIONES</h5>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {mozos.map((mozo) => (
              <TableRow
                key={mozo.nombre}
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
                <IconButton>
                  <SvgComponentEditar />
                </IconButton>
                <IconButton>
                  <SvgComponentEliminar />
                </IconButton>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  );
}
