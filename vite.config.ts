import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
    build: {
      // Enable code splitting for better performance
      rollupOptions: {
        output: {
          manualChunks: {
            // Split vendor dependencies
            'react-vendor': ['react', 'react-dom'],
            'firebase-vendor': ['firebase'],
            'lucide-vendor': ['lucide-react'],
            'motion-vendor': ['motion'],
            'three-vendor': ['three'],
          },
        },
      },
      // Optimize chunk size
      chunkSizeWarningLimit: 1000,
      // Minify CSS
      cssMinify: true,
      // Target modern browsers for better performance
      target: 'esnext',
      // Enable compression
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
        },
      },
    },
  };
});
