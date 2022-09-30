import * as React from "react";
import { useState, useEffect } from "react";
import { getProductos, deleteProducto } from "../../services/producto_service";
import IconButton from "@mui/material/IconButton";
import {
  SvgComponentEliminar,
  SvgComponentEditar,
  SvgComponentAgregar,
} from "../../icons/abm";
import "./ProductoLista.scss";
import Swal from "sweetalert2";
import Buscador from "../BuscadorProducto/Buscador";
import { TableHeaderCell } from "semantic-ui-react";
//tabla basica
import Pagination from "@mui/material/Pagination";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { Box, Button, Stack } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

export default function ProductoLista() {
  const navigate = useNavigate();
  const [productos, setProductos] = useState([]);
  const [productosInfo, setProductosInfo] = useState();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const productosDisponibles = await getProductos(0);
    setProductosInfo(productosDisponibles);
    setProductos(productosDisponibles.content);

    console.log(productosDisponibles);
  };

  const handleChange = async (event, value) => {
    console.log(value, "Soy el valor");
    const productosDisponibles = await getProductos(value - 1);
    setProductosInfo(productosDisponibles);
    setProductos(productosDisponibles.content);
  };

  return (
    <Stack alignItems={"center"}>
      <Box>
        <Grid container>
          <Grid item xs={6}>
            <Grid item xs={6}>
              <Button
                onClick={() => navigate("/agregarProducto")}
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
                <h5 className="p2">AGREGAR PRODUCTO</h5>
                <div>
                  <SvgComponentAgregar />
                </div>
              </Button>
              <Button
                onClick={() => navigate("/categorias")}
                sx={{
                  mt: "20px",
                  mb: "1px",
                  // ml: "120px",
                  left: "410px",
                  width: "120px",
                  borderRadius: "30px",
                }}
                component={Paper}
              >
                <h5 className="p2">CATEGORIAS</h5>
              </Button>
            </Grid>
            <TableContainer
              style={{ width: "600px", marginTop: "45px" }}
              component={Paper}
            >
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell className="celda">
                      <h5>NOMBRE</h5>
                    </TableCell>
                    <TableCell className="celda">
                      <h5>PRECIO</h5>
                    </TableCell>
                    <TableCell className="celda">
                      <h5>DESCRIPCION</h5>
                    </TableCell>
                    <TableCell className="celda">
                      <h5>CATEGORIA</h5>
                    </TableCell>
                    <TableCell className="acciones">
                      <h5>ACCIONES</h5>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {productos.map((producto) => (
                    <TableRow
                      key={producto.nombre}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell
                        sx={{ fontSize: "15px" }}
                        align="left"
                        component="th"
                        scope="row"
                      >
                        {producto.nombre}
                      </TableCell>
                      <TableCell sx={{ fontSize: "15px" }} align="left">
                        {producto.precio}
                      </TableCell>
                      <TableCell sx={{ fontSize: "15px" }} align="left">
                        {producto.descripcion}
                      </TableCell>
                      <TableCell sx={{ fontSize: "15px" }} align="left">
                        {producto.categoria.nombre}
                      </TableCell>
                      <TableHeaderCell>
                        {buttonEdit(producto, navigate)}
                        {buttonDelete(producto)}
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
        count={productosInfo?.totalPages}
      />
    </Stack>
  );
}

function buttonDelete(producto) {
  let button = (
    <IconButton onClick={() => deleteProductoA(producto.id)}>
      <SvgComponentEliminar />
    </IconButton>
  );

  return button;
}

function deleteProductoA(id) {
  return Swal.fire({
    title: "Atencion!",
    text: "Está a punto de eliminar el producto de la base de datos",
    icon: "warning",
    showCancelButton: true,
    cancelButtonColor: "blue",
    cancelButtonText: "Cancelar",
    confirmButtonColor: "red",
    confirmButtonText: "Confirmar",
  }).then((result) => {
    if (result.isConfirmed) {
      deleteProducto(id);
    }
  });
}

function buttonEdit(producto, navigate) {
  let buttoon = (
    <IconButton onClick={() => editarProducto(producto.id, navigate)}>
      <SvgComponentEditar />
    </IconButton>
  );
  return buttoon;
}

function editarProducto(id, navigate) {
  return Swal.fire({
    title: "Atencion!",
    text: "Está a punto de editar el producto de la base de datos",
    icon: "warning",
    showCancelButton: true,
    cancelButtonColor: "blue",
    cancelButtonText: "Cancelar",
    confirmButtonColor: "red",
    confirmButtonText: "Confirmar",
  }).then((result) => {
    if (result.isConfirmed) {
      let url = `/editarProducto/${id}`;
      return navigate(url);
    }
  });
}
