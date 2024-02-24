import { create } from 'zustand';

interface UiState {
   isLoading: boolean;
   setIsLoading: (isLoading: boolean) => void;
}

export const useUIStore = create<UiState>()((set) => ({
   isLoading: false,
   setIsLoading: (isLoading: boolean) => set({ isLoading })
}));
