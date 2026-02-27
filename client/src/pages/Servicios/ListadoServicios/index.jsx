import { useServicios } from "../../../context/ServiciosContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../../layout";
import Navbar from "../../../components/Navbar/Navbar";
import {
    Container,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableContainer,
    TableBody,
    Button,
    Typography,
    Paper,
    Box,
} from '@mui/material';
import { ButtonComp } from "../../../components/ButtonComp/ButtonComp";

const ServiciosList = () => {
    const { servicios, getAllServicios } = useServicios();
    const navigate = useNavigate();

    useEffect(() => {
        getAllServicios();
    }, []);

    return (
        <Layout>
            <Navbar
                onClick1={() => navigate("/")}
                linkName1={"Inicio"}
                onClick2={() => navigate("/registro-orden")}
                linkName2={"Nueva Orden"}
                onClick3={() => navigate("/ordenes")}
                linkName3={"Ordenes"}
            />
            <Container maxWidth="lg" sx={{ mt: 4 }}>
                <Typography variant="h5" fontWeight={600} mb={3}>
                    Servicios disponibles
                </Typography>

                {servicios.length === 0 ? (
                    <Typography color="text.secondary">No hay servicios registrados.</Typography>
                ) : (
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead sx={{ backgroundColor: "#33489E" }}>
                                <TableRow>
                                    {["Servicio", "Valor", "Acciones"].map((h) => (
                                        <TableCell key={h} sx={{ color: "#DFF150", fontWeight: 700 }}>
                                            {h}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {servicios.map((item) => (
                                    <TableRow key={item._id} hover>
                                        <TableCell>{item.descripcion}</TableCell>
                                        <TableCell>${item.valor_servicio?.toLocaleString("es-CL")}</TableCell>
                                        <TableCell>
                                            <ButtonComp
                                                variant="contained"
                                                name="Nueva orden"
                                                onClick={() => navigate("/registro-orden", { state: { preselectedId: item._id } })}
                                            >
                                                Nueva orden
                                            </ButtonComp>
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
};

export default ServiciosList;
