import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useAuthStore } from './stores/auth-store';
import { Suspense, lazy, useEffect } from 'react';
import { useMemo } from 'react';
import { useUIStore } from './stores/ui-store';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PrivateRoutes from './routes/private-routes';
import PublicRoutes from './routes/public-routes';
import Layout from './layouts/Layout';
import { useCatalogsStore } from './stores/catalogs-store';

const LazyLogin = lazy(() => import('./views/auth/Login'));
const LazyRegister = lazy(() => import('./views/auth/Register'));
const LazyDashBoard = lazy(() => import('./views/DashBoard'));

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
         <Suspense fallback={<div>Loading...</div>}>
            <BrowserRouter basename='dynamic-catalog'>
               <Routes>
                  <Route
                     path='/'
                     element={
                        <PrivateRoutes>
                           <Layout>
                              <LazyDashBoard />
                           </Layout>
                        </PrivateRoutes>
                     }
                  />
                  <Route
                     path='/auth/*'
                     element={
                        <PublicRoutes>
                           <Routes>
                              <Route path='/login' element={<LazyLogin />} />
                              <Route path='/register' element={<LazyRegister />} />
                           </Routes>
                        </PublicRoutes>
                     }
                  />
               </Routes>
            </BrowserRouter>
         </Suspense>
      </ThemeProvider>
   );
}

export default App;
