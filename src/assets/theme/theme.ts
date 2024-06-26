import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#8a5436',
      dark: '#ac8866',
      light: '#f9e8df'
    },
    secondary: {
      main: '#ac8866', 
    },
    error: {
      main: '#914236', 
    },
    warning: {
      main: '#ffa726', 
    },
    info: {
      main: '#769597', 
    },
    success: {
      main: '#00565f', 
    },
  },
});

export default theme