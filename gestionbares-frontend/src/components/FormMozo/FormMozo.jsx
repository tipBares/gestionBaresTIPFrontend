import { Link, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Box, Button, TextField } from "@mui/material";
import React from "react";
import Paper from "@mui/material/Paper";
import { Stack } from "@mui/system";
import "./FormMozo.scss";
import { createMozo, editMozo, getMozoById } from "../../services/mozo-service";
import { useState } from "react";
import { useEffect } from "react";

export default function FormMozo(props) {
  //esto es lo viejo mio del componente
  //const navigate = useNavigate();
  let { id } = useParams();
  const { register, handleSubmit } = useForm();
  //este onsubmit es el original
  // const onSubmit = (data) => {
  //   createMozo(data);
  // };
  const onSubmit = async (data) => {
    if (!id) {
      createMozo({ nombre, apellido, nick });
    } else {
      editMozo(id, { nombre, apellido, nick });
    }
  };

  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [nick, setNick] = useState("");

  useEffect(() => {
    const getData = async () => {
      const response = await getMozoById(id);
      setNombre(response.nombre);
      setApellido(response.apellido);
      setNick(response.nick);
    };
    if (id) {
      getData();
    }
  }, [id]);

  return (
    <Stack style={{ marginTop: "100px" }} alignItems={"center"}>
      <div className="milky">{id ? "Editar Mozo" : "Nuevo Mozo"}</div>
      <Box width={"500px"} height={"280px"} component={Paper}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <TextField
              sx={{ width: 300 }}
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
              sx={{ width: 300 }}
              id="apellidoid"
              type="text"
              label="Apellido"
              value={apellido}
              required
              {...register("apellido", {
                onChange: (event) => {
                  setApellido(event.target.value);
                },
              })}
            ></TextField>
          </div>
          <div>
            <TextField
              sx={{ width: 300 }}
              id="nickid"
              type="text"
              label="Nick"
              value={nick}
              required
              {...register("nick", {
                onChange: (event) => {
                  setNick(event.target.value);
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
            sx={{ mt: "8px", mb: "4px", width: "300px" }}
            component={Link}
            to="/mozos"
          >
            Cancelar
          </Button>
        </form>
      </Box>
    </Stack>
  );
}
