import react from '@vitejs/plugin-react';
import { mergeConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import { configDefaults, defineConfig } from 'vitest/config';
import viteConfig from './vite.config';

export default defineConfig(configEnv =>
  mergeConfig(viteConfig(configEnv), {
    plugins: [tsconfigPaths(), react()],
    test: {
      globals: true,
      environment: 'jsdom',
      globalSetup: './src/tests/setup-globals.ts',
      setupFiles: './src/tests/setup.ts',
      css: false,
      reporters: ['default'],
      coverage: {
        provider: 'v8',
        reporter: ['text', 'text-summary', 'cobertura'],
        exclude: [
          ...configDefaults.exclude,
          '**/tests/**/*.ts',
          '**/tests/**/*.tsx',
          '**/*.spec.ts',
          '**/*.spec.tsx',
        ],
      },
    },
  })
);
