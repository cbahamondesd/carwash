import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { capitalizeTransform } from '../../Helpers/helpers';
import axios from "axios";
import Navbar from "../../Components/Navbar/Navbar";
import {
  Button,
  Paper,
  Container,
  Box
} from '@mui/material';
import washImg from '../../Assets/img/wash.jpg';
import vacuumImg from '../../Assets/img/vacuum.jpg';
import waxImg from '../../Assets/img/wax.jpg';



export const HomePage = () => {
  const navigate = useNavigate();

  const goToEdit = (servicioId) => {
    navigate(`/servicio/update/${servicioId}`);
  };

  const goToDetails = (servicioId) => {
    navigate(`/servicio/${servicioId}`);
  };

  const irAlCarrito = () => {
    navigate("/checkout");
  };


  return (
    <Container sx={{ height: "100vh"}}>
      <Navbar
        onClick1={irAlCarrito}
        linkName1={"Mi perfil"}
        onClick2={irAlCarrito}
        linkName2={"Servicios"}
        onClick3={irAlCarrito}
        linkName3={"Carro de compras"}
      />
      <Box sx={{
        backgroundColor: "primary.main",
        height: "90vh",
        display: "flex",
        paddingTop: "20px",
        paddingBottom: "20px"
        }}>

          <Box sx={{ flex: 1, padding: "20px", overflow: "hidden" }}>
            <img src={ washImg } alt="Wash" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "20px" }} />
            <Button variant="contained" onClick={goToDetails} sx={{ position: "absolute", top: "85%", left: "23%", transform: "translate(-50%, -50%)" }}>
              + Lavado exterior $1000
            </Button>
          </Box>
          <Box sx={{ flex: 1, padding: "20px", borderRadius: "20px", overflow: "hidden" }}>
            <img src={ vacuumImg } alt="Wash" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "20px" }} />
            <Button variant="contained" onClick={goToDetails} sx={{ position: "absolute", top: "85%", left: "50%", transform: "translate(-50%, -50%)" }}>
            + Lavado completo $2000
            </Button>
          </Box>
          <Box sx={{ flex: 1, padding: "20px", borderRadius: "20px", overflow: "hidden" }}>
            <img src={ waxImg } alt="Wash" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "20px" }} />
            <Button variant="contained" onClick={goToDetails} sx={{ position: "absolute", top: "85%", left: "77%", transform: "translate(-50%, -50%)" }}>
              + Encerado $1200
            </Button>
          </Box>
      </Box>
    </Container>
  );
};