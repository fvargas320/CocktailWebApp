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
            main: '#2f2f2f', // your custom dark color
        },
    },
    typography: {
        // your typography settings
    },
    customStyles: {
        defaultColor: '#000000',
        supportTextColor: '#8A8A8D',
        hoverColor: '#758bd2',
    },
    // other theme configurations
});

export default theme;
