import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

const port = Number(process.env.PORT) || 3000;

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  server: { port },
  build: {
    minify: false,
  },
});
