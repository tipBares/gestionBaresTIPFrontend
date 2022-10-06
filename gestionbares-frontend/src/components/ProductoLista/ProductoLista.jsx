import * as React from "react";
import { useState, useEffect } from "react";
import {
	getProductos,
	deleteProducto,
	getProductoByName,
	getProductoByCategoria,
} from "../../services/producto_service";
import { getCategorias } from "../../services/categoria-service";
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
import { Box, Button, Stack, TextField, Select, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function ProductoLista() {

	const navigate = useNavigate();
	const [productos, setProductos] = useState([]);
	const [productosInfo, setProductosInfo] = useState();
	const [nombre, setNombre] = useState("");
	const [categorias, setCategorias] = useState([]);
	const [categoria, setCategoria] = useState(0);

	const { register, handleSubmit } = useForm();

	useEffect(() => {
		getData();
		getCategoriasAux();
	}, []);

  const getData = async () => {
    const productosDisponibles = await getProductos(0);
    setProductosInfo(productosDisponibles);
    setProductos(productosDisponibles.content);

    console.log(productosDisponibles);
  };


	const getCategoriasAux = async () => {
		const responseCategorias = getCategorias();
		const categorias = await responseCategorias;
		setCategorias(categorias);
	};

	const handleChange = async (event, value) => {
		if (nombre && nombre.length > 0) {
			const productosDisponibles = await getProductoByName(nombre, value - 1);
			setProductosInfo(productosDisponibles);
			setProductos(productosDisponibles.content);
		} else if (categoria!==0) {
			const productosDisponibles = await getProductoByCategoria(
				categoria,
				value - 1
			);
			setProductosInfo(productosDisponibles);
			setProductos(productosDisponibles.content);
		} else {
			const productosDisponibles = await getProductos(value - 1);
			setProductosInfo(productosDisponibles);
			setProductos(productosDisponibles.content);
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
						</Grid>
						<TextField
							className="nombre"
							label="Buscar lugar por nombre"
							onChange={handleBuscarNombre}
							value={nombre}
							sx={{ width: 250 }}
							style={{ margin: 12 }}
						/>
						<Select
							sx={{ width: 300 }}
							required
							{...register("categoria")}
							onChange={handleBuscarCategoria}
							placeholder="Categoria"
							labelId="Categoria-label"
							label="Categoria"
							value={categoria}
						>
							{categorias.map(({ nombre, id }) => (
								<MenuItem key={id} value={id}>
									{`${nombre}`}
									{/* {<FontAwesomeIcon icon={icon} />} */}
								</MenuItem>
							))}
						</Select>
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
