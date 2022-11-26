import * as React from "react";
import { useState, useEffect } from "react";
import {
  deleteCategoria,
  getCategorias,
} from "../../services/categoria-service";
import IconButton from "@mui/material/IconButton";
import "./Categoria.scss";
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
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { TableHeaderCell } from "semantic-ui-react";
import Pagination from "@mui/material/Pagination";
import Grid from "@mui/material/Grid";

export default function Categorias() {
  const navigate = useNavigate();
  const [categorias, setCategorias] = useState([]);
  const [categoriasInfo, setCategoriasInfo] = useState();

  useEffect(() => {
    const getData = async () => {
      const categoriasDisponibles = await getCategorias(0);
      setCategorias(categoriasDisponibles.content);
      setCategoriasInfo(categoriasDisponibles);
      console.log(categoriasDisponibles);
    };
    getData();
  }, []);

  const handleChange = async (event, value) => {
    console.log(value, "Soy el valor");
    const categoriasDisponibles = await getCategorias(value - 1);
    setCategorias(categoriasDisponibles.content);
    setCategoriasInfo(categoriasDisponibles);
  };

  return (
    <Stack alignItems={"center"}>
      <Box>
        <Grid container>
          <Grid item xs={6}>
            <Grid item xs={6}>
              <Button
                onClick={() => navigate("/agregarCategoria")}
                sx={{
                  mt: "20px",
                  mb: "1px",
                  mr: "-120px",
                  left: "-9px",
                  width: "200px",
                  borderRadius: "30px",
                }}
                component={Paper}
              >
                <h5 className="p2">CREAR CATEGORIA</h5>
                <div>
                  <SvgComponentAgregar />
                </div>
              </Button>
            </Grid>
            <TableContainer
              style={{ width: "350px", marginTop: "25px" }}
              component={Paper}
            >
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell className="celda">
                      <h5>NOMBRE</h5>
                    </TableCell>
                    <TableCell className="acciones">
                      <h5>ACCIONES</h5>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {categorias.map((categoria) => (
                    <TableRow
                      key={categoria.nombre}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell
                        sx={{ fontSize: "15px" }}
                        align="left"
                        component="th"
                        scope="row"
                      >
                        {categoria.nombre}
                      </TableCell>
                      <TableHeaderCell sx={{ left: "10px" }}>
                        {buttonEdit(categoria, navigate)}
                        {buttonDelete(categoria)}
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
        count={categoriasInfo?.totalPages}
      />
    </Stack>
  );
}

function buttonDelete(categoria) {
  let buttoon = (
    <IconButton onClick={() => borrarCategoria(categoria.id)}>
      <SvgComponentEliminar />
    </IconButton>
  );

  return buttoon;
}

function borrarCategoria(id) {
  return Swal.fire({
    title: "Atencion!",
    text: "Está a punto de eliminar la categoria de la base de datos",
    icon: "warning",
    showCancelButton: true,
    cancelButtonColor: "blue",
    cancelButtonText: "Cancelar",
    confirmButtonColor: "red",
    confirmButtonText: "Confirmar",
  }).then((result) => {
    if (result.isConfirmed) {
      deleteCategoria(id);
    }
  });
}

function buttonEdit(categoria, navigate) {
  let buttoon = (
    <IconButton onClick={() => editarCategoria(categoria.id, navigate)}>
      <SvgComponentEditar />
    </IconButton>
  );
  return buttoon;
}

function editarCategoria(id, navigate) {
  return Swal.fire({
    title: "Atencion!",
    text: "Está a punto de editar la categoria de la base de datos",
    icon: "warning",
    showCancelButton: true,
    cancelButtonColor: "blue",
    cancelButtonText: "Cancelar",
    confirmButtonColor: "red",
    confirmButtonText: "Confirmar",
  }).then((result) => {
    if (result.isConfirmed) {
      console.log(id);
      let url = `/editarCategoria/${id}`;

      return navigate(url);
    }
  });
}
