import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ command, mode }) => {
  const isProd = mode === 'production' || command === 'build';
  const basePath = process.env.BASE_PATH || (isProd ? '/shlloka-yatra/' : '/');

  return {
    base: basePath,
    plugins: [react()],
    server: {
      port: 5173,
      proxy: {
        '/api': {
          target: 'http://localhost:5000',
          changeOrigin: true,
        },
      },
    },
  };
});
