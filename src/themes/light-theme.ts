import { createTheme } from '@mui/material';

export const lightTheme = createTheme({
   palette: {
      mode: 'light',
      primary: {
         main: '#1E1E1E'
      },
      secondary: {
         main: '#3A64D8'
      },
      info: {
         main: '#fff'
      }
   },
   components: {
      MuiTextField: {
         defaultProps: {
            size: 'small'
         }
      },
      MuiButton: {
         defaultProps: {
            variant: 'contained',
            size: 'small',
            disableElevation: true
            // color: 'info'
         },
         styleOverrides: {
            root: {
               textTransform: 'none',
               boxShadow: 'none'
            }
         }
      }
   }
});
