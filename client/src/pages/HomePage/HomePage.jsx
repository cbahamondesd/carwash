import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Navbar from "../../components/Navbar/Navbar";
import {
  Button,
  Box,
  Typography
} from '@mui/material';
import vacuumImg from '../../assets/img/vacuum.jpg';
import waxImg from '../../assets/img/wax.jpg';
import hoseImg from '../../assets/img/hose.png';



export const HomePage = () => {
  const navigate = useNavigate();
  const { isAuthenticated, funcionario } = useAuth();

  return (
    <Box sx={{ height: "100vh", backgroundColor: "primary.main", display: "flex", flexDirection: "column" }}>
      <Navbar
        onClick1={isAuthenticated ? () => navigate("/registro-orden") : null}
        linkName1={isAuthenticated ? "Nueva Orden" : null}
        onClick2={() => navigate("/servicios")}
        linkName2={"Servicios"}
        onClick3={isAuthenticated ? () => navigate("/ordenes") : null}
        linkName3={isAuthenticated ? "Ordenes" : null}
        onClick4={isAuthenticated ? () => navigate("/clientes") : null}
        linkName4={isAuthenticated ? "Clientes" : null}
      />
      <Box sx={{ flex: 1, minHeight: 0, maxWidth: "72rem", mx: "auto", py: {xs: "15px", md: "30px"}, px: {xs: "15px", lg: "0px"}, display: "flex", gap: {xs: "15px", md: "30px"}, flexDirection: { xs: "column", md: "row" } }}>
        <Box sx={{ flex: 1, position: "relative", borderRadius: {xs: "20px", md: "40px"}, overflow: "hidden", boxShadow: "0px 8px 24px rgba(0,0,0,0.3)" }}>
          <img src={ waxImg } alt="Wash" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "20px" }} />
        </Box>
        <Box sx={{ position: "relative", flex: 1, borderRadius: {xs: "20px", md: "40px"}, overflow: "hidden", boxShadow: "0px 8px 24px rgba(0,0,0,0.3)" }}>
        <img src={hoseImg} alt="Man washing car with a hose" style={{ width: "100%", height: "100%", objectFit: "cover"}} />
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "white",
              mixBlendMode: "soft-light",
              pointerEvents: "none",
              opacity: .6
            }}
          />
          {isAuthenticated ? (
        <Box sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
          }}>
            <Typography variant="h4" sx={{ color: "secondary.main", fontSize: "48px", fontWeight: "bold" }}>
              Hola, {funcionario.nombre}!
            </Typography>
            <Button variant="contained" onClick={() => navigate("/ordenes?mias=true")} sx={{ whiteSpace: "nowrap", minWidth: "180px" }}>
              Ver mis órdenes
            </Button>
          </Box>

          ) : (

          <Box sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
          }}>
            <Button variant="contained" onClick={() => navigate("/login")} sx={{ whiteSpace: "nowrap", minWidth: "180px" }}>
              Iniciar sesión
            </Button>
            <Button variant="contained" onClick={() => navigate("/register")} sx={{ whiteSpace: "nowrap", minWidth: "180px" }}>
              Crear una cuenta
            </Button>
          </Box>
          )
        }
        </Box>
          <Box sx={{ flex: 1, position: "relative", borderRadius: {xs: "20px", md: "40px"}, overflow: "hidden", boxShadow: "0px 8px 24px rgba(0,0,0,0.3)" }}>
            <img src={ vacuumImg } alt="Wash" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "20px" }} />
          </Box>
      </Box>
    </Box>
  );
};

/*
           <Box sx={{ flex: 1, position: "relative", borderRadius: "40px", overflow: "hidden", minHeight: { xs: "250px", md: "auto" }, boxShadow: "0px 8px 24px rgba(0,0,0,0.3)" }}>
            <img src={ washImg } alt="Wash" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "20px" }} />
            <Button variant="contained" onClick={() => goToOrdenWithService("699ddb874ae3e995862be3e8")} sx={{ position: "absolute", bottom: "20px", left: "50%", transform: "translateX(-50%)", whiteSpace: "nowrap" }}>
              + Lavado exterior $17000
            </Button>
          </Box>
          <Box sx={{ flex: 1, position: "relative", borderRadius: "40px", overflow: "hidden", minHeight: { xs: "250px", md: "auto" }, boxShadow: "0px 8px 24px rgba(0,0,0,0.3)" }}>
            <img src={ vacuumImg } alt="Wash" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "20px" }} />
            <Button variant="contained" onClick={() => goToOrdenWithService("699ddb964ae3e995862be3ea")} sx={{ position: "absolute", bottom: "20px", left: "50%", transform: "translateX(-50%)", whiteSpace: "nowrap" }}>
              + Lavado completo $23000
            </Button>
          </Box>
          <Box sx={{ flex: 1, position: "relative", borderRadius: "40px", overflow: "hidden", minHeight: { xs: "250px", md: "auto" }, boxShadow: "0px 8px 24px rgba(0,0,0,0.3)" }}>
            <img src={ waxImg } alt="Wash" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "20px" }} />
            <Button variant="contained" onClick={() => goToOrdenWithService("699ddb9f4ae3e995862be3ec")} sx={{ position: "absolute", bottom: "20px", left: "50%", transform: "translateX(-50%)", whiteSpace: "nowrap" }}>
              + Encerado $9000
            </Button>
          </Box>
 */