import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
   // plugins: [tsconfigPaths(), react()],
   plugins: [react()],
   base: 'https://rjorge99.github.io/dynamic-catalog',
   server: {
      open: true
   }
});
