import { Link} from "react-router-dom";
import { useForm } from "react-hook-form";
import { Box, Button, TextField, Select, MenuItem} from "@mui/material";
import React from "react";
import Paper from "@mui/material/Paper";
import { Stack } from "@mui/system";
import "./FormProducto.scss";
import { useEffect, useState } from "react";
import { createProducto } from "../../services/producto_service";
import { getCategorias } from "../../services/categoria-service";

export default function FormProducto() {
  const { register, handleSubmit } = useForm();
  const [categorias, setCategorias] = useState([]);

  const onSubmit = (data) => {
    createProducto(data);
  };

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const responseCategorias = getCategorias();
    const categorias = await responseCategorias;
    setCategorias(categorias);
  };

  return (
    <Stack style={{ marginTop: "80px" }} alignItems={"center"}>
      <div className="milky">Nuevo Producto</div>
      <Box width={"500px"} height={"320px"} component={Paper}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <TextField
              sx={{ width: 300 }}
              id="nombreid"
              type="text"
              label="Nombre"
              required
              {...register("nombre")}
            ></TextField>
          </div>
          <div>
            <TextField
              sx={{ width: 300 }}
              id="precioid"
              type="text"
              label="Precio"
              required
              {...register("precio")}
            ></TextField>
          </div>
          <div>
            <TextField
              sx={{ width: 300 }}
              id="descripcionid"
              type="text"
              label="Descripcion"
              required
              {...register("descripcion")}
            ></TextField>
          </div>
          <div>
            <Select
                sx={{ width: 300 }}
                {...register("categoria")}
                required
                placeholder="Categoria"
            >
                {categorias.map(({ nombre, id }) => (
                <MenuItem value={id}  sx={{ width: 300 }}>
                    {`${nombre}`}
                </MenuItem>
                ))}
            </Select>
          </div>  
          <Button
            type="submit"
            variant="contained"
            color="success"
            sx={{ mt: "8px", mb: "4px", width: "300px" }}
          >
            Agregar
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="error"
            sx={{ mt: "8px", mb: "4px", width: "300px" }}
            component={Link}
            to="/productos"
          >
            Cancelar
          </Button>
        </form>
      </Box>
    </Stack>
  );
}