import axios from "axios";
import Layout from "../../layout";
import * as React from 'react';
import { 
    Avatar,
    Button,
    CssBaseline,
    TextField,
    Grid,
    Box,
    Typography,
    Container 
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

import { useForm } from "react-hook-form"; // Importamos el hook de react-hook-form

import { useState , useEffect } from "react";
import { useNavigate } from "react-router-dom";

import styles from "./Ordenes.module.css";

const getFormattedPrice = (valor_servicio) => `$${valor_servicio.toFixed(0)}`; 

export default function RegistroOrden () {
  const {
        register,
        handleSubmit,
        formState: { errors },
  } = useForm(); // Inicializamos el hook de react-hook-form

  const navigate = useNavigate();

  const [nombre, setNombre] = useState("");
  const [nombreFuncionario, setNombreFuncionario] = useState("");
  const [servicio, setServicio] = useState([]);
  const [listaserv, setListaServ] = useState([]);
  const [listacli, setListaCli] = useState([]);
  const [listaempl, setListaEmpl] = useState([]);
  const [checkedState, setCheckedState] = useState(
    new Array(listaserv.length).fill(false)
  );

  const [total, setTotal] = useState(0);

  const handleOnChange = (position) => {
    console.log("position " + position);
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );

    setCheckedState(updatedCheckedState);

    const totalPrice = updatedCheckedState.reduce(
      (sum, currentState, index) => {
        if (currentState === true) {
          console.log("entro");
          return sum + listaserv[index].valor_servicio;
        }
        return sum;
      },
      0
    );

    setTotal(totalPrice);
  };

  useEffect(() => {
    axios.get("http://localhost:8000/api/cliente/get/")
    .then((res) => setListaCli(res.data))
    .catch((err) => console.log("Error al obtener clientes ", err));
  }, []);

  useEffect(() => {
    axios.get("http://localhost:8000/api/personal/get")
    .then((res) => setListaEmpl(res.data))
    .catch((err) => console.log("Error al obtener funcionarios ", err));
  }, []);

  useEffect(() => {
    axios.get("http://localhost:8000/api/servicio/")
    .then((res) => setListaServ(res.data))
    .catch((err) => console.log("Error al obtener servicios ", err));
  }, []);


  const createorden = async () => {
    //Obtener arreglo de servicios seleccionados
    alert("setCheckedState " + setCheckedState.length);
    return(false);

    if (nombre !== "" && nombreFuncionario !== "" ) {
      let data = {
        cliente: nombre,
        funcionario: nombreFuncionario,
        servicio: servicio,
      };
      try {
        let result = await axios.post(
          "http://localhost:8000/api/orden/new",
          data
        );
        if (result.status === 200) {
            alert("Orden creada correctamente");
            navigate("/");
        }
      } catch (error) {
        alert(error.response.data.message);
      }
    } else {
       alert("Favor completar formulario de registro");
    }
  };

  const goToHome = () => {
    navigate("/");
  };

  
  return (
    <Layout>
     <Container component="main" maxWidth="sm">
            <CssBaseline />
            <Box
            sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
            >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
                Registro Ordenes de Servicio
            </Typography>
           
    <div className={styles.formContainer}>
        <form onSubmit={createorden}>
          <label>Cliente:</label>
            <select name="nombre" onChange={(e) => setNombre(e.target.value)}>
            <option>Seleccione</option>
            {listacli.map((cliente) => (
                <option value={cliente._id}>{cliente.nombre}</option>
            ))}
            </select>
          <label>Funcionario:</label>
            <select name="nombreFuncionario" onChange={(e) => setNombreFuncionario(e.target.value)}>
            <option>Seleccione</option>
            {listaempl.map((empleados) => (
                <option value={empleados._id}>{empleados.nombreFuncionario}</option>
            ))}
          </select>
          <label>Servicio:</label>
          <div>
            <ul className="toppings-list">
            {listaserv.map(({ descripcion, valor_servicio }, index) => {
            return (
            <li key={index}>
              <div className="toppings-list-item">
                <div className="left-section">
                  <input
                    type="checkbox"
                    id={`custom-checkbox-${index}`}
                    name={descripcion}
                    value={descripcion}
                    checked={checkedState[index]}
                    onChange={() => handleOnChange(index)}
                  />
                  <label htmlFor={`custom-checkbox-${index}`}>{descripcion}</label>
                </div>
                <div className="right-section">{getFormattedPrice(valor_servicio)}</div>
              </div>
            </li>
            );
            })}
            
            </ul>
          
            <div className="toppings-list-item">
              <div className="left-section">Total:</div>
              <div className="right-section">{getFormattedPrice(total)}</div>
            </div>
          </div>

          <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                >
                Crear Orden
                </Button>
        </form>
     </div>    
        </Box>
        </Container>
    </Layout>
  );
};
