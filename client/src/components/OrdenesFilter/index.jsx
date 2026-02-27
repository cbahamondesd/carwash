import { useState, useEffect } from "react";
import { Box, FormControl, InputLabel, Select, MenuItem } from "@mui/material";

const estados = ["aceptada", "en proceso", "completada", "cancelada", "pendiente"];

const OrdenesFilter = ({ ordenes, setFilteredOrdenes }) => {
  const [estado, setEstado] = useState("todos");

  useEffect(() => {
    if (estado === "todos") {
      setFilteredOrdenes(ordenes);
    } else {
      setFilteredOrdenes(ordenes.filter((o) => o.estado === estado));
    }
  }, [estado, ordenes]);
  
    const handleFilterChange = (e) => {
        const selected = e.target.value;
        setEstado(selected);
        if (selected === "todos") {
            setFilteredOrdenes(ordenes)
        } else {
            setFilteredOrdenes(ordenes.filter((o) => o.estado === selected))
        };
    };

    return(
        <Box sx={{ m: 2}}>
            <FormControl size="small" fullWidth>
                <InputLabel id="estado-label">Filtrar por estado</InputLabel>
                <Select
                    labelId="estado-label"
                    value={estado}
                    label="Filtrar por estado"
                    onChange={handleFilterChange}
                >
                    <MenuItem value="todos">todas</MenuItem>
                    {estados.map((estado) => (
                        <MenuItem key={estado} value={ estado } label={estado}>{estado}</MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
    )
};

export default OrdenesFilter;