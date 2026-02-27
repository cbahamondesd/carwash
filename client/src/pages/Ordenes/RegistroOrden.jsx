import axios from "axios";
import Layout from "../../layout";
import {
    Button,
    Box,
    Typography,
    Container,
    Snackbar,
    Alert,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Checkbox,
    FormControlLabel,
    Paper,
    Divider,
    Stack,
} from '@mui/material';

import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";

const getFormattedPrice = (valor_servicio) => `$${valor_servicio.toFixed(0)}`;

export default function RegistroOrden() {
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
        if (currentState === true) return sum + listaserv[index].valor_servicio;
        return sum;
      },
      0
    );
    setTotal(totalPrice);
  };

  useEffect(() => {
    axios.get("http://localhost:8000/api/cliente", { withCredentials: true })
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
        let result = await axios.post("http://localhost:8000/api/orden/new", data);
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

  return (
    <Layout>
      <Navbar
        onClick1={() => navigate("/")}
        linkName1={"Inicio"}
        onClick2={() => navigate("/clientes")}
        linkName2={"Clientes"}
        onClick3={() => navigate("/ordenes")}
        linkName3={"Ordenes"}
      />
      <Container maxWidth="sm" sx={{ mt: 4 }}>
        <Typography variant="h5" fontWeight={600} mb={3}>
          Registro de Orden de Servicio
        </Typography>

        <Paper elevation={2} sx={{ p: 3 }}>
          <Box component="form" onSubmit={createorden}>
            <Stack spacing={3}>

              {/* Cliente */}
              <FormControl fullWidth>
                <InputLabel id="cliente-label">Cliente</InputLabel>
                <Select
                  labelId="cliente-label"
                  value={nombre}
                  label="Cliente"
                  onChange={(e) => setNombre(e.target.value)}
                >
                  <MenuItem value="" disabled>Seleccione</MenuItem>
                  {listacli.map((cliente) => (
                    <MenuItem key={cliente._id} value={cliente._id}>
                      {cliente.nombre}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              {/* Funcionario */}
              <FormControl fullWidth>
                <InputLabel id="funcionario-label">Funcionaria(o) asignada(o)</InputLabel>
                <Select
                  labelId="funcionario-label"
                  value={nombreFuncionario}
                  label="Funcionaria(o) asignada(o)"
                  onChange={(e) => setNombreFuncionario(e.target.value)}
                >
                  <MenuItem value="" disabled>Seleccione</MenuItem>
                  {listaempl.map((emp) => (
                    <MenuItem key={emp._id} value={emp._id}>
                      {emp.nombre} {emp.apellido}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              {/* Servicios */}
              <Box>
                <Typography variant="subtitle1" fontWeight={600} mb={1}>
                  Servicios
                </Typography>
                <Stack spacing={0.5}>
                  {listaserv.map(({ descripcion, valor_servicio }, index) => (
                    <Box
                      key={index}
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        borderBottom: "1px solid",
                        borderColor: "divider",
                        py: 0.5,
                      }}
                    >
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={checkedState[index] ?? false}
                            onChange={() => handleOnChange(index)}
                            size="small"
                          />
                        }
                        label={descripcion}
                      />
                      <Typography variant="body2" color="text.secondary">
                        {getFormattedPrice(valor_servicio)}
                      </Typography>
                    </Box>
                  ))}
                </Stack>

                <Divider sx={{ my: 1.5 }} />
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography fontWeight={600}>Total</Typography>
                  <Typography fontWeight={600}>{getFormattedPrice(total)}</Typography>
                </Box>
              </Box>

              <Button type="submit" variant="contained" fullWidth>
                Crear Orden
              </Button>

            </Stack>
          </Box>
        </Paper>
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
}
