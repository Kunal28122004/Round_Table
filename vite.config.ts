import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig(() => ({
  server: {
    host: "::",
    port: 8080,
    fs: {
      allow: ["."],
    },
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: "dist",
  },
  // This tells Vercel and local dev server to fallback to index.html
  // for all routes, enabling BrowserRouter support
  preview: {
    port: 8080,
  },
}));
