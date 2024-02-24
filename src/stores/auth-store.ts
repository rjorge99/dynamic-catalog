import { create } from 'zustand';
import {
   signInWithGoogle,
   signOutFromGoogle,
   signInWithEmailPassword,
   createUserEmailAndPassword
} from '../services/firebase-services';
import { UserCredential, getAuth, onAuthStateChanged } from 'firebase/auth';
import { devtools } from 'zustand/middleware';

interface LoggedUser {
   uid: string;
   displayName: string;
}

interface AuthState {
   loggedUser: LoggedUser | null;
   signInWithGoogle: () => Promise<UserCredential>;
   signOutFromGoogle: () => void;
   signInWithEmailPassword: (email: string, password: string) => void;
   createUserEmailAndPassword: (displayName: string, email: string, password: string) => void;
}

export const useAuthStore = create<AuthState>()(
   devtools((set) => {
      const auth = getAuth();

      onAuthStateChanged(auth, (user) => {
         const isUserLogged = !!user;

         const loggedUser = isUserLogged
            ? {
                 uid: user.uid!,
                 displayName: user.displayName!
              }
            : null;

         set({
            loggedUser
         });
      });

      return {
         loggedUser: null,
         signInWithGoogle,
         signOutFromGoogle,
         signInWithEmailPassword,
         createUserEmailAndPassword
      };
   })
);

declare const window: any;
window.store = useAuthStore;
