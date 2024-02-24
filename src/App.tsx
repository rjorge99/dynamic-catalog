import { CssBaseline, ThemeProvider } from '@mui/material';
import { darkTheme } from './themes';
import { Login, Register } from './views/auth';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useAuthStore } from './stores/auth-store';
import { useEffect } from 'react';
import DashBoard from './views/DashBoard';
import Layout from './layouts/Layout';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

function App() {
   const loggedUser = useAuthStore((store) => store.loggedUser);
   const setLoggedUser = useAuthStore((store) => store.setLoggedUser);
   const navigate = useNavigate();
   const auth = getAuth();

   useEffect(() => {
      onAuthStateChanged(auth, (user) => {
         const isUserLogged = !!user;
         const loggedUser = isUserLogged
            ? {
                 uid: user.uid!,
                 displayName: user.displayName!
              }
            : null;

         setLoggedUser(loggedUser);
      });
   }, []);

   useEffect(() => {
      if (loggedUser) navigate('/dashboard');
      else navigate('/');
   }, [loggedUser]);

   return (
      <ThemeProvider theme={darkTheme}>
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
