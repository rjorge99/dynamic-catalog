import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
   apiKey: 'AIzaSyC4UmMfk6lC1N5D0WTTPynxD_tc7aVxMt8',
   authDomain: 'catalogs-2c3b6.firebaseapp.com',
   projectId: 'catalogs-2c3b6',
   storageBucket: 'catalogs-2c3b6.appspot.com',
   messagingSenderId: '206646595612',
   appId: '1:206646595612:web:99c1fae5ac98e774138fd9'
};

const app = initializeApp(firebaseConfig);

const googleAuthProvider = new GoogleAuthProvider();
const db = getFirestore(app);

export { db, googleAuthProvider };
