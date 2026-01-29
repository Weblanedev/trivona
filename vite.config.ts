import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id: string) {
          // Separate vendor chunks
          if (id.indexOf('node_modules') !== -1) {
            if (id.indexOf('react') !== -1 || id.indexOf('react-dom') !== -1 || id.indexOf('react-router') !== -1) {
              return 'react-vendor';
            }
            if (id.indexOf('zustand') !== -1) {
              return 'zustand';
            }
            // Other node_modules go into vendor chunk
            return 'vendor';
          }
        },
      },
    },
    chunkSizeWarningLimit: 600,
  },
})
