import { create } from 'zustand';
import {
   signInWithGoogle,
   signInWithFacebook,
   signOutService,
   signInWithEmailPassword,
   createUserEmailAndPassword
} from '../services/firebase-services';
import { UserCredential } from 'firebase/auth';
import { devtools } from 'zustand/middleware';

interface LoggedUser {
   uid: string;
   displayName: string;
   photoURL: string;
}

type State = {
   loggedUser: LoggedUser | null;
};

type Actions = {
   setLoggedUser: (loggedUser: LoggedUser | null) => void;
   signInWithGoogle: () => Promise<UserCredential>;
   signInWithFacebook: () => Promise<UserCredential>;
   signOut: () => void;
   signInWithEmailPassword: (email: string, password: string) => void;
   createUserEmailAndPassword: (displayName: string, email: string, password: string) => void;
   reset: () => void;
};

const initialState = {
   loggedUser: null
};

export const useAuthStore = create<State & Actions>()(
   devtools((set) => ({
      loggedUser: null,
      setLoggedUser: (loggedUser: LoggedUser | null) => set({ loggedUser }),
      signInWithGoogle,
      signInWithFacebook,
      signOut: signOutService,
      signInWithEmailPassword,
      createUserEmailAndPassword,
      reset: () => set(initialState)
   }))
);
