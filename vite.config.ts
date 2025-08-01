import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import postcssNesting from 'postcss-nesting';
import {
  siteBasedResolver,
  createSiteConfig,
} from './plugins/site-based-resolver';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const siteId = env.SITE_ID;
  const port = Number(env.PORT) || 3000;

  const siteConfig = createSiteConfig(siteId);

  return {
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
        NODE_ENV: JSON.stringify(env.NODE_ENV || 'development'),
        PORT: JSON.stringify(env.PORT || '3000'),
        SITE_ID: JSON.stringify(siteId || ''),
      },
    },
    plugins: [siteBasedResolver(siteConfig), react(), tsconfigPaths()],
    server: {
      port,
      middlewareMode: false,
      hmr: {
        overlay: false,
      },
    },
    build: {
      minify: env.NODE_ENV === 'production' ? ('esbuild' as const) : false,
      cssCodeSplit: env.NODE_ENV === 'production',
    },
    ssr: {
      noExternal: env.NODE_ENV === 'development' ? [] : undefined,
    },
  };
});
