import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Layout from "../../layout";
import Navbar from "../../components/Navbar/Navbar";
import OrdenesFilter from "../../components/OrdenesFilter";
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Box,
} from "@mui/material";

const estadoColors = {
  pendiente:    { backgroundColor: "#CA3C25", color: "#fff" },
  "en proceso": { backgroundColor: "#BDD5EA", color: "#333" },
  aceptada:     { backgroundColor: "#DFF150", color: "#333" },
  cancelada:    { backgroundColor: "#639A88", color: "#fff" },
  completada:   { backgroundColor: "#33489E", color: "#fff" },
};

export default function ListadoOrdenes() {
  const navigate = useNavigate();
  const [ordenes, setOrdenes] = useState([]);
  const [filteredOrdenes, setFilteredOrdenes] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleEstadoChange = async (id, nuevoEstado) => {
    setOrdenes(prev =>
      prev.map(o => o._id === id ? { ...o, estado: nuevoEstado } : o)
    );
    await fetch(`http://localhost:8000/api/orden/update/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ estado: nuevoEstado }),
    });
  };

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/orden/get")
      .then((res) => {
        setOrdenes(res.data);
        setFilteredOrdenes(res.data);
      })
      .catch((err) => console.log("Error al obtener ordenes", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Layout>
      <Navbar
        onClick1={() => navigate("/registro-orden")}
        linkName1={"Nueva Orden"}
        onClick2={() => navigate("/clientes")}
        linkName2={"Clientes"}
      />
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Typography variant="h5" fontWeight={600} mb={3}>
          Listado de Órdenes
        </Typography>

        <OrdenesFilter ordenes={ordenes} setFilteredOrdenes={setFilteredOrdenes} />

        {loading ? (
          <Box display="flex" justifyContent="center" mt={6}>
            <CircularProgress sx={{ color: "#33489E" }} />
          </Box>
        ) : ordenes.length === 0 ? (
          <Typography color="text.secondary">No hay órdenes registradas.</Typography>
        ) : (
          <TableContainer component={Paper}>
            <Table>
              <TableHead sx={{ backgroundColor: "#33489E" }}>
                <TableRow>
                  {["Fecha", "Cliente", "Servicios", "Total", "Estado", "Funcionario"].map((h) => (
                    <TableCell key={h} sx={{ color: "#DFF150", fontWeight: 700 }}>
                      {h}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredOrdenes.map((orden) => (
                  <TableRow key={orden._id} hover>
                    <TableCell>
                      {new Date(orden.fecha).toLocaleDateString("es-CL")}
                    </TableCell>
                    <TableCell>{orden.cliente?.nombre ?? "—"}</TableCell>
                    <TableCell>
                      {orden.servicio?.map((s) => s.descripcion).join(", ") || "—"}
                    </TableCell>
                    <TableCell>${orden.mtoTotal?.toLocaleString("es-CL")}</TableCell>
                    <TableCell>
                      <select
                        value={orden.estado || "aceptada"}
                        onChange={(e) => handleEstadoChange(orden._id, e.target.value)}
                        style={{
                          ...(estadoColors[orden.estado] ?? {}),
                          borderRadius: "4px",
                          padding: "4px 8px",
                          border: "none",
                          fontWeight: 600,
                          cursor: "pointer",
                        }}
                      >
                        <option value="pendiente" sx={{ backgroundColor: "#FFA500" }}>pendiente</option>
                        <option value="en proceso">en proceso</option>
                        <option value="cancelada">cancelada</option>
                        <option value="aceptada">aceptada</option>
                        <option value="completada">completada</option>
                      </select>
                    </TableCell>
                    <TableCell>
                      {orden.funcionario
                        ? `${orden.funcionario.nombre} ${orden.funcionario.apellido}`
                        : "—"}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Container>
    </Layout>
  );
}
