import { Link, useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Box, Button, TextField } from "@mui/material";
import React from "react";
import Paper from "@mui/material/Paper";
import { Stack } from "@mui/system";
import "./FormCategoria.scss";
import {
  createCategoria,
  editCategoria,
  getCategoriaById,
} from "../../services/categoria-service";
import { useState } from "react";
import { useEffect } from "react";

export default function FormCategoria() {
  const navigate = useNavigate();
  let { id } = useParams();
  const { register, handleSubmit } = useForm();
  const onSubmit = async () => {
    if (!id) {
      createCategoria({ nombre });
    } else {
      editCategoria(id, { nombre });
    }
  };

  const [nombre, setNombre] = useState("");

  useEffect(() => {
    const getData = async () => {
      const response = await getCategoriaById(id);
      setNombre(response.nombre);
    };
    if (id) {
      getData();
    }
  }, [id]);

  return (
    <Stack style={{ marginTop: "100px" }} alignItems={"center"}>
      <div className="milky">{id ? "Editar Categoria" : "Nueva categoria"}</div>
      <Box width={"500px"} height={"180px"} component={Paper}>
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
            onClick={() => navigate("/categorias")}
          >
            Cancelar
          </Button>
        </form>
      </Box>
    </Stack>
  );
}
