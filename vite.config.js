import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 1000
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        // Silently fail instead of logging proxy errors when backend is offline.
        // The frontend's catch blocks will handle it and fall back to mock auth.
        configure(proxy) {
          proxy.on('error', (err) => {
            // swallow — frontend handles network errors
          });
        }
      }
    }
  }
});
