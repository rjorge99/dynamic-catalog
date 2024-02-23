import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, signInWithPopup } from 'firebase/auth';
import { googleAuthProvider } from '../firebase/firebase-config';
const auth = getAuth();

export const createUserWithEmailAndPasswordService = async (email: string, password: string) => {
   createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
         // Signed up
         const user = userCredential.user;
         // ...
      })
      .catch((error) => {
         const errorCode = error.code;
         const errorMessage = error.message;
         // ..
      });
};

export const signInWithEmailAndPasswordService = async (email: string, password: string) => {
   signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
         // Signed in
         const user = userCredential.user;
         // ...
      })
      .catch((error) => {
         const errorCode = error.code;
         const errorMessage = error.message;
      });
};

export const signOutService = async () => {
   signOut(auth)
      .then(() => {
         // Sign-out successful.
      })
      .catch((error) => {
         // An error happened.
      });
};

export const signInWithPopupService = async () => {
   const result = await signInWithPopup(auth, googleAuthProvider);
   return result;
};
