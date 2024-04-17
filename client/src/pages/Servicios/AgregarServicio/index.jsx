import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ButtonComp } from "../../components/ButtonComp/ButtonComp";
import Navbar from "../../components/Navbar/Navbar";
import { 
    Box,
    Paper
} from "@mui/material";

export const CreatePage = () => {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [type, setType] = useState("");
    const [description, setDescription] = useState("");
    const [skillOne, setSkillOne] = useState("");
    const [skillTwo, setSkillTwo] = useState("");
    const [skillThree, setSkillThree] = useState("");

    const createPet = async () => {
        
        if (name !== "" && type !== "") {
        let data = {
            petName: name,
            petType: type,
            petDescription: description,
            petSkills: {
            skillOne: skillOne,
            skillTwo: skillTwo,
            skillThree: skillThree,
            },
        };
        try {
            let result = await axios.post("http://localhost:8000/api/pets/new",data);
            if (result.status === 200) {
            navigate("/");
            }
        } catch (error) {
            alert(error.response.data.message);
        }
        } else {
        alert("Por favor completa los campos requeridos");
        }
    };

    const goToHome = () => {
        navigate("/");
    };

    return (
        <div>
        <Navbar
            onclick={goToHome}
            subTitle={"¿Conoces una mascota que no tiene hogar? Ayúdala a encontrar una familia"}
            linkName={"Volver al inicio"}
        />
        <Paper variant="elevation" elevation={3} sx={{
            backgroundColor: "primary.main",
            padding: "30px",
            width: "100%", 
            margin: "auto" }}>
            <Box 
            sx={{ 
                maxWidth: "500px",
                margin: "auto",
                bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#101010' : 'grey.100'),
                color: (theme) => (theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800'),
                border: '1px solid',
                borderColor: (theme) =>
                theme.palette.mode === 'dark' ? 'grey.800' : 'grey.300',
                borderRadius: 2,
                fontSize: '0.875rem',
                fontWeight: '700',
                padding: '20px',
                }}
            >
            <form>
            <Box 
                sx={{ 
                display: 'flex',
                flexDirection: 'row',
                alignItems: "center",
                justifyContent: "center"}}
            >
                <label>Nombre de la mascota:</label>
                <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                />
                {name.length < 3 && name.length > 0 && (
                <p>
                    El nombre debe tener al menos 3 caracteres...
                </p>
                )}
            </Box>
            <Box 
                sx={{ 
                display: 'flex',
                flexDirection: 'row',
                alignItems: "center",
                justifyContent: "center",
                padding: "10px"}}
            >
                <label>Tipo:</label>
                <input
                type="text"
                value={type}
                onChange={(e) => setType(e.target.value)}
                />
                {type.length < 3 && type.length > 0 && (
                <p>
                    Tipo debe tener al menos 3 caracteres...
                </p>
                )}
            </Box>
            <Box 
                sx={{ 
                display: 'flex',
                flexDirection: 'row',
                alignItems: "center",
                justifyContent: "center",
                padding: "10px"}}
            >
                <label>Descripción:</label>
                <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                />
                {description.length < 3 && description.length > 0 && (
                <p>
                    La descripción debe tener al menos 3 caracteres...
                </p>
                )}
            </Box>
            <Box 
                sx={{ 
                display: 'flex',
                flexDirection: 'row',
                alignItems: "center",
                justifyContent: "center",
                padding: "10px"}}
            >
            <label sx={{justifySelf: "center"}}>Gracias (opcional)</label>
            </Box><Box 
                sx={{ 
                display: 'flex',
                flexDirection: 'row',
                alignItems: "center",
                justifyContent: "center",
                padding: "10px"}}
            >
                <label>Gracia 1:</label>
                <input
                type="text"
                value={skillOne}
                onChange={(e) => setSkillOne(e.target.value)}
                />
            </Box>
            <Box 
                sx={{ 
                display: 'flex',
                flexDirection: 'row',
                alignItems: "center",
                justifyContent: "center",
                padding: "10px"}}
            >
            <label>Gracia 2:</label>
            <input
                type="text"
                value={skillTwo}
                onChange={(e) => setSkillTwo(e.target.value)}
            />
            </Box><Box 
                sx={{ 
                display: 'flex',
                flexDirection: 'row',
                alignItems: "center",
                justifyContent: "center",
                padding: "10px"}}
            >
            <label>Gracia 3:</label>
            <input
                type="text"
                value={skillThree}
                onChange={(e) => setSkillThree(e.target.value)}
            />
            </Box>
            <Box 
                sx={{ 
                display: 'flex',
                flexDirection: 'row',
                alignItems: "center",
                justifyContent: "center",
                padding: "10px"}}
            >
            <ButtonComp
                onclick={createPet}
                name={"Agregar mascota 📤"}
                color={"dodgerblue"}
            ></ButtonComp>
            </Box>
            </form>
            <form>
            </form>
        </Box>
        </Paper>
        <Paper/>
        </div>
    );
};
