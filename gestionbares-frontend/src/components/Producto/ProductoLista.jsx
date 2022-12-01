import * as React from "react";
import { useState, useEffect } from "react";
import {
  getProductos,
  deleteProducto,
  getProductoByName,
  getProductoByCategoria,
} from "../../services/producto_service";
import { getCategoriasAll } from "../../services/categoria-service";
import IconButton from "@mui/material/IconButton";
import {
  SvgComponentEliminar,
  SvgComponentEditar,
  SvgComponentAgregar,
} from "../../icons/abm";
import "./ProductoLista.scss";
import Swal from "sweetalert2";
import { TableHeaderCell } from "semantic-ui-react";
import { useForm } from "react-hook-form";
import Pagination from "@mui/material/Pagination";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import SearchIcon from "@mui/icons-material/Search";
import Grid from "@mui/material/Grid";
import {
  Box,
  Button,
  Stack,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  InputAdornment,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function ProductoLista() {
  const navigate = useNavigate();
  const [productos, setProductos] = useState([]);
  const [productosInfo, setProductosInfo] = useState();
  const [nombre, setNombre] = useState("");
  const [categorias, setCategorias] = useState([]);
  const [categoria, setCategoria] = useState("");

  const { register } = useForm();

  useEffect(() => {
    getData();
    getCategoriasAux();
  }, []);

  const getData = async () => {
    const productosDisponibles = await getProductos(0);
    setProductosInfo(productosDisponibles);
    setProductos(productosDisponibles.content);
  };

  const getCategoriasAux = async () => {
    const responseCategorias = getCategoriasAll();
    const categorias = await responseCategorias;
    setCategorias(categorias);
  };

  const handleChange = async (event, value) => {
    if (nombre && nombre.length > 0) {
      const productosDisponibles = await getProductoByName(nombre, value - 1);
      setProductos(productosDisponibles.content);
      setProductosInfo(productosDisponibles);
    } else if (categoria !== 0 && categoria !== "") {
      const productosDisponibles = await getProductoByCategoria(
        categoria,
        value - 1
      );
      setProductos(productosDisponibles.content);
      setProductosInfo(productosDisponibles);
    } else {
      const productosDisponibles = await getProductos(value - 1);
      setProductos(productosDisponibles.content);
      setProductosInfo(productosDisponibles);
    }
  };

  const handleBuscarNombre = async (event) => {
    if (event.target.value && event.target.value.length > 0) {
      setNombre(event.target.value);
      const productosDisponibles = await getProductoByName(
        event.target.value,
        0
      );
      setProductosInfo(productosDisponibles);
      setProductos(productosDisponibles.content);
    } else {
      setNombre("");
      const productosDisponibles = await getProductos(0);
      setProductosInfo(productosDisponibles);
      setProductos(productosDisponibles.content);
    }
  };

  const handleBuscarCategoria = async (event) => {
    if (event.target) {
      setCategoria(event.target.value);
      const productosDisponibles = await getProductoByCategoria(
        event.target.value,
        0
      );
      setProductosInfo(productosDisponibles);
      setProductos(productosDisponibles.content);
    } else {
      setCategoria(0);
      const productosDisponibles = await getProductos(0);
      setProductosInfo(productosDisponibles);
      setProductos(productosDisponibles.content);
    }
  };

  return (
    <Stack alignItems={"center"}>
      <Box height={"auto"}>
        <div>
          <TextField
            className="alinearizq"
            label="​Buscar producto por nombre"
            onChange={handleBuscarNombre}
            value={nombre}
            sx={{ width: 280 }}
            style={{ margin: 12 }}
            InputProps={{
              endAdornment: (
                <InputAdornment>
                  <IconButton>
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <FormControl className="alinearder" sx={{ m: 1.4, width: 280 }}>
            <InputLabel id="demo-simple-select-label">
              Buscar por categoria
            </InputLabel>
            <Select
              {...register("categoria")}
              onChange={handleBuscarCategoria}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={categoria}
              label="BUscar por categoria"
            >
              <MenuItem disabled={"true"} value="">
                Buscar por categoria
              </MenuItem>
              {categorias.map(({ nombre, id }) => (
                <MenuItem key={id} value={id}>
                  {`${nombre}`}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div>
          <Button
            className="alinearder"
            onClick={() => navigate("/agregarProducto")}
            sx={{
              mt: "1px",
              mb: "20px",
              mr: "-120px",
              right: "130px",
              width: "280px",
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
            className="alinearizq"
            onClick={() => navigate("/categorias")}
            sx={{
              mt: "1px",
              mb: "20px",
              mr: "-120px",
              left: "10px",
              width: "282px",
              borderRadius: "30px",
            }}
            component={Paper}
          >
            <h5 className="p2">AGREGAR CATEGORIA</h5>
            <div>
              <SvgComponentAgregar />
            </div>
          </Button>
        </div>
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
              {productos?.map((producto) => (
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
        <Pagination
          onChange={handleChange}
          shape="rounded"
          count={productosInfo?.totalPages}
          size="small"
        />
      </Box>
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
