import { defineConfig, Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import fs from "fs";

// ---------------------
// Plugin: копирование public после сборки
// ---------------------
function copyPublicPlugin(): Plugin {
  return {
    name: "copy-public",
    apply: "build",
    enforce: "post",
    closeBundle: async () => {
      const publicDir = path.resolve(__dirname, "public");
      const outDir = path.resolve(__dirname, "dist/client");

      try {
        if (fs.existsSync(publicDir)) {
          fs.cpSync(publicDir, outDir, { recursive: true, force: true });
          console.log(`✓ Copied public folder to ${outDir}`);
        }
      } catch (err) {
        console.error("Error copying public folder:", err);
      }
    },
  };
}

// ---------------------
// Vite config
// ---------------------
export default defineConfig({
  server: {
    host: true,
    port: 8080,
    // @ts-ignore
    allowedHosts: process.env.TEMPO === "true" ? true : undefined,
  },
  build: { outDir: "dist/client" },
  publicDir: "public",
  plugins: [react(), copyPublicPlugin()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./client"),
      "@shared": path.resolve(__dirname, "./shared"),
    },
  },
});
