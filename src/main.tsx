import ReactDOM from 'react-dom/client';
import CatalogsApp from './CatalogsApp.tsx';
import './index.css';
import { Navigate, Route, RouterProvider, Routes, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import PrivateRoutes from './routes/private-routes.tsx';
import Layout from './layouts/Layout.tsx';
import DashBoard from './views/DashBoard.tsx';
import PublicRoutes from './routes/public-routes.tsx';
import Login from './views/auth/Login.tsx';
import Register from './views/auth/Register.tsx';

const router = createBrowserRouter(
   createRoutesFromElements(
      <Route element={<CatalogsApp />}>
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
      </Route>
   ),
   { basename: '/dynamic-catalog' }
);

ReactDOM.createRoot(document.getElementById('root')!).render(<RouterProvider router={router} />);
