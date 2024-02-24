import { create } from 'zustand';
import { signInWithGoogle, signOutFromGoogle } from '../services/firebase-services';
import { UserCredential, getAuth, onAuthStateChanged } from 'firebase/auth';
import zukeeper from 'zukeeper';

interface LoggedUser {
   uid: string;
   displayName: string;
}

interface AuthState {
   loggedUser: LoggedUser | null;
   signInWithGoogle: () => Promise<UserCredential>;
   signOutFromGoogle: () => void;
}

export const useAuthStore = create<AuthState>()(
   zukeeper((set: any) => {
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
         console.log(user);
         const loggedUser = user
            ? {
                 uid: user?.uid,
                 displayName: user.displayName
              }
            : null;

         set({
            loggedUser
         });
      });

      return {
         loggedUser: null,
         signInWithGoogle,
         signOutFromGoogle
      };
   })
);

declare const window: any;
window.store = useAuthStore;
