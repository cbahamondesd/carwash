import axios from "axios";
import Layout from "../../layout";
import {
    Avatar,
    Button,
    CssBaseline,
    Box,
    Typography,
    Container,
    Snackbar,
    Alert
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

import { useForm } from "react-hook-form";
import { useState , useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import styles from "./Ordenes.module.css";
import Navbar from "../../components/Navbar/Navbar";

const getFormattedPrice = (valor_servicio) => `$${valor_servicio.toFixed(0)}`; 

export default function RegistroOrden () {
  const {
        register,
        handleSubmit,
        formState: { errors },
  } = useForm(); // Inicializamos el hook de react-hook-form

  const navigate = useNavigate();
  const location = useLocation();
  const preselectedId = location.state?.preselectedId;

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

  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  const showSnackbar = (message, severity) => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  const handleOnChange = (position) => {
    console.log("position " + position);
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );

    setCheckedState(updatedCheckedState);

    const selectedServices = updatedCheckedState.reduce((acc, checked, index) => {
      if (checked) acc.push(listaserv[index]._id);
      return acc;
    }, []);
    setServicio(selectedServices);

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
    axios.get("http://localhost:8000/api/cliente")
    .then((res) => setListaCli(res.data))
    .catch((err) => console.log("Error al obtener clientes ", err));
  }, []);

  useEffect(() => {
    axios.get("http://localhost:8000/funcionarios")
    .then((res) => setListaEmpl(res.data))
    .catch((err) => console.log("Error al obtener funcionarios ", err));
  }, []);

  useEffect(() => {
    axios.get("http://localhost:8000/api/servicio/")
    .then((res) => setListaServ(res.data))
    .catch((err) => console.log("Error al obtener servicios ", err));
  }, []);

  useEffect(() => {
    const initial = new Array(listaserv.length).fill(false);
    if (preselectedId) {
      const idx = listaserv.findIndex((s) => s._id === preselectedId);
      if (idx !== -1) {
        initial[idx] = true;
        setServicio([preselectedId]);
        setTotal(listaserv[idx].valor_servicio);
      }
    }
    setCheckedState(initial);
  }, [listaserv]);


  const createorden = async (e) => {
    e.preventDefault();

    if (nombre !== "" && nombreFuncionario !== "" && servicio.length >= 1) {
      let data = {
        cliente: nombre,
        funcionario: nombreFuncionario,
        servicio: servicio,
        mtoTotal: total,
      };
      try {
        let result = await axios.post(
          "http://localhost:8000/api/orden/new",
          data
        );
        if (result.status === 200) {
            showSnackbar("Orden creada correctamente", "success");
            setTimeout(() => navigate("/"), 1500);
        }
      } catch (error) {
        showSnackbar(error.response?.data?.message || "Error al crear la orden", "error");
      }
    } else {
      showSnackbar("Favor completar el formulario y seleccionar al menos un servicio", "warning");
    }
  };

  const goToHome = () => {
    navigate("/");
  };

  const goToOrdenes = () => {
    navigate("/ordenes");
  };

  const verListaClientes = () => {
    navigate("/clientes");
  };
  
  return (
    <Layout>
      <Navbar 
        onClick1={goToHome}
        linkName1={"Inicio"}
        onClick2={verListaClientes}
        linkName2={"Clientes"}
        onClick3={goToOrdenes}
        linkName3={"Ordenes"}
      />
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
                <option key={cliente._id} value={cliente._id}>{cliente.nombre}</option>
            ))}
            </select>
          <label>Funcionario:</label>
            <select name="nombreFuncionario" onChange={(e) => setNombreFuncionario(e.target.value)}>
            <option>Seleccione</option>
            {listaempl.map((empleados) => (
                <option key={empleados._id} value={empleados._id}>{empleados.nombre} {empleados.apellido}</option>
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
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{
            width: "100%",
            backgroundColor: "#DFF150",
            color: "#33489E",
            "& .MuiAlert-icon": { color: "#CA3C25" },
            "& .MuiAlert-action .MuiIconButton-root": { color: "#33489E" },
          }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Layout>
  );
};
