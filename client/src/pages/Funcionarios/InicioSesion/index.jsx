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
import { useAuth } from "../../../context/AuthContext";
import { useNavigate, NavLink } from "react-router-dom";
import { useEffect } from "react";

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <NavLink color="inherit" to="/">
                LavAutos
            </NavLink>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

export default function SignIn() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const { signin, isAuthenticated, errors: loginErrors } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) navigate("/");
    }, [isAuthenticated, navigate]);

    const onSubmit = handleSubmit(async (values) => {
        await signin(values);
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
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Inicia sesión
                    </Typography>
                    {loginErrors.map((error, index) => (
                        <div key={index}>{error}</div>
                    ))}
                    <Box component="form" onSubmit={onSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Correo electrónico"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            color="secondary"
                            {...register("email", { required: true })}
                        />
                        {errors.email && (
                            <span>El email es requerido</span>
                        )}
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="Contraseña"
                            label="Contraseña"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            color="secondary"
                            {...register("password", { required: true })}
                        />
                        {errors.password && (
                            <span>La contraseña es requerida</span>
                        )}
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Iniciar sesión
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <NavLink to="/register" variant="body2">
                                    {"¿No tienes una cuenta? Regístrate"}
                                </NavLink>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 8, mb: 4 }} />
            </Container>
        </Layout>
    );
}
