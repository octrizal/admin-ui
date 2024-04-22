import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  // Konfigurasi lainnya ...
  resolve: {
    alias: {
      '@pages': path.resolve(__dirname, 'src/pages'), // Aliasan untuk direktori pages
    },
  },
});
