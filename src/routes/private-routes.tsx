import { PropsWithChildren } from 'react';
import { useAuthStore } from '../stores/auth-store';
import { Navigate } from 'react-router-dom';

export const PrivateRoutes = ({ children }: PropsWithChildren) => {
   const loggedUser = useAuthStore((store) => store.loggedUser);
   return loggedUser ? children : <Navigate to='/auth/login' replace />;
};

export default PrivateRoutes;
