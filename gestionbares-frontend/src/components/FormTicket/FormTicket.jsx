import { Link, useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  Box,
  Button,
  FormControl,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import { SvgComponentAgregar } from "../../icons/abm";
import React from "react";
import Paper from "@mui/material/Paper";
import { Stack } from "@mui/system";
import "./FormTicket.scss";
import {
  createTicket,
  editTicket,
  getTicketById,
} from "../../services/ticket-service";
import { useState } from "react";
import { useEffect } from "react";
import { TableHeaderCell } from "semantic-ui-react";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function FormTicket() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const navigate = useNavigate();
  let { id } = useParams();
  const { register, handleSubmit } = useForm();
  const onSubmit = async () => {
    if (!id) {
      createTicket({ nombre });
    } else {
      editTicket(id, { nombre });
    }
  };

  const [nombre, setNombre] = useState("");

  useEffect(() => {
    const getData = async () => {
      const response = await getTicketById(id);
      setNombre(response.nombre);
    };
    if (id) {
      getData();
    }
  }, [id]);

  return (
    <Stack style={{ marginTop: "100px" }} alignItems={"center"}>
      <div className="milky">{id ? "Editar Ticket" : "Nuevo Ticket"}</div>
      <Box width={"500px"} height={"auto"} component={Paper}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            {/* terminar de conectar la peticion a mozos */}
            <FormControl sx={{ m: 1, minWidth: 80 }}>
              <InputLabel id="demo-simple-select-autowidth-label">
                Mozo
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                // value={age}
                //label="Age"
                required
                // onChange={handleChange}
              >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
          </div>

          {/* la tabla va a mostrar cantidad nombre precio unitario e importe */}
          <Button
            onClick={handleOpen}
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
            <h5 className="p2">agregar articulo</h5>
            <div>
              <SvgComponentAgregar />
            </div>
          </Button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Text in a modal
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
              </Typography>
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
                <TableCell>
                  <h5>precio unitario</h5>
                </TableCell>
                <TableCell>
                  <h5>importe</h5>
                </TableCell>
              </TableRow>
            </TableHead>
          </Table>
          <Button
            type="submit"
            variant="contained"
            color="success"
            sx={{ mt: "8px", mb: "4px", width: "300px" }}
          >
            {id ? "editar" : "crear"}
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="error"
            sx={{ mt: "1px", mb: "4px", width: "300px" }}
            // onClick={() => navigate("/categorias")}
          >
            Cancelar
          </Button>
        </form>
      </Box>
    </Stack>
  );
}
