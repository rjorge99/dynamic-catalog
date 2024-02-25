import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { Login, Register } from './views/auth';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useAuthStore } from './stores/auth-store';
import { useEffect } from 'react';
import { useMemo } from 'react';
import { useUIStore } from './stores/ui-store';
import DashBoard from './views/DashBoard';
import Layout from './layouts/Layout';

function App() {
   const loggedUser = useAuthStore((store) => store.loggedUser);
   const setLoggedUser = useAuthStore((store) => store.setLoggedUser);
   const colorMode = useUIStore((store) => store.colorMode);
   const navigate = useNavigate();
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

   useEffect(() => {
      if (loggedUser) navigate('/dashboard');
      else navigate('/');
   }, [loggedUser]);

   return (
      <ThemeProvider theme={currentTheme}>
         <CssBaseline />
         <Routes>
            <Route path='/'>
               <Route index element={<Login />} />
               <Route path='register' element={<Register />} />
               <Route path='dashboard' element={<Layout />}>
                  <Route index element={<DashBoard />} />
               </Route>
            </Route>
         </Routes>
      </ThemeProvider>
   );
}

export default App;
