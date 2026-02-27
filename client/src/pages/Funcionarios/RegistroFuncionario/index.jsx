import Layout from "../../../layout";
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

import { useForm } from "react-hook-form";

import { useAuth } from "../../../context/AuthContext"; // Importamos el contexto de usuario
import { useNavigate, NavLink } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "../../../components/Navbar/Navbar";

function Register() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm(); // Inicializamos el hook de react-hook-form
    const { signup, isAuthenticated, errors: RegisterErrors } = useAuth(); // Importamos la función signup del contexto de usuario
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) navigate("/");
    }, [isAuthenticated, navigate]);

    const onSubmit = handleSubmit(async (values) => {
        // Llamamos a la función signup del contexto auth (funcionario) con los valores del formulario
        await signup(values);
    });

    return (
        <Layout>
            <Navbar
            />
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
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
                Crear cuenta de funcionario
            </Typography>
            {RegisterErrors.map((error, index) => (
            <div key={index} >{error}
            </div>
            ))}
            <Box component="form" noValidate onSubmit={onSubmit} sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                    autoComplete="nombre"
                    name="nombre"
                    {...register("nombre", { required: true })}
                    fullWidth
                    id="nombre"
                    label="Nombre"
                    autoFocus
                    />
                    {errors.nombre && (
                    <span>El nombre es requerido</span>
                    )}
                </Grid>
                <Grid item xs={12}>
                    <TextField
                    autoComplete="apellido"
                    name="apellido"
                    {...register("apellido", { required: true })}
                    fullWidth
                    id="apellido"
                    label="Apellido"
                    autoFocus
                    />
                    {errors.apellido && (
                    <span>El apellido es requerido</span>
                    )}
                </Grid>
                <Grid item xs={12}>
                    <TextField
                    {...register("email", { required: true })}
                    fullWidth
                    id="email"
                    label="Correo electrónico"
                    name="email"
                    autoComplete="email"
                    />
                    {errors.email && (
                    <span>El correo electrónico es requerido</span>
                    )}
                </Grid>
                <Grid item xs={12}>
                    <TextField
                    {...register("password", { required: true })}
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    />
                    {errors.password && (
                    <span>La contraseña es requerida</span>
                    )}
                </Grid>
                </Grid>
                <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                >
                Registrarse
                </Button>
                <Grid container justifyContent="flex-end">
                <Grid item>
                    <NavLink to="/login" variant="body2">
                    ¿Ya tienes una cuenta? Inicia sesión
                    </NavLink>
                </Grid>
                </Grid>
            </Box>
            </Box>
        </Container>
        </Layout>
    );
}

export default Register;