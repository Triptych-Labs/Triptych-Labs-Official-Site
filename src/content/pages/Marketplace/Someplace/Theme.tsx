import {
  createTheme,
  StyledEngineProvider,
  ThemeProvider,
  useTheme,
} from '@mui/material';
import { deepPurple, amber } from '@mui/material/colors';
import { SnackbarProvider } from 'notistack';
import React, { FC, ReactNode } from 'react';

export const Theme: FC<{ children: ReactNode }> = ({ children }) => {
  const theme = useTheme();
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <SnackbarProvider>{children}</SnackbarProvider>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};
