import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import logoBlanco from '../../assets/logo/Logo-auto-blanco.png';
import MenuIcon from '@mui/icons-material/Menu';
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    Box,
    Link,
    IconButton,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
} from "@mui/material";


const Navbar = (props) => {
    const { isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();
    const [drawerOpen, setDrawerOpen] = useState(false);

    const navItems = [
        props.linkName1 && { label: props.linkName1, onClick: props.onClick1 },
        props.linkName2 && { label: props.linkName2, onClick: props.onClick2 },
        props.linkName3 && { label: props.linkName3, onClick: props.onClick3 },
        isAuthenticated
            ? { label: "Cerrar sesión", onClick: logout }
            : { label: "Iniciar sesión", onClick: () => navigate("/login") },
    ].filter(Boolean);

    return (
    <AppBar position="static" sx={{ backgroundColor: "#33489E", width: "100%"}}>
            <Toolbar sx={{ maxWidth: "72rem", width: "100%", mx: "auto", display: "flex", justifyContent: "space-between" }}>
                <Box sx={{display: "flex", alignItems: "center", py: "10px"}}>
                    <Link href="/" sx={{display: "flex", alignItems: "center", textDecoration: "none"}}>
                        <img src={logoBlanco} alt="logo" className="logo" height={50}/>
                        <Typography variant="h3" component="div" sx={{ flexGrow: 1, fontWeight: "normal", color: "whitesmoke", fontFamily: "Roots, sans-serif", alignSelf: "flex-end" }}>
                            LavAutos
                        </Typography>
                    </Link>
                </Box>

                {/* Desktop nav buttons */}
                <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "center" }}>
                    {props.linkName1 && <Button onClick={props.onClick1}>{props.linkName1}</Button>}
                    {props.linkName2 && <Button onClick={props.onClick2}>{props.linkName2}</Button>}
                    {props.linkName3 && <Button onClick={props.onClick3}>{props.linkName3}</Button>}
                    {isAuthenticated
                        ? <Button onClick={logout} sx={{ fontStyle: "italic", textTransform: "lowercase" }}>Cerrar sesión</Button>
                        : <Button onClick={() => navigate("/login")} sx={{ textTransform: "lowercase" }}>Iniciar sesión</Button>
                    }
                </Box>

                {/* Mobile hamburger icon */}
                <IconButton
                    sx={{ display: { xs: "flex", md: "none" }, color: "white" }}
                    onClick={() => setDrawerOpen(true)}
                >
                    <MenuIcon />
                </IconButton>

                {/* Mobile drawer */}
                <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
                    <Box sx={{ width: 220 }} role="presentation" onClick={() => setDrawerOpen(false)}>
                        <List>
                            {navItems.map((item) => (
                                <ListItem key={item.label} disablePadding>
                                    <ListItemButton onClick={item.onClick}>
                                        <ListItemText primary={item.label} />
                                    </ListItemButton>
                                </ListItem>
                            ))}
                        </List>
                    </Box>
                </Drawer>

            </Toolbar>
    </AppBar>
    )
}
export default Navbar