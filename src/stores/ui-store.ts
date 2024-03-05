import { create } from 'zustand';

type State = {
   colorMode: 'light' | 'dark';
   isDrawerOpen: boolean;
};

type Actions = {
   toggleColorMode: () => void;
   reset: () => void;
   toggleDrawer: () => void;
};

const initialState = {
   colorMode: localStorage.getItem('colorMode') ? (localStorage.getItem('colorMode') as 'light' | 'dark') : 'light',
   isDrawOpen: false
};

export const useUIStore = create<State & Actions>()((set, get) => ({
   colorMode: localStorage.getItem('colorMode') ? (localStorage.getItem('colorMode') as 'light' | 'dark') : 'light',
   isDrawerOpen: false,
   toggleColorMode: () => {
      const colorMode = get().colorMode === 'light' ? 'dark' : 'light';
      localStorage.setItem('colorMode', colorMode);

      set({
         colorMode
      });
   },
   reset: () => set(initialState),
   toggleDrawer: () => set((state) => ({ isDrawerOpen: !state.isDrawerOpen }))
}));
