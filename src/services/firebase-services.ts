import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, signInWithPopup } from 'firebase/auth';
import { googleAuthProvider } from '../firebase/firebase-config';
const auth = getAuth();

export const createUserWithEmailAndPasswordService = (email: string, password: string) => {
   return createUserWithEmailAndPassword(auth, email, password).then((userCredential) => userCredential);
   // .then((userCredential) => {
   //    // Signed up
   //    // const user = userCredential.user;
   //    // ...
   // })
   // .catch((error) => {
   //    // const errorCode = error.code;
   //    // const errorMessage = error.message;
   //    // ..
   // });
};

export const signInWithEmailAndPasswordService = async (email: string, password: string) => {
   signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
         // Signed in
         const user = userCredential.user;
         // ...
      })
      .catch((error) => {
         // const errorCode = error.code;
         // const errorMessage = error.message;
      });
};

export const signOutFromGoogle = async () => {
   return signOut(auth);
};

export const signInWithGoogle = () => {
   return signInWithPopup(auth, googleAuthProvider);
};
