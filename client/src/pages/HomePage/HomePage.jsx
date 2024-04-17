import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { capitalizeTransform } from '../../helpers/helpers';
import axios from "axios";
import Navbar from "../../components/Navbar/Navbar";
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Paper,
  Grid
} from '@mui/material';


export const HomePage = () => {
  const navigate = useNavigate();

  const [servicioList, setServicioList] = useState([]);
  const [filteredServicios, setFilteredServicios] = useState([]);

  const callServicioList = async () => {
    try {
      let result = await axios.get("http://localhost:8000/api/servicio/");
      result.data.sort((a, b) => a.servicioName.localeCompare(b.servicioName));
      setServicioList(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    callServicioList();
  }, []);

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
    <div>
      <Navbar
        onClick1={irAlCarrito}
        linkName1={"Mi perfil"}
        onClick2={irAlCarrito}
        linkName2={"Servicios"}
        onClick3={irAlCarrito}
        linkName3={"Carro de compras"}
      />

      <Paper variant="elevation" elevation={3} sx={{
        backgroundColor: "primary.main",
        padding: "30px" }}>
      <Paper sx={{
        alignItems: "center",
        justifyContent: "center",
        margin: "30px",     
      }}>

      <TableContainer sx={{
            alignItems: "center",
            justifyContent: "center"      
            }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Mascota</TableCell>
              <TableCell>Tipo</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>

          {filteredServicios.map((item, index) => {
            return (
              <tr key={index}>
                <TableCell>{item.servicioName}</TableCell>
                <TableCell>{item.servicioType}</TableCell>
                <TableCell>
                  <Button
                    onClick={() => goToDetails(item._id)}
                    >
                    Detalle
                  </Button>
                  <label> | </label>
                  <Button onClick={() => goToEdit(item._id)}>
                    Editar
                  </Button>
                </TableCell>
              </tr>
            );
          })}
          </TableBody>
        </Table>
      </TableContainer>
      </Paper>
      </Paper>
    </div>
  );
};
