import { useState } from "react";
import { ButtonComp } from '../ButtonComp/ButtonComp';
import {
    Box
} from '@mui/material';

const FormComp = (props) => {
    const { initialName, initialPosition, initialGameOne, initialGameTwo, initialGameThree, onSubmitProp } = props;
    const [name, setName] = useState(initialName);
    const [position, setPosition] = useState(initialPosition);
    const [gameOne, setGameOne] = useState(initialGameOne);
    const [gameTwo, setGameTwo] = useState(initialGameTwo);
    const [gameThree, setGameThree] = useState(initialGameThree);

    const onSubmitHandler = (e) => {
        e.preventDefault();
        onSubmitProp({
            playerName: name, 
            playerPosition: position, 
            playerStatus: {
                gameOne: gameOne,
                gameTwo: gameTwo,
                gameThree: gameThree,
            }});
    };

    return(
        <Box 
        sx={{ 
            display: 'flex', flexDirection: 'column',
            alignItems: "center", justifyContent: "center",
            p: 1, m: 1,
            fontSize: '0.875rem', fontWeight: '700',
            padding: '20px',
        }}
        >
            <form onSubmit={onSubmitHandler}>
                <Box 
                    sx={{ 
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: "center",
                    justifyContent: "center"}}
                >
                    <label>Player Name:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    {name.length < 3 && name.length > 0 && (
                    <p>
                        Name must be at least 3 characters long...
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
                    <label>Player Position:</label>
                    <input
                    type="text"
                    value={position}
                    onChange={(e) => setPosition(e.target.value)}
                    />
                    {position.length < 3 && position.length > 0 && (
                    <p>
                        Position must be at least 3 characters long...
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
                    <label sx={{justifySelf: "center"}}>Games (optional)</label>
                </Box><Box 
                    sx={{ 
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "10px"}}
                >
                    <label>Game 1:</label>
                    <input
                    type="text"
                    value={gameOne}
                    onChange={(e) => setGameOne(e.target.value)}
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
                    <label>Game 2:</label>
                    <input
                        type="text"
                        value={gameTwo}
                        onChange={(e) => setGameTwo(e.target.value)}
                    />
                </Box><Box 
                    sx={{ 
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "10px"}}
                >
                    <label>Game 3:</label>
                    <input
                        type="text"
                        value={gameThree}
                        onChange={(e) => setGameThree(e.target.value)}
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
                        type={"submit"}
                        name={`📤 ${props.linkName}` }
                    ></ButtonComp>
                </Box>
            </form>
        </Box>
    )

};

export default FormComp;