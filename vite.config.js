import { defineConfig } from "vite";
import purgecss from 'vite-plugin-purgecss';
import react from "@vitejs/plugin-react-swc";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),purgecss()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Group vendor dependencies (keep these)
          react: ["react", "react-dom"],
          router: ["react-router-dom"],
          validation: ["joi-browser"],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
});
