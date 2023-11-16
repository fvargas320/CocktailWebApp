import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#FF2D55FF', // your primary color
        },
        secondary: {
            main: '#e11a40', // your secondary color
        },
        customDark: {
            main: '#2f2f2f', // your secondary color
        },
    },
    typography: {
        // your typography settings
    },
    // other theme configurations
});

export default theme;
