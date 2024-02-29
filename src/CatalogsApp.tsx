import { Box, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useAuthStore } from './stores/auth-store';
import { useEffect } from 'react';
import { useMemo } from 'react';
import { useUIStore } from './stores/ui-store';
import { Outlet } from 'react-router-dom';
import { useCatalogsStore } from './stores/catalogs-store';

function CatalogsApp() {
   const setLoggedUser = useAuthStore((store) => store.setLoggedUser);
   const loadCatalogStructures = useCatalogsStore((store) => store.loadCatalogStructures);
   const colorMode = useUIStore((store) => store.colorMode);
   const auth = getAuth();

   useEffect(() => {
      onAuthStateChanged(auth, (user) => {
         const isUserLogged = !!user;
         const loggedUser = isUserLogged
            ? {
                 uid: user.uid!,
                 displayName: user.displayName!,
                 photoURL: user.photoURL!
              }
            : null;

         if (isUserLogged) loadCatalogStructures(loggedUser?.uid!);
         setLoggedUser(loggedUser);
      });
   }, []);

   const currentTheme = useMemo(() => {
      return createTheme({
         palette: {
            mode: colorMode
         }
      });
   }, [colorMode]);

   return (
      <ThemeProvider theme={currentTheme}>
         <Box height='100%'>
            <CssBaseline />
            <Outlet />
         </Box>
      </ThemeProvider>
   );
}

export default CatalogsApp;
