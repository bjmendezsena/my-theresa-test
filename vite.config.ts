import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import postcssNesting from 'postcss-nesting';

const port = Number(process.env.PORT) || 3000;

export default defineConfig(({ command }) => ({
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "./src/styles/variables.scss" as *;`,
        quietDeps: true,
        silenceDeprecations: ['legacy-js-api'],
      },
    },
    postcss: {
      plugins: [postcssNesting()],
    },
    devSourcemap: true,
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'],
    force: false,
    entries: ['./src/entry-client.tsx', './src/index.scss'],
  },
  base: '/',
  publicDir: 'public',
  define: {
    'process.env': {
      NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
      PORT: JSON.stringify(process.env.PORT || '3000'),
    },
  },
  plugins: [react(), tsconfigPaths()],
  server: {
    port,
    middlewareMode: false,
    hmr: {
      overlay: false,
    },
  },
  build: {
    minify: process.env.NODE_ENV === 'production' ? 'esbuild' : false,
    cssCodeSplit: process.env.NODE_ENV === 'production',
  },
  ssr: {
    noExternal: process.env.NODE_ENV === 'development' ? [] : undefined,
  },
}));
