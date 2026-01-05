import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  // Update base if repo name changes
  base: '/supervisor-schedule/',
  plugins: [react()],
});
