import ReactDOM from 'react-dom/client';
import { Navigate, Route, RouterProvider, Routes, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import './index.css';
import CatalogForm from './views/catalogs/CatalogForm.tsx';
import CatalogsApp from './CatalogsApp.tsx';
import CatalogsList from './views/catalogs/CatalogsList.tsx';
import DashBoard from './views/DashBoard.tsx';
import Layout from './layouts/Layout.tsx';
import Login from './views/auth/Login.tsx';
import NotFound from './views/NotFound.tsx';
import PrivateRoutes from './routes/private-routes.tsx';
import PublicRoutes from './routes/public-routes.tsx';
import Register from './views/auth/Register.tsx';
import CatalogList from './views/catalogs/CatalogList.tsx';

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
                        <Route path='/catalogs' element={<CatalogsList />} />
                        <Route path='/catalog/edit/:catalogId' element={<CatalogForm />} />
                        <Route path='/catalog/:catalogId' element={<CatalogForm />} />
                        <Route path='/catalog/list/:catalogId' element={<CatalogList />} />
                        <Route path='*' element={<NotFound />} />
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
