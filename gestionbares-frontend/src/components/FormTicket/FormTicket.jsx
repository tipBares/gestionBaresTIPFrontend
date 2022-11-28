import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import {
  Alert,
  Box,
  Button,
  ButtonGroup,
  Collapse,
  FormControl,
  Grid,
  IconButton,
  MenuItem,
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
  getTicketById,
  createTicketProducto,
  updateMozoInTicket,
  applyDiscount,
  generarImporteTotal,
  updateMetodoDePago,
  deleteTicketProducto,
  updateMesa,
  guardarTicket,
  cancelarTicket,
} from "../../services/ticket-service";
import { getCategoriasAll } from "../../services/categoria-service";
import {
  getProductoByNameAll,
  getProductoByCategoriaAll,
  getProductoById,
  getProductosAll,
} from "../../services/producto_service";
import { useState } from "react";
import { useEffect } from "react";
import { Label, TableHeaderCell, TextArea } from "semantic-ui-react";
import Modal from "@mui/material/Modal";
import { getMesaById, getMesas } from "../../services/mesa-service";
import { getMozosAll } from "../../services/mozo-service";
import { PDFDownloadLink } from "@react-pdf/renderer";
import CrearPDF from "../CreatePDF/CreatePDF";

const blue = {
  500: "#007FFF",
};

const grey = {
  300: "#afb8c1",
  900: "#24292f",
};

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
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [modalProductos, setModalProductos] = useState(true);
  const [modalPdf, setModalPdf] = useState(false);

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
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");
  const [categorias, setCategorias] = useState([]);
  const [categoria, setCategoria] = useState(0);
  const navigate = useNavigate();
  let { id } = useParams();
  const { register, handleSubmit, reset } = useForm();
  const [idTicket, setIdTicket] = useState();
  const [mesas, setMesas] = useState([]);
  const [mesa, setMesa] = useState({});
  const [idProducto, setIdProducto] = useState();
  const [cantidad, setCantidad] = useState(0);
  const [mozos, setMozos] = useState([]);
  const [mozo, setMozo] = useState("");
  const [ticket, setTicket] = useState({});
  const [descuento, setDescuento] = useState();
  const [isAlertVisible, setIsAlertVisible] = useState(false);

  const handleButtonClick = () => {
    setIsAlertVisible(true);
  };

  setTimeout(() => {
    setIsAlertVisible(false);
  }, 3000);

  const onSubmit = async () => {};

  const getData = async () => {
    const response = await getProductoById(idProducto);
    setNombre(response.nombre);
    setPrecio(response.precio);
    setCategoria(response.categoria.id);
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
    const response = await getMesaById(id);
    setMesa(response);
    setIdTicket(response.ticket.id);
    if (response.ticket.id) {
      getDataTicket();
    }
  };
  const getDataTicket = async () => {
    const response = await getTicketById(idTicket);
    setTicket(response);
    setSelected(response.metodoDePago);
    setMozo(response.mozo.id);
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
    createTicketProducto({ idTicket, idProducto, cantidad });
    setCantidad(1);
  };

  const handleChangeImporteTotal = async () => {
    await generarImporteTotal(idTicket);
    getDataTicket();
  };

  const handleChangeDescuento = async (event, value) => {
    setDescuento(event.target.value);
  };

  const handleDescuento = async (event) => {
    await applyDiscount(idTicket, descuento);
    getDataTicket();
  };

  const handleChangeMozo = async (event, value) => {
    setMozo(event.target.value);
    await updateMozoInTicket(idTicket, event.target.value);
  };

  const options = [
    { value: "Efectivo", text: "Efectivo" },
    { value: "Transferencia bancaria", text: "Transferencia bancaria" },
    { value: "Tarjeta de debito", text: "Tarjeta de débito" },
    { value: "Tarjeta de credito", text: "Tarjeta de crédito" },
  ];

  const [selected, setSelected] = useState("");

  const handleChangeMetodoDePago = async (event) => {
    setSelected(event.target.value);
    await updateMetodoDePago(idTicket, event.target.value);
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

  const mesaSeleccionada = async (value) => {
    let mesaSelect = mesas.find((mesa) => mesa.nroMesa == value);
    await updateMesa(idTicket, mesaSelect.id);
  };

  const Mesas = [];
  mesas.map((option) => {
    Mesas.push(`${option.nroMesa}`);
  });

  return (
    <Stack style={{ marginTop: "100px" }} alignItems={"center"}>
      <div className="milky">{id ? "Editar Ticket" : "Nuevo Ticket"}</div>
      <Box width={"600px"} height={"auto"} component={Paper}>
        <form onSubmit={handleSubmit()}>
          <div>
            <FormControl sx={{ m: 1, minWidth: 80 }}>
              <InputLabel id="demo-simple-select-autowidth-label">
                Mozo
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={mozo}
                {...register("mozo")}
                onChange={handleChangeMozo}
              >
                {mozos.map(({ nombre, id }) => (
                  <MenuItem key={id} value={id}>
                    {`${nombre}`}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
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
                mr: "3px",
                mb: "8px",

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

                  inputOptions: {
                    Mesas,
                  },
                  inputValidator: (value) => {
                    return new Promise((resolve) => {
                      mesaSeleccionada(Mesas[value]);
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
            onClick={() => {
              mostrarModalPdf();
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
          >
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
                if (result.isConfirmed) {
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
          >
            Cancelar
          </Button>
          <Modal
            height={"auto"}
            width={"auto"}
            open={open}
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
                          mt: "20px",
                          alignContent: "center",
                          left: "190px",
                          borderRadius: "30px",
                          width: "190px",
                        }}
                        component={Paper}
                        onClick={async () => {
                          await guardarTicket(idTicket);
                          handleClose();
                        }}
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
                      type={"text"}
                      onChange={handleChangeDescuento}
                      value={descuento}
                    ></TextField>
                    <Button
                      sx={{
                        left: "10px",
                        height: "50px",
                        width: "120px",
                        borderRadius: "10px",
                      }}
                      component={Paper}
                      type="submit"
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
                        sx={{ animationTimeline: "0s" }}
                        variant="filled"
                        severity="success"
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
                        sx={{ width: 410 }}
                        required
                        {...register("categoria")}
                        onChange={handleBuscarCategoria}
                        label="Categoria"
                      >
                        {categorias.map(({ nombre, id }) => (
                          <MenuItem key={id} value={id}>
                            {`${nombre}`}
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
                                          setCantidad(event.target.value);
                                        },
                                      })}
                                    >
                                      <Button
                                        sx={{ right: 65 }}
                                        aria-label="reduce"
                                        onClick={() => {
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
                                        <div className="alert-container"></div>
                                      )}
                                      agregar
                                    </Button>
                                    {isAlertVisible && (
                                      <div className="alert-container"></div>
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
