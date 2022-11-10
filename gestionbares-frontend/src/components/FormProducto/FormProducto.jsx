import { Link, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  Box,
  Button,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import React from "react";
import Paper from "@mui/material/Paper";
import { Stack } from "@mui/system";
import "./FormProducto.scss";
import { useEffect, useState } from "react";
import {
  createProducto,
  editProducto,
  getProductoById,
} from "../../services/producto_service";

import {
  getCategorias,
  getCategoriasAll,
} from "../../services/categoria-service";

export default function FormProducto(props) {
  let { id } = useParams();
  const { register, handleSubmit } = useForm();
  const [categorias, setCategorias] = useState([]);

  const onSubmit = (data) => {
    if (!id) {
      createProducto({ nombre, precio, descripcion, categoria });
    } else {
      editProducto(id, { nombre, precio, descripcion, categoria });
    }
  };

  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [categoria, setCategoria] = useState("");

  useEffect(() => {
    const getData = async () => {
      const response = await getProductoById(id);
      console.log(response);
      setNombre(response.nombre);
      setPrecio(response.precio);
      setDescripcion(response.descripcion);
      setCategoria(response.categoria.id);
    };
    const getCategoriasAux = async () => {
      const responseCategorias = getCategoriasAll();
      const categorias = await responseCategorias;
      setCategorias(categorias);
    };
    if (id) {
      getData();
    }
    getCategoriasAux();
  }, [id]);

  return (
    <Stack style={{ marginTop: "100px" }} alignItems={"center"}>
      <div className="milky">{id ? "Editar Producto" : "Nuevo producto"}</div>
      <Box width={"500px"} height={"340px"} component={Paper}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <TextField
              sx={{ width: 300, marginTop: 2, marginBottom: 1 }}
              id="nombreid"
              type="text"
              label="Nombre"
              value={nombre}
              required
              {...register("nombre", {
                onChange: (event) => {
                  setNombre(event.target.value);
                },
              })}
            ></TextField>
          </div>
          <div>
            <TextField
              sx={{ width: 300, marginBottom: 1 }}
              id="precioid"
              type="text"
              label="Precio"
              value={precio}
              required
              {...register("precio", {
                onChange: (event) => {
                  setPrecio(event.target.value);
                },
              })}
            ></TextField>
          </div>
          <div>
            <TextField
              sx={{ width: 300, marginBottom: 1 }}
              id="descripcionid"
              type="text"
              label="Descripcion"
              value={descripcion}
              required
              {...register("descripcion", {
                onChange: (event) => {
                  setDescripcion(event.target.value);
                },
              })}
            ></TextField>
          </div>
          <div>
            <FormControl>
              <InputLabel id="demo-simple-select-label">
                Seleccionar categoria
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                sx={{ width: 300 }}
                value={categoria}
                required
                {...register("categoria", {
                  onChange: (event) => {
                    setCategoria(event.target.value);
                  },
                })}
                placeholder="Categoria"
              >
                <MenuItem disabled={"true"} value="">
                  Seleccionar categoria
                </MenuItem>
                {categorias.map(({ nombre, id }) => (
                  <MenuItem value={id} sx={{ width: 300 }}>
                    {`${nombre}`}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
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
