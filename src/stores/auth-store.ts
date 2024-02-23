import { create } from 'zustand';
import { signInWithPopupService } from '../services/firebase-services';

interface AuthState {
   isLoggedIn: boolean;
   signInWithGooglePopup: () => void;
}

const useAuthStore = create<AuthState>()((set) => ({
   isLoggedIn: false,
   signInWithGooglePopup: async () => {
      const result = await signInWithPopupService();
      console.log(result);
   }
}));
