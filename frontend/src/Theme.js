import { createTheme } from '@mui/material/styles';

const defaultTheme = createTheme();

const theme = createTheme({
  palette: {
    primary: {
      main: '#F13C20',
      dark: '#DD2104',
      light: '#FF634B'
    },
    secondary: {
      dark: '#4056A1',
      main: '#6B85D8',
      light: '#C5CBE3'

    },
    light: {
      main: '#EDEDED',
    }
  },
  breakpoints: {
    values: {
      ...defaultTheme.breakpoints.values,
      xs: 0,
      sm: 550,
      md: 800,
      lg: 1300,
      xl: 2000
    }
  }
});

export default theme;
