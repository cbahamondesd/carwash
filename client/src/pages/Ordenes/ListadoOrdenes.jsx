import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useOrdenes } from "../../context/OrdenesContext";
import axios from "axios";
import Layout from "../../layout";
import Navbar from "../../components/Navbar/Navbar";
import OrdenesFilter from "../../components/OrdenesFilter";
import { useSearchParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
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
  IconButton,
} from "@mui/material";
import { ButtonPrimary } from "../../components/ButtonComp/ButtonPrimary";
import DeleteIcon from "@mui/icons-material/Delete";

const estadoColors = {
  pendiente:    { backgroundColor: "#CA3C25", color: "#fff" },
  "en proceso": { backgroundColor: "#BDD5EA", color: "#333" },
  aceptada:     { backgroundColor: "#DFF150", color: "#333" },
  cancelada:    { backgroundColor: "#639A88", color: "#fff" },
  completada:   { backgroundColor: "#33489E", color: "#fff" },
};

export default function ListadoOrdenes() {
  const navigate = useNavigate();
  const { deleteOrden } = useOrdenes();
  const [ordenes, setOrdenes] = useState([]);
  const [filteredOrdenes, setFilteredOrdenes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const { funcionario, loading: authLoading } = useAuth();
  const misOrdenes = searchParams.get("mias") === "true";

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

  const handleDelete = async (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar esta orden?")) {
      await deleteOrden(id);
      setOrdenes(prev => prev.filter(o => o._id !== id));
      setFilteredOrdenes(prev => prev.filter(o => o._id !== id));
    }
  }

  useEffect(() => {
    if (misOrdenes && authLoading) return;
    setLoading(true);
    const params = misOrdenes && funcionario?._id ? { funcionarioId: funcionario._id } : {};
    axios
      .get("http://localhost:8000/api/orden/get", { params })
      .then((res) => {
        setOrdenes(res.data);
        setFilteredOrdenes(res.data);
      })
      .catch((err) => console.log("Error al obtener ordenes", err))
      .finally(() => setLoading(false));
  }, [misOrdenes, funcionario, authLoading]);

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
          {misOrdenes ? "Mis Órdenes" : "Listado de Órdenes"}
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
                  {["Fecha", "Cliente", "Servicios", "Total", "Estado", "Eliminar","Funcionario"].map((h) => (
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
                      <IconButton color="error" onClick={() => handleDelete(orden._id)}>
                        <DeleteIcon />
                      </IconButton>
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
        <Box sx={{ display: "flex", justifyContent: "center", my: 2, width: "100%" }}>
          <ButtonPrimary onClick={() => { misOrdenes ? navigate("/ordenes") : navigate("/ordenes?mias=true") }} sx={{ minWidth: "200px" }}>
            {misOrdenes ? "Ver todas las órdenes" : "Ver mis órdenes" }
          </ButtonPrimary>
        </Box>
      </Container>
    </Layout>
  );
}
