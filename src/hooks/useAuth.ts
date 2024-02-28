import { useAuthStore } from '../stores/auth-store';

export const useAuth = () => {
   const {
      loggedUser,
      setLoggedUser,
      signInWithGoogle,
      signOut,
      signInWithEmailPassword,
      createUserEmailAndPassword,
      reset
   } = useAuthStore((store) => store);

   return {
      loggedUser,
      setLoggedUser,
      signInWithGoogle,
      signOut,
      signInWithEmailPassword,
      createUserEmailAndPassword,
      reset
   };
};
