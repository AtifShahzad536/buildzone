import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    sourcemap: true,
    cssCodeSplit: true,
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            // Heavy chart library isolated exclusively to admin
            if (id.includes('recharts') || id.includes('d3-')) {
              return 'vendor-charts';
            }
            // 3D Three.js engine isolated
            if (id.includes('three') || id.includes('@react-three')) {
              return 'vendor-three';
            }
            // Animation library
            if (id.includes('gsap')) {
              return 'vendor-gsap';
            }
            // Form validation
            if (id.includes('zod') || id.includes('react-hook-form') || id.includes('@hookform')) {
              return 'vendor-forms';
            }
            // Icons
            if (id.includes('lucide-react')) {
              return 'vendor-icons';
            }
            // State management
            if (id.includes('@reduxjs/toolkit') || id.includes('react-redux')) {
              return 'vendor-redux';
            }
            // Core React & Router (Ultra-light for instant LCP)
            if (
              id.includes('/node_modules/react/') || 
              id.includes('/node_modules/react-dom/') || 
              id.includes('/node_modules/react-router/') || 
              id.includes('/node_modules/react-router-dom/')
            ) {
              return 'vendor-react-core';
            }
          }
        },
      },
    },
  },
});
