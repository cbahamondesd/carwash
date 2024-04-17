import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import NotFound from "../../components/NotFound/NotFound";
import Navbar from "../../components/Navbar/Navbar";
import { ButtonComp } from "../../components/ButtonComp/ButtonComp";
import { 
    Box,
    Paper,
    Typography
} from "@mui/material";


const EditPage = () => {

    const params = useParams();
    const petId = params.id;
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [type, setType] = useState("");
    const [description, setDescription] = useState("");
    const [skillOne, setSkillOne] = useState("");
    const [skillTwo, setSkillTwo] = useState("");
    const [skillThree, setSkillThree] = useState("");

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    

    const getPet = async () => {
        try {
                let result = await axios.get("http://localhost:8000/api/pets/get/" + petId);
                setName(result.data.petName);
                setType(result.data.petType);
                setDescription(result.data.petDescription);
                setSkillOne(result.data.petSkills.skillOne);
                setSkillTwo(result.data.petSkills.skillTwo);
                setSkillThree(result.data.petSkills.skillThree);
        } catch (error) {
                setError(error.response.data.message);
        } finally {
                setLoading(false);
        }
    };

    const editPet = async () => {
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
            let result = await axios.put(
            "http://localhost:8000/api/pets/update/" + petId,
            data
        );
        if (result.status === 200) {
            navigate("/");
        }
        } catch (error) {
            alert(error.response.data.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getPet();
    }, [petId]);

    const goToHome = () => {
        navigate("/");
    };

    if (loading) return <Typography variant="h3">Loading...</Typography>;

    if (error) return <NotFound 
    message="Esta mascota no existe. ¿Quieres agregarla?"
    linkPath="/pets/new" 
    linkText="Agregar mascota" 
    />;

    return (
        <div>
            <Navbar
            onclick={goToHome}
            subTitle={`Editando a ${name}`}
            linkName={"Volver al inicio"}
            />
            <Paper variant="elevation" elevation={3} sx={{
                backgroundColor: "primary.main",
                padding: "30px",
                width: "100%",
                margin:"auto"}}>
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
                <label sx={{justifySelf: "center"}}>Gracias (optional)</label>
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
                    onclick={editPet}
                    name={"Editar mascota"}
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

export default EditPage;