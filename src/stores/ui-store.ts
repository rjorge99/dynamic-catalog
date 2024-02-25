import { create } from 'zustand';

interface UiState {
   colorMode: 'light' | 'dark';
   toggleColorMode: () => void;
}

export const useUIStore = create<UiState>()((set, get) => ({
   colorMode: localStorage.getItem('colorMode') ? (localStorage.getItem('colorMode') as 'light' | 'dark') : 'light',
   toggleColorMode: () => {
      const colorMode = get().colorMode === 'light' ? 'dark' : 'light';
      localStorage.setItem('colorMode', colorMode);

      set({
         colorMode
      });
   }
}));
