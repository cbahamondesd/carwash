import Layout from "../../../layout";
import {
    Button,
    CssBaseline,
    TextField,
    Grid,
    Box,
    Typography,
    Container,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
} from '@mui/material';
import { useForm } from "react-hook-form";
import { useClientes } from "../../../context/ClientesContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function RegistroCliente() {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();
    const { registrarCliente } = useClientes();
    const navigate = useNavigate();
    const [dialog, setDialog] = useState(null); // null | "success" | "error"
    const [errorMsg, setErrorMsg] = useState("");

    const onSubmit = handleSubmit(async (values) => {
        const result = await registrarCliente({
            nombre: values.nombre,
            email: values.email,
            celular: values.celular,
            vehiculos: [{ patente: values.patente, tipoVehiculo: values.tipoVehiculo }],
        });
        if (result.success) {
            setDialog("success");
        } else {
            setErrorMsg(result.error);
            setDialog("error");
        }
    });

    return (
        <Layout>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Typography component="h1" variant="h5" fontWeight={600}>
                        Registrar Cliente
                    </Typography>
                    <Box component="form" noValidate onSubmit={onSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    {...register("nombre", { required: "El nombre es requerido" })}
                                    fullWidth
                                    id="nombre"
                                    label="Nombre"
                                    autoFocus
                                    error={!!errors.nombre}
                                    helperText={errors.nombre?.message}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    {...register("email", { required: "El email es requerido" })}
                                    fullWidth
                                    id="email"
                                    label="Email"
                                    error={!!errors.email}
                                    helperText={errors.email?.message}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    {...register("celular", {
                                        required: "El celular es requerido",
                                        pattern: {
                                            value: /^\d{9}$/,
                                            message: "El celular debe tener exactamente 9 dígitos"
                                        }
                                    })}
                                    fullWidth
                                    id="celular"
                                    label="Celular"
                                    inputProps={{ inputMode: "numeric" }}
                                    error={!!errors.celular}
                                    helperText={errors.celular?.message ?? "Ej: 912345678"}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    {...register("patente", { required: "La patente es requerida" })}
                                    fullWidth
                                    id="patente"
                                    label="Patente"
                                    error={!!errors.patente}
                                    helperText={errors.patente?.message}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    {...register("tipoVehiculo", { required: "El tipo de vehículo es requerido" })}
                                    fullWidth
                                    id="tipoVehiculo"
                                    label="Tipo de Vehículo"
                                    error={!!errors.tipoVehiculo}
                                    helperText={errors.tipoVehiculo?.message}
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Registrar Cliente
                        </Button>
                        <Button
                            fullWidth
                            variant="outlined"
                            onClick={() => navigate("/clientes")}
                        >
                            Cancelar
                        </Button>
                    </Box>
                </Box>
            </Container>

            {/* Success dialog */}
            <Dialog open={dialog === "success"}>
                <DialogTitle>Cliente registrado</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        El cliente fue registrado exitosamente.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" onClick={() => navigate("/clientes")}>
                        Ver listado
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Error dialog */}
            <Dialog open={dialog === "error"} onClose={() => { setDialog(null); reset(); }}>
                <DialogTitle>Error al registrar</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {errorMsg}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => { setDialog(null); reset(); }}>
                        Intentar de nuevo
                    </Button>
                </DialogActions>
            </Dialog>
        </Layout>
    );
}

export default RegistroCliente;
