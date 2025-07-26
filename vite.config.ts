import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import postcssNesting from "postcss-nesting";

const port = Number(process.env.PORT) || 3000;

export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "./src/styles/variables.scss" as *;`,
        quietDeps: true,
      },
    },
    postcss: {
      plugins: [postcssNesting()],
    },
  },
  optimizeDeps: {
    include: ["react", "react-dom", "react-router-dom"],
  },
  base: "/",
  publicDir: "public",
  define: {
    "process.env": {
      NODE_ENV: JSON.stringify(process.env.NODE_ENV || "development"),
      PORT: JSON.stringify(process.env.PORT || "3000"),
    },
  },
  plugins: [react(), tsconfigPaths()],
  server: { port },
  build: {
    minify: process.env.NODE_ENV === "production" ? "esbuild" : false,
  },
});
