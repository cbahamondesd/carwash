import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useClientes } from "../../../context/ClientesContext";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../../../layout";
import Navbar from "../../../components/Navbar/Navbar";
import { Container, Typography, TextField, Button, Box, Grid } from "@mui/material";

const EditarCliente = () => {
    const { id } = useParams();
    const { clientes, getClienteById, updateCliente } = useClientes();
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm();

    useEffect(() => {
        getClienteById(id);
    }, [id]);

    useEffect(() => {
        const cliente = clientes.find((c) => c._id === id);
        if (cliente) {
            setValue("nombre", cliente.nombre);
            setValue("email", cliente.email);
            setValue("celular", cliente.celular);
            const vehiculo = cliente.vehiculos?.[0];
            if (vehiculo) {
                setValue("patente", vehiculo.patente);
                setValue("tipoVehiculo", vehiculo.tipoVehiculo);
            }
        }
    }, [clientes, id]);

    const onSubmit = handleSubmit(async (values) => {
        await updateCliente({
            _id: id,
            nombre: values.nombre,
            email: values.email,
            celular: values.celular,
            vehiculos: [{ patente: values.patente, tipoVehiculo: values.tipoVehiculo }],
        });
        navigate("/clientes");
    });

    return (
        <Layout>
            <Navbar
                onClick1={() => navigate("/registro-orden")}
                linkName1={"Nueva Orden"}
                onClick2={() => navigate("/ordenes")}
                linkName2={"Ordenes"}
            />
            <Container maxWidth="sm" sx={{ mt: 4 }}>
                <Typography variant="h5" fontWeight={600} mb={3}>
                    Editar Cliente
                </Typography>
                <Box component="form" onSubmit={onSubmit} noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Nombre"
                                {...register("nombre", { required: "El nombre es obligatorio" })}
                                error={!!errors.nombre}
                                helperText={errors.nombre?.message}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Email"
                                {...register("email", { required: "El email es obligatorio" })}
                                error={!!errors.email}
                                helperText={errors.email?.message}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Celular"
                                {...register("celular", { required: "El celular es obligatorio" })}
                                error={!!errors.celular}
                                helperText={errors.celular?.message}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Patente"
                                {...register("patente", { required: "La patente es obligatoria" })}
                                error={!!errors.patente}
                                helperText={errors.patente?.message}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Tipo de Vehículo"
                                {...register("tipoVehiculo", { required: "El tipo de vehículo es obligatorio" })}
                                error={!!errors.tipoVehiculo}
                                helperText={errors.tipoVehiculo?.message}
                            />
                        </Grid>
                    </Grid>
                    <Box sx={{ display: "flex", gap: 2, mt: 3 }}>
                        <Button type="submit" variant="contained" fullWidth>
                            Guardar Cambios
                        </Button>
                        <Button variant="outlined" fullWidth onClick={() => navigate("/clientes")}>
                            Cancelar
                        </Button>
                    </Box>
                </Box>
            </Container>
        </Layout>
    );
};

export default EditarCliente;
