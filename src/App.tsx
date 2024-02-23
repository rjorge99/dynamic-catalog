import { CssBaseline, ThemeProvider } from '@mui/material';
import { lightTheme } from './themes/theme';
import { Route, Routes } from 'react-router-dom';
import DashBoard from './views/DashBoard';
import Layout from './layouts/Layout';
import { Login, Register } from './views/auth';

function App() {
   return (
      <ThemeProvider theme={lightTheme}>
         <CssBaseline />
         <Routes>
            <Route path='/' element={<Layout />}>
               <Route index element={<DashBoard />} />
            </Route>
            <Route path='/auth'>
               <Route index path='login' element={<Login />} />
               <Route path='register' element={<Register />} />
            </Route>
         </Routes>
      </ThemeProvider>
   );
}

export default App;
