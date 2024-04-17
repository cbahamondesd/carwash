import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

const theme = createTheme({
    palette: {
        primary: {
        main: '#DFF150',
        },
        secondary: {
        main: '#33489E',
        },
        error: {
        main: red.A400,
        },
    },
    justifyContent: "center",
});

export default theme;
