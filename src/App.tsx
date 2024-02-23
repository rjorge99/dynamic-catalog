import { CssBaseline, ThemeProvider } from '@mui/material';
import { lightTheme } from './themes/theme';
import { Route, Routes } from 'react-router-dom';
import Login from './views/Auth/Login';
import Register from './views/Auth/Register';
import DashBoard from './views/DashBoard';
import DashboardLayout from './layouts/DashboardLayout';

function App() {
   return (
      <ThemeProvider theme={lightTheme}>
         <CssBaseline />
         <Routes>
            <Route path='/' element={<DashboardLayout />}>
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
