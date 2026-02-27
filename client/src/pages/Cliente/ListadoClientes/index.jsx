import { useClientes } from "../../../context/ClientesContext";
import { useEffect, useState } from "react";
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
    Typography,
    Paper,
    Box,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button
} from '@mui/material';
import { ButtonSecondary } from "../../../components/ButtonComp/ButtonSecondary";
import { ButtonPrimary } from "../../../components/ButtonComp/ButtonPrimary";

const ListadoClientes = () => {
    const { clientes, getAllClientes, deleteCliente } = useClientes();
    const navigate = useNavigate();
    const [confirmId, setConfirmId] = useState(null);

    useEffect(() => {
        getAllClientes();
    }, []);

    return (
        <Layout>
            <Navbar
                onClick1={() => navigate("/registro-orden")}
                linkName1={"Nueva Orden"}
                onClick2={() => navigate("/ordenes")}
                linkName2={"Ordenes"}
            />
            <Container maxWidth="lg" sx={{ mt: 4 }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
                    <Typography variant="h5" fontWeight={600}>
                        Clientes registrados
                    </Typography>
                    <ButtonPrimary
                        name="Registrar Cliente"
                        onClick={() => navigate("/clientes/registro")}
                    />
                </Box>

                {clientes.length === 0 ? (
                    <Typography color="text.secondary">No hay clientes registrados.</Typography>
                ) : (
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead sx={{ backgroundColor: "#33489E" }}>
                                <TableRow>
                                    {["Nombre", "Teléfono", "Acciones"].map((h) => (
                                        <TableCell key={h} sx={{ color: "#DFF150", fontWeight: 700 }}>
                                            {h}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {clientes.map((item) => (
                                    <TableRow key={item._id} hover>
                                        <TableCell>{item.nombre}</TableCell>
                                        <TableCell>{item.celular}</TableCell>
                                        <TableCell sx={{ display: "flex", gap: 2, minHeight: "50px" }}>
                                            <ButtonSecondary
                                                name="Editar"
                                                onClick={() => navigate(`/clientes/edit/${item._id}`)}
                                            />
                                            <ButtonSecondary
                                                name="Eliminar"
                                                onClick={() => setConfirmId(item._id)}
                                            />
                                            <ButtonSecondary
                                                name="Ver ordenes"
                                                onClick={() => navigate(`/ordenes`)}
                                            />
                                            <ButtonSecondary
                                                name="Nueva orden"
                                                onClick={() => navigate(`/registro-orden`, { state: { clienteId: item._id } })}
                                            />
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )}
            </Container>
            <Dialog open={!!confirmId} onClose={() => setConfirmId(null)}>
                <DialogTitle>Eliminar cliente</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        ¿Estás seguro de que deseas eliminar este cliente? Esta acción no se puede deshacer.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setConfirmId(null)} color="secondary">Cancelar</Button>
                    <Button
                        color="error"
                        variant="contained"
                        onClick={() => {
                            deleteCliente(confirmId);
                            setConfirmId(null);
                        }}
                    >
                        Eliminar
                    </Button>
                </DialogActions>
            </Dialog>
        </Layout>
    );
};

export default ListadoClientes;