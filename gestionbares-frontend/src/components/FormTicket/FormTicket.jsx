import { Link, useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import {
  Alert,
  Badge,
  Box,
  Button,
  ButtonGroup,
  Collapse,
  createFilterOptions,
  FormControl,
  Grid,
  IconButton,
  MenuItem,
  Pagination,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { styled } from "@mui/system";
import BadgeUnstyled, { badgeUnstyledClasses } from "@mui/base/BadgeUnstyled";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import MailIcon from "@mui/icons-material/Mail";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import InputLabel from "@mui/material/InputLabel";
import {
  SvgComponentAgregar,
  SvgComponentAjustes,
  SvgComponentEliminar,
} from "../../icons/abm";
import React from "react";
import Paper from "@mui/material/Paper";
import { Stack } from "@mui/system";
import "./FormTicket.scss";
import {
  // createTicket,
  // editTicket,
  getTicketById,
  createTicketProducto,
  updateMozoInTicket,
  applyDiscount,
  generarImporteTotal,
  updateMetodoDePago,
  deleteTicketProducto,
  alertaAnimada,
  updateMesa,
  guardarTicket,
  cancelarTicket,
} from "../../services/ticket-service";
import {
  getCategorias,
  getCategoriasAll,
} from "../../services/categoria-service";
import {
  getProductoByName,
  getProductoByNameAll,
  getProductos,
  getProductoByCategoria,
  getProductoByCategoriaAll,
  getProductoById,
  getProductosAll,
  deleteProducto,
} from "../../services/producto_service";
import { useState } from "react";
import { useEffect } from "react";
import { Label, StepTitle, TableHeaderCell, TextArea } from "semantic-ui-react";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { getMesaById, getMesas } from "../../services/mesa-service";
import { getMozos, getMozosAll } from "../../services/mozo-service";
import ReactPDF, { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import CrearPDF from "../CreatePDF/CreatePDF";

const blue = {
  500: "#007FFF",
};

const grey = {
  300: "#afb8c1",
  900: "#24292f",
};

// let notification = new Notification(StepTitle, createFilterOptions);
// setTimeout(() => {
//   notification.close();
// }, 4000);

const StyledBadge = styled(BadgeUnstyled)(
  ({ theme }) => `
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-size: 14px;
  list-style: none;
  font-family: IBM Plex Sans, sans-serif;
  position: relative;
  display: inline-block;
  line-height: 1;

  & .${badgeUnstyledClasses.badge} {
    z-index: auto;
    position: absolute;
    top: 0;
    right: 0;
    min-width: 22px;
    height: 22px;
    padding: 0 6px;
    color: #fff;
    font-weight: 600;
    font-size: 12px;
    line-height: 22px;
    white-space: nowrap;
    text-align: center;
    border-radius: 12px;
    background: ${blue[500]};
    box-shadow: 0px 4px 6x ${
      theme.palette.mode === "dark" ? grey[900] : grey[300]
    };
    transform: translate(50%, -50%);
    transform-origin: 100% 0; 
  }

  & .${badgeUnstyledClasses.invisible} {
    opacity: 0;
    pointer-events: none;
  }
  `
);

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "autowidth",
  height: "autowidth",
  overflowY: "scroll",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function FormTicket() {
  //const { mesa } = props;
  //cuenta la cantidad del producto a agregar
  //const [count, setCount] = useState(1);
  //meneja el modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  //modal para descuent/metodo de pago
  const [modalProductos, setModalProductos] = useState(true);
  const [modalPdf, setModalPdf] = useState(false);
  //pruebo estados para un alerta de confirmacion
  const [mostrarAlerta, setMostrarAlerta] = useState(false);

  const cerrarModal = () => {
    handleClose();
    getDataTicket(idTicket);
  };
  const mostrarModalProductos = () => {
    setModalProductos(true);
    setModalPdf(false);

    handleOpen();
  };
  const mostrarModalDetalles = () => {
    setModalProductos(false);
    setModalPdf(false);
    handleOpen();
  };
  const mostrarModalPdf = () => {
    setModalPdf(true);
    handleOpen();
  };

  const [productos, setProductos] = useState([]);
  const [productosInfo, setProductosInfo] = useState();
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");
  const [categorias, setCategorias] = useState([]);
  const [categoria, setCategoria] = useState(0);
  const navigate = useNavigate();
  let { nombreFilter } = useParams();
  let { id } = useParams();
  const { register, handleSubmit, reset } = useForm();
  const [idTicket, setIdTicket] = useState();
  const [mesas, setMesas] = useState([]);
  const [mesa, setMesa] = useState({});
  console.log("idTicket" + idTicket);
  const [idProducto, setIdProducto] = useState();
  const [cantidad, setCantidad] = useState(0);
  const [mozos, setMozos] = useState([]);

  const [mozo, setMozo] = useState({ nombre: "", apellido: "", nick: "" });
  console.log("const mozo 2", mozo);
  const [ticket, setTicket] = useState({});
  const [descuento, setDescuento] = useState();
  // borrar const verPDF
  const [verPDF, setVerPDF] = useState(false);
  // const [metodoDePago, setMetodoDePago] = useState ({Efectivo});

  const [isAlertVisible, setIsAlertVisible] = useState(false);

  const handleButtonClick = () => {
    setIsAlertVisible(true);
  };

  setTimeout(() => {
    setIsAlertVisible(false);
  }, 3000);

  //no se si va
  console.log("const ticket 2", ticket);
  const onSubmit = async () => {
    // if (!id) {
    //   createTicket({ nombre });
    // } else {
    //   editTicket(id, { nombre });
    // }
  };

  const getData = async () => {
    const response = await getProductoById(idProducto);
    console.log(response);
    console.log(response.id);
    setNombre(response.nombre);
    setPrecio(response.precio);
    setCategoria(response.categoria.id);
  };
  const getProductosByName = async () => {
    const response = await getProductoByNameAll(nombre);
    console.log("productos nombre: ", response);
    setProductos(response);
  };
  const getCategoriasAux = async () => {
    const responseCategorias = getCategoriasAll();
    const categorias = await responseCategorias;
    setCategorias(categorias);
  };
  const getMozosAux = async () => {
    const responseMozos = getMozosAll();
    const mozos = await responseMozos;
    setMozos(mozos);
  };

  const getMesasAux = async () => {
    const responseMesas = getMesas();
    const mesas = await responseMesas;
    setMesas(mesas);
  };
  const getDataMesa = async () => {
    console.log(id, "HOLAAAAAAAAAAAYYOUGIUG");
    const response = await getMesaById(id);
    console.log("SOY EL RESPONSE", response);
    setMesa(response);
    setIdTicket(response.ticket.id);
    //setMozo(response.mozo);
    console.log("ticket de la mesa: " + response);
    if (response.ticket.id) {
      getDataTicket();
    }
  };
  const getDataTicket = async () => {
    const response = await getTicketById(idTicket);
    setTicket(response);
    console.log(
      "tabla intermedia productos seteada: ",
      response.ticketProductosDto
    );
    setSelected(response.metodoDePago);
    console.log("cambio el selected linea 233", response.metodoDePago);

    console.log("const ticket ", ticket);
    console.log("response data ticket: ", response);
    setMozo(response.mozo.id);

    console.log("id auxiliar" + idTicket);
    console.log("id ticket" + response.id);
    console.log("SOY EL SELECTED YA SETEADO", selected);
  };

  useEffect(() => {
    if (idProducto) {
      getData();
    }
    getDataTicket();
    getCategoriasAux();
    getMozosAux();
    getMesasAux();
    getDataMesa();
  }, [id, idTicket]);

  const onSubmitTicketProducto = async () => {
    console.log("cantidad on submit: " + cantidad);
    createTicketProducto({ idTicket, idProducto, cantidad });
    setCantidad(1);
    setMostrarAlerta(true);
  };

  const handleChangeImporteTotal = async () => {
    await generarImporteTotal(idTicket);
    getDataTicket();
  };

  const handleChangeDescuento = async (event, value) => {
    setDescuento(event.target.value);
    console.log(value);
    console.log("holaaaaaaaaa" + descuento);
  };

  const handleDescuento = async (event) => {
    await applyDiscount(idTicket, descuento);
    getDataTicket();
    console.log("PASO A APLICAR EL DESCUENTO");
  };

  const handleSubmitDescuento = (event) => {
    // alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  };

  const handleChangeMozo = async (event, value) => {
    setMozo(event.target.value);
    console.log("paso handle change mozo 221: ", event.target.value);
    await updateMozoInTicket(idTicket, event.target.value);
    console.log("mozoId nuevo: ", event.target.value);
    // getDataTicket();
  };

  // const optionsMozosPrueba() => {

  // };

  //metodo pago prueba

  const options = [
    { value: "Efectivo", text: "Efectivo" },
    { value: "Transferencia bancaria", text: "Transferencia bancaria" },
    { value: "Tarjeta de debito", text: "Tarjeta de débito" },
    { value: "Tarjeta de credito", text: "Tarjeta de crédito" },
  ];

  const [selected, setSelected] = useState("");

  const handleChangeMetodoDePago = async (event) => {
    console.log(event.target.value);
    setSelected(event.target.value);
    console.log("paso a cambiar el state linea 288");
    await updateMetodoDePago(idTicket, event.target.value);
    // getDataTicket();
  };

  const handleChange = async (event, value) => {
    if (nombre && nombre.length > 0) {
      const productosDisponibles = await getProductoByName(nombre, value - 1);
      setProductosInfo(productosDisponibles);
      setProductos(productosDisponibles.content);
    } else if (categoria !== 0) {
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
    if (event.target.value.trim().length > 0) {
      setNombre(event.target.value);
      const productosDisponibles = await getProductoByNameAll(
        event.target.value
      );
      setProductos(productosDisponibles);
    } else {
      setNombre("");
      setProductos([]);
    }
  };

  const handleBuscarCategoria = async (event) => {
    if (event.target) {
      setCategoria(event.target.value);
      const productosDisponibles = await getProductoByCategoriaAll(
        event.target.value
      );
      setProductos(productosDisponibles);
    } else {
      setCategoria(0);
      const productosDisponibles = await getProductosAll();
      setProductos(productosDisponibles);
    }
  };

  const mostrarAlertaConfirmacionAuxiliar = () => {
    Swal.fire({
      title: "Creación exitosa",
      icon: "success",
      button: "Aceptar",
    });
  };

  // const mostrarModalDetalles = () => {
  //   setModalProductos(false);
  //   handleOpen();
  // };

  const mesaSeleccionadaaaa = async (value) => {
    console.log(value);

    setMesa(mesas.find((mesa) => mesa.nroMesa == value));
    // TODO ACA HAY QUE HACER LA PETICION A LA BASE DE DATOS
    //estoy obteniendo todos los datos de la mesa
    await updateMesa(idTicket, mesa.id);
    console.log("id de mesa " + mesa.id);
    console.log("id de tiket " + idTicket);
  };

  const Mesas = [];
  mesas.map((option) => {
    Mesas.push(`${option.nroMesa}`);
    console.log(Mesas);
  });

  const imprimirTicket = async () => {
	<PDFDownloadLink document={<CrearPDF ticket={ticket} />} fileName="ticket.pdf">
		{({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Download now!')}
	</PDFDownloadLink>
	  };

  return (
    <Stack style={{ marginTop: "100px" }} alignItems={"center"}>
      <div className="milky">{id ? "Editar Ticket" : "Nuevo Ticket"}</div>
      <Box width={"600px"} height={"auto"} component={Paper}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            {/* terminar de conectar la peticion a mozos */}
            <FormControl sx={{ m: 1, minWidth: 80 }}>
              <InputLabel id="demo-simple-select-autowidth-label">
                Mozo
              </InputLabel>
              <Select
                //name="capturarMozo"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={mozo}
                {...register("mozo")}
                onChange={handleChangeMozo}

                //label="Mozo"
              >
                {mozos.map(({ nombre, id }) => (
                  <MenuItem key={id} value={id}>
                    {`${nombre}`}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>

          {/* borrar hasta aca */}
          {/* la tabla va a mostrar cantidad nombre precio unitario e importe */}
          <Button
            onClick={mostrarModalProductos}
            sx={{
              mt: "20px",
              mb: "8px",
              mr: "-120px",
              left: "-55px",
              width: "200px",
              borderRadius: "30px",
            }}
            component={Paper}
          >
            <h5 className="p2">agregar articulo</h5>
            <div>
              <SvgComponentAgregar />
            </div>
          </Button>
          <div>
            <Button
              className="alinearder"
              onClick={() => {
                handleChangeImporteTotal();
                mostrarModalDetalles();
              }}
              sx={{
                // mt: "10px",
                // mb: "10px",
                mr: "3px",
                mb: "8px",
                // right: "150px",
                width: "290px",
                borderRadius: "30px",
              }}
              component={Paper}
            >
              <h5 className="p2">descuento y método de pago</h5>
              <div>
                <SvgComponentAjustes />
              </div>
            </Button>

            <Button
              className="alinearder"
              onClick={function () {
                Swal.fire({
                  icon: "warning",
                  title: "Desea cambiar de mesa ?",
                  text: "Seleccione la mesa",
                  input: "select",
                  // showCancelButton: true,
                  inputOptions: {
                    Mesas,
                  },
                  inputValidator: (value) => {
                    return new Promise((resolve) => {
                      mesaSeleccionadaaaa(Mesas[value]);
                      resolve();
                    });
                  },
                });
              }}
              sx={{
                mb: "8px",
                ml: "-110px",
                left: "-12px",
                width: "290px",
                borderRadius: "30px",
              }}
              component={Paper}
            >
              <h5 className="p2">cambiar de mesa</h5>
              <div>
                <SvgComponentAjustes />
              </div>
            </Button>
          </div>
		  
          <Button
<<<<<<< Updated upstream
            onClick={() => {
              mostrarModalPdf();
=======
            onClick={function () {
              Swal.fire({
                title: "Desea finalizar el ticket ?",
                text: "Seleccion la opción deseada",
                icon: "warning",
                showCancelButton: true,
                cancelButtonColor: "#d33",
                showDenyButton: true,
                denyButtonText: "Guardar e imprimir",
                denyButtonColor: "#2E3B55",
                confirmButtonText: "Guardar",
                confirmButtonColor: "#2E3B55",
                cancelButtonText: "Cancelar",
              }).then(function (result) {
                if (result.value) {
                  guardarTicket(idTicket);
                } else if (result.isDenied) {			
				  //guardarTicket(idTicket);
				  {imprimirTicket()}
				}					
              });
>>>>>>> Stashed changes
            }}
            type="submit"
            variant="contained"
            color="success"
            sx={{
              mb: "8px",
              ml: "-100px",
              right: "6px",
              width: "290px",
              borderRadius: "30px",
            }}
            component={Paper}
            //este boton abre un alert que tiene el boton guardar y otro guardar e imprimir  y ponerlos arriba de la tabla
          >
            {/* {id ? "editar" : "crear"} */}
            finalizar
          </Button>
		
          <Button
            onClick={function () {
              Swal.fire({
                icon: "error",
                title: "Desea cancelar el ticket ?",
                text: "Seleccione la opción deseada",
                showCancelButton: true,
                cancelButtonColor: "#d33",

                confirmButtonText: "Sí",
                confirmButtonColor: "#2E3B55",
                cancelButtonText: "Cancelar",
              }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                  //aca va la peticion de cancelar mesa y pone en true la columna cancelado del backend
                  cancelarTicket(idTicket, id);
                }
              });
            }}
            type="submit"
            variant="contained"
            color="error"
            sx={{
              mb: "8px",
              ml: "-110px",
              right: "-110px",
              mr: "-1px",

              width: "290px",
              borderRadius: "30px",
            }}
            component={Paper}
            // onClick={() => navigate("/categorias")}//ESTE CANCELAR BORRA EL TICKET Y VUELVE AL SALON
          >
            Cancelar
          </Button>
          <Modal
            height={"auto"}
            width={"auto"}
            open={open}
            // overflow={"scroll"}
            //onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              {modalPdf && (
                <Grid
                  container
                  spacing={{ xs: 2, md: 3 }}
                  columns={{ xs: 4, sm: 8, md: 12 }}
                >
                  <Grid item p={2} xs={2} sm={4} md={4}>
                    <Button
                      sx={{
                        // mt: "1px",
                        // mb: "50px",

                        alignContent: "center",

                        left: "190px",
                        width: "190px",
                        borderRadius: "30px",
                      }}
                      component={Paper}
                      onClick={() => guardarTicket(idTicket) && handleClose()}
                    >
                      Guardar
                    </Button>

                    <PDFDownloadLink
                      document={<CrearPDF ticket={ticket} />}
                      fileName="Ticket.pdf"
                    >
                      <Button
                        sx={{
                          //alignItems: "center",
                          //mb: "10px",
                          mt: "20px",
                          alignContent: "center",
                          left: "190px",
                          borderRadius: "30px",
                          width: "190px",
                          //left: "95px",
                        }}
                        component={Paper}
                        onClick={async () => {
                          await guardarTicket(idTicket);
                          handleClose();
                        }}
                        //onClick={async () => {await this.asyncFunc("Example");} }
                        variant="info"
                      >
                        Guardar e imprimir
                      </Button>
                    </PDFDownloadLink>

                    <Button
                      color="error"
                      type="submit"
                      variant="contained"
                      sx={{
                        mt: "15px",
                        //mb: "10px",
                        // ml: "20px",
                        // margin: "5px",
                        // right: "-70px",
                        left: "190px",
                        alignContent: "center",
                        width: "190px",
                        borderRadius: "30px",
                      }}
                      component={Paper}
                      onClick={() => {
                        handleClose();
                      }}
                    >
                      cerrar
                    </Button>
                  </Grid>
                </Grid>
              )}
              {!modalPdf && !modalProductos && (
                <div>
                  <Button
                    sx={{
                      mt: "1px",
                      mb: "1px",
                      mr: "-120px",
                      left: "3px",
                      width: "150px",
                      borderRadius: "30px",
                    }}
                    component={Paper}
                    onClick={() => {
                      handleClose();
                      navigate(`/abrirTicket/${mesa.id}`);
                    }}
                  >
                    cerrar modal
                  </Button>
                  <div className="importeTotal">
                    <Label>Importe total: ${ticket.importeTotal}</Label>
                  </div>
                  <div>
                    <TextField
                      label="Descuento %"
                      sx={{ width: 200 }}
                      // className="descuento"
                      type={"text"}
                      onChange={handleChangeDescuento}
                      value={descuento}
                    ></TextField>
                    <Button
                      sx={{
                        // mt: "20px",
                        //mb: "-1px",
                        // mr: "-120px",
                        left: "10px",
                        height: "50px",
                        width: "120px",
                        borderRadius: "10px",
                      }}
                      component={Paper}
                      // className="aplicar"
                      type="submit"
                      // variant="contained"
                      value="Submit"
                      onClick={handleDescuento}
                    >
                      aplicar
                    </Button>
                  </div>
                  <div className="importeFinal">
                    <Label>Importe final: ${ticket.importeFinal}</Label>
                  </div>
                  <div className="metodoPago">
                    <FormControl>
                      <InputLabel id="demo-simple-select-autowidth-label">
                        Metodo de pago
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-autowidth-label"
                        value={selected}
                        onChange={handleChangeMetodoDePago}
                      >
                        {options.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.text}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </div>
                </div>
              )}
              {!modalPdf && modalProductos && (
                <div>
                  <div>
                    <Button
                      onClick={() => {
                        cerrarModal();
                      }}
                      sx={{
                        mt: "20px",
                        mb: "1px",
                        mr: "-120px",
                        left: "3px",
                        width: "150px",
                        borderRadius: "30px",
                      }}
                      component={Paper}
                    >
                      cerrar modal
                    </Button>

                    <Collapse in={isAlertVisible} sx={{ mt: "20px" }}>
                      <Alert
                        sx={{ animationTimeline: "0s" }} //seguir con lo del timer que cierre solo el alaerta cuando haya tiempo
                        variant="filled"
                        severity="success"
                        // onClose={() => {
                        //   setMostrarAlerta(false);
                        // }}
                      >
                        Se agregó correctamente el producto.
                      </Alert>
                    </Collapse>
                  </div>
                  <div>
                    <TextField
                      className="alinearizq"
                      label="Buscar producto por nombre"
                      onChange={handleBuscarNombre}
                      value={nombre}
                      sx={{ width: 370 }}
                    />
                    <FormControl className="alinearder">
                      <InputLabel id="demo-simple-select-label">
                        Categoria
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        // className="right"
                        sx={{ width: 410 }}
                        required
                        {...register("categoria")}
                        onChange={handleBuscarCategoria}
                        // placeholder="Categoria"
                        label="Categoria"
                        // value={categoria}
                      >
                        {categorias.map(({ nombre, id }) => (
                          <MenuItem key={id} value={id}>
                            {`${nombre}`}
                            {/* {<FontAwesomeIcon icon={icon} />} */}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </div>

                  <TableContainer
                    style={{
                      marginTop: "70px",
                      width: "800px",
                      height: "auto",
                      alignItems: "center",
                    }}
                    component={Paper}
                  >
                    <form onSubmit={handleSubmit(onSubmitTicketProducto)}>
                      <Table aria-label="simple table">
                        <TableHead>
                          <TableRow>
                            <TableCell className="celda">
                              <h5>NOMBRE</h5>
                            </TableCell>
                            <TableCell className="celda">
                              <h5>PRECIO</h5>
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
                              sx={{
                                "&:last-child td, &:last-child th": {
                                  border: 0,
                                },
                              }}
                            >
                              <TableCell
                                sx={{ fontSize: "15px" }}
                                align="left"
                                component="th"
                                scope="row"
                                value={producto.id}
                                {...register("idProducto", {
                                  onChange: (event) => {
                                    setIdProducto(event.target.value);
                                    console.log(event.target.value);
                                    console.log(producto.id);
                                  },
                                })}
                              >
                                {producto.nombre}
                              </TableCell>

                              <TableCell sx={{ fontSize: "15px" }} align="left">
                                {producto.precio}
                              </TableCell>
                              <TableHeaderCell>
                                <Box
                                  sx={{
                                    color: "action.active",
                                    display: "flex",
                                    flexDirection: "column",
                                    // right: "10px",
                                    "& > *": {
                                      marginBottom: -2,
                                    },
                                    [`& .${badgeUnstyledClasses.root}`]: {
                                      marginRight: 2,
                                      right: 52,
                                      marginTop: 1,
                                    },
                                  }}
                                >
                                  <div>
                                    <StyledBadge
                                      sx={{
                                        marginTop: 1,
                                        left: -60,
                                      }}
                                      badgeContent={
                                        idProducto === producto.id
                                          ? cantidad
                                          : 0
                                      }
                                    >
                                      <ShoppingCartIcon />
                                    </StyledBadge>
                                    <ButtonGroup
                                      value={cantidad}
                                      {...register("cantidad", {
                                        onChange: (event) => {
                                          console.log(
                                            "onchange cantidad: " +
                                              event.target.value
                                          );
                                          setCantidad(event.target.value);
                                        },
                                      })}
                                    >
                                      <Button
                                        sx={{ right: 65 }}
                                        aria-label="reduce"
                                        onClick={() => {
                                          console.log(
                                            "cantidad remove: " + cantidad
                                          );
                                          setIdProducto(producto.id);
                                          if (producto.id !== idProducto) {
                                            setCantidad(-1);
                                            setIdProducto(producto.id);
                                          }

                                          if (producto.id === idProducto) {
                                            setCantidad(cantidad - 1);
                                          }
                                        }}
                                      >
                                        <RemoveIcon fontSize="small" />
                                      </Button>
                                      <Button
                                        sx={{ right: 65 }}
                                        aria-label="increase"
                                        onClick={() => {
                                          console.log(
                                            "cantidad add: " + cantidad
                                          );
                                          if (producto.id !== idProducto) {
                                            setCantidad(1);
                                            setIdProducto(producto.id);
                                          }

                                          if (producto.id === idProducto) {
                                            setCantidad(cantidad + 1);
                                          }
                                        }}
                                      >
                                        <AddIcon fontSize="small" />
                                      </Button>
                                    </ButtonGroup>
                                    <Button
                                      onClick={handleButtonClick}
                                      type="submit"
                                      sx={{ right: -40, marginTop: -6 }}
                                      handleClose
                                    >
                                      {isAlertVisible && (
                                        <div className="alert-container">
                                          {/* <div className="alert-inner">
                                            Alert! Alert!
                                          </div> */}
                                        </div>
                                      )}
                                      agregar
                                    </Button>
                                    {/* <button onClick={handleButtonClick}>
                                      Show alert
                                    </button> */}
                                    {isAlertVisible && (
                                      <div className="alert-container">
                                        <div className="alert-inner">
                                          Alert! Alert!
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                </Box>
                              </TableHeaderCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </form>
                  </TableContainer>
                  {/* <Pagination
                  onChange={handleChange}
                  shape="rounded"
                  count={productosInfo?.totalPages}
                  size="small"
                /> */}
                </div>
              )}
            </Box>
          </Modal>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell className="celda">
                  <h5>nombre</h5>
                </TableCell>
                <TableCell className="celda">
                  <h5>cantidad</h5>
                </TableCell>
                <TableCell sx={{ width: "200px" }}>
                  <h5>precio unitario</h5>
                </TableCell>
                <TableCell>
                  <h5>importe</h5>
                </TableCell>
                <TableCell>
                  <h5>acciones</h5>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {ticket?.ticketProductosDto?.map((ticket) => (
                <TableRow
                  key={ticket.idProducto}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell
                    sx={{ fontSize: "15px" }}
                    align="left"
                    component="th"
                    scope="row"
                  >
                    {ticket.nombreProducto}
                  </TableCell>
                  <TableCell
                    sx={{ fontSize: "15px" }}
                    align="left"
                    component="th"
                    scope="row"
                  >
                    {ticket.cantidad}
                  </TableCell>
                  <TableCell
                    sx={{ fontSize: "15px" }}
                    align="center"
                    component="th"
                    scope="row"
                  >
                    ${ticket.precioProducto}
                  </TableCell>
                  <TableCell
                    sx={{ fontSize: "15px" }}
                    align="left"
                    component="th"
                    scope="row"
                  >
                    ${ticket.precioProducto * ticket.cantidad}
                  </TableCell>
                  <TableHeaderCell>
                    {buttonDelete(idTicket, ticket.idProducto, getDataTicket)}
                  </TableHeaderCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </form>
      </Box>
    </Stack>
  );
}

function buttonDelete(idTicket, idProducto) {
  let button = (
    <IconButton onClick={() => deleteProductoA(idTicket, idProducto)}>
      <SvgComponentEliminar />
    </IconButton>
  );

  return button;
}

function deleteProductoA(idTicket, idProducto) {
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
      deleteTicketProducto(idTicket, idProducto);
    }
  });
}
