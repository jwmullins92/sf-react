import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base:`./`,
  build: {
    rollupOptions: {
      output: {
        entryFileNames: 'bundle.js', // JS bundle
        assetFileNames: (assetInfo) => {
          if (assetInfo.name && assetInfo.name.endsWith('.css')) {
            return 'styles.css'; // CSS bundle
          }
          return '[name][extname]'; // Default for other assets
        },
      },
    },
  },
});