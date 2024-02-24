import { CssBaseline, ThemeProvider } from '@mui/material';
import { darkTheme } from './themes';
import { Login, Register } from './views/auth';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useAuthStore } from './stores/auth-store';
import { useEffect } from 'react';
import DashBoard from './views/DashBoard';
import Layout from './layouts/Layout';

function App() {
   const loggedUser = useAuthStore((store) => store.loggedUser);
   const navigate = useNavigate();

   useEffect(() => {
      if (loggedUser) navigate('/dashboard');
      else navigate('/');
   }, [loggedUser]);

   return (
      <ThemeProvider theme={darkTheme}>
         <CssBaseline />
         <Routes>
            {/* <Route path='/' element={<Layout />}>
               <Route index element={<DashBoard />} />
            </Route> */}
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
