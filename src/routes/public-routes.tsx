import { PropsWithChildren } from 'react';
import { useAuthStore } from '../stores/auth-store';
import { Navigate } from 'react-router-dom';

export const PublicRoutes = ({ children }: PropsWithChildren) => {
   const loggedUser = useAuthStore((store) => store.loggedUser);
   return loggedUser ? <Navigate to='/' replace /> : children;
};

export default PublicRoutes;
