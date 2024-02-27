import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useAuthStore } from './stores/auth-store';
import { useEffect } from 'react';
import { useMemo } from 'react';
import { useUIStore } from './stores/ui-store';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import PrivateRoutes from './routes/private-routes';
import PublicRoutes from './routes/public-routes';
import Layout from './layouts/Layout';
import { useCatalogsStore } from './stores/catalogs-store';
import DashBoard from './views/DashBoard';
import { Login, Register } from './views/auth';

function App() {
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
         <CssBaseline />
         <BrowserRouter basename='dynamic-catalog'>
            <Routes>
               <Route
                  path='/*'
                  element={
                     <PrivateRoutes>
                        <Routes>
                           <Route element={<Layout />}>
                              <Route index element={<DashBoard />} />
                              <Route path='*' element={<Navigate to='/' replace />} />
                           </Route>
                        </Routes>
                     </PrivateRoutes>
                  }
               />
               <Route
                  path='/auth/*'
                  element={
                     <PublicRoutes>
                        <Routes>
                           <Route path='/login' element={<Login />} />
                           <Route path='/register' element={<Register />} />
                           <Route path='*' element={<Navigate to='/auth/login' replace />} />
                        </Routes>
                     </PublicRoutes>
                  }
               />
            </Routes>
         </BrowserRouter>
      </ThemeProvider>
   );
}

export default App;
