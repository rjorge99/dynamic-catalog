import { CssBaseline, ThemeProvider } from '@mui/material';
import { lightTheme } from './themes/theme';
import { Route, Routes } from 'react-router-dom';

import { Login, Register } from './views/auth';
import DashBoard from './views/DashBoard';

function App() {
   return (
      <ThemeProvider theme={lightTheme}>
         <CssBaseline />
         <Routes>
            {/* <Route path='/' element={<Layout />}>
               <Route index element={<DashBoard />} />
            </Route> */}
            <Route path='/'>
               <Route index element={<Login />} />
               <Route path='register' element={<Register />} />
               <Route path='dashboard' element={<DashBoard />} />
            </Route>
         </Routes>
      </ThemeProvider>
   );
}

export default App;
