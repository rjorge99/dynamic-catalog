import {
   getAuth,
   createUserWithEmailAndPassword,
   signInWithEmailAndPassword,
   signOut,
   signInWithPopup,
   updateProfile,
   User,
   Auth
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
   signInWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {})
      .catch((error) => {
         notify('Please verify your information');
      });
   // .then((userCredential) => {
   //    // Signed in

   //    // ...
   // })
   // .catch((error) => {
   //    // const errorCode = error.code;
   //    // const errorMessage = error.message;
   // });
};

export const signOutFromGoogle = async () => {
   return signOut(auth);
};

export const signInWithGoogle = () => {
   return signInWithPopup(auth, googleAuthProvider);
};
