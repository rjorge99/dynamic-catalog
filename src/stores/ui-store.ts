import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

type State = {
   colorMode: 'light' | 'dark';
};

type Actions = {
   toggleColorMode: () => void;
   reset: () => void;
};

const initialState = {
   colorMode: localStorage.getItem('colorMode') ? (localStorage.getItem('colorMode') as 'light' | 'dark') : 'light'
};

export const useUIStore = create<State & Actions>()(
   devtools((set, get) => ({
      colorMode: localStorage.getItem('colorMode') ? (localStorage.getItem('colorMode') as 'light' | 'dark') : 'light',
      toggleColorMode: () => {
         const colorMode = get().colorMode === 'light' ? 'dark' : 'light';
         localStorage.setItem('colorMode', colorMode);

         set({
            colorMode
         });
      },
      reset: () => set(initialState)
   }))
);
