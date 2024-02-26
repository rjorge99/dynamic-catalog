import {
   getAuth,
   createUserWithEmailAndPassword,
   signInWithEmailAndPassword,
   signOut,
   signInWithPopup,
   updateProfile
} from 'firebase/auth';
import { googleAuthProvider } from '../firebase/firebase-config';
import { notify } from '../utils/notifier';
const auth = getAuth();

export const createUserEmailAndPassword = (displayName: string, email: string, password: string) => {
   createUserWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
         updateProfile(user, { displayName });
      })
      .catch((error: Error) => {
         notify(error.message);
      });
};

export const signInWithEmailPassword = async (email: string, password: string) => {
   signInWithEmailAndPassword(auth, email, password).catch(() => {
      notify('Email or password is incorrect');
   });
};

export const signOutService = async () => {
   return signOut(auth);
};

export const signInWithGoogle = () => {
   return signInWithPopup(auth, googleAuthProvider);
};
