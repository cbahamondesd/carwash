import React from 'react';
import logoBlanco from '../../assets/logo/Logo-auto-blanco.png';
import { 
    AppBar, 
    Container, 
    Toolbar, 
    Typography, 
    Button,
    Box
} from "@mui/material";


const Navbar = (props) => {
    
    return (
    <AppBar position="static" sx={{ backgroundColor: "#33489E" }}>
        <Container>
            <Toolbar sx={{display: "flex", justifyContent: "space-between"}}>
                <Box sx={{display: "flex", alignItems: "center"}}>
                    <img src={logoBlanco} alt="logo" className="logo" height={50}/>
                    <Typography variant="h4" component="div" sx={{ flexGrow: 1, fontWeight: "500",color: "whitesmoke", fontFamily: "Roots" }}>
                        LavAutos
                    </Typography>
                </Box>
                <Box sx={{display: "flex", alignItems: "center"}}>
                    <div className="buttonHeader">
                        <Button onClick={props.onClick1}>
                            {props.linkName1}    
                        </Button>
                        <Button onClick={props.onClick2}>
                            {props.linkName2}    
                        </Button>
                        <Button onClick={props.onClick3}>
                            {props.linkName3}    
                        </Button>
                    </div>
                </Box>

            </Toolbar>
        </Container>
    </AppBar>
    )
}
export default Navbar