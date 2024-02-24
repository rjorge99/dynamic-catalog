import { create } from 'zustand';
import {
   signInWithGoogle,
   signOutFromGoogle,
   signInWithEmailPassword,
   createUserEmailAndPassword
} from '../services/firebase-services';
import { UserCredential } from 'firebase/auth';
import { devtools } from 'zustand/middleware';

interface LoggedUser {
   uid: string;
   displayName: string;
}

interface AuthState {
   loggedUser: LoggedUser | null;
   setLoggedUser: (loggedUser: LoggedUser | null) => void;
   signInWithGoogle: () => Promise<UserCredential>;
   signOutFromGoogle: () => void;
   signInWithEmailPassword: (email: string, password: string) => void;
   createUserEmailAndPassword: (displayName: string, email: string, password: string) => void;
}

export const useAuthStore = create<AuthState>()(
   devtools((set) => ({
      loggedUser: null,
      setLoggedUser: (loggedUser: LoggedUser | null) => set({ loggedUser }),
      signInWithGoogle,
      signOutFromGoogle,
      signInWithEmailPassword,
      createUserEmailAndPassword
   }))
);

declare const window: any;
window.store = useAuthStore;
