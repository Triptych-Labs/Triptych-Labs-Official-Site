import {
  createTheme,
  StyledEngineProvider,
  ThemeProvider,
  useTheme
} from '@mui/material';
import { deepPurple, amber } from '@mui/material/colors';
import { SnackbarProvider } from 'notistack';
import React, { FC, ReactNode } from 'react';

/*
//@ts-ignore
const theme = createTheme({
  typography: {
    fontFamily: 'Chava',
    h1: {
      fontWeight: 800,
      fontSize: '.8em',
    },
    h2: {
      fontWeight: 200,
      fontSize: '.6em',
      margin: '10px',
    },
    subtitle1: {
      fontWeight: 300,
      fontSize: '14px',
    },
  },
  palette: {
    mode: 'dark',
    primary: {
      main: amber[500],
    },
  },
  components: {
    MuiButtonBase: {
      styleOverrides: {
        root: {
          justifyContent: 'center',
          textAlign: 'center',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontSize: '1vw',
          padding: '12px 16px',
        },
        startIcon: {
          marginRight: 8,
        },
        endIcon: {
          marginLeft: 8,
        },
      },
    },
  },
}
);
*/
export const Theme: FC<{ children: ReactNode }> = ({ children }) => {
  const theme = useTheme()
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <SnackbarProvider>{children}</SnackbarProvider>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};
