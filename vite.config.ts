import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react';
import path from "node:path";
import process from "node:process";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@/": path.resolve(process.cwd(), 'src'),
      "@/api": path.resolve(process.cwd(), 'src/api'),
      "@/app": path.resolve(process.cwd(), 'src/app'),
      "@/components": path.resolve(process.cwd(), 'src/components'),
      "@/ducks": path.resolve(process.cwd(), 'src/ducks'),
      "@/hooks": path.resolve(process.cwd(), 'src/hooks'),
      "@/types": path.resolve(process.cwd(), 'src/types'),
      "@/utils": path.resolve(process.cwd(), 'src/utils'),
    }
  },
  base: "/apps/time-clock/",
  build: {
    manifest: true,
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor'
          }
          if (id.includes('src/components')) {
            return 'components';
          }
        }
      }
    }
  },
  server: {
    port: 8080,
    host: 'localhost',
    proxy: {
      '/api': {
        target: 'http://localhost:8081',
        changeOrigin: true,
      },
      '/images': {
        target: 'https://intranet.chums.com',
        changeOrigin: true,
      },
      '/timeclock/images': {
        target: 'https://intranet.chums.com',
        changeOrigin: true,
      },
      '/timeclock': {
        target: 'http://localhost:8081',
        changeOrigin: true,
      }
    }
  }
})
