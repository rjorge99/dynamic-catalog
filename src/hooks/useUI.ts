import { useUIStore } from '../stores/ui-store';

export const useUI = () => {
   const { toggleColorMode, reset, colorMode } = useUIStore((store) => store);

   return { toggleColorMode, reset, colorMode };
};
