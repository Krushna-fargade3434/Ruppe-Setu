import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    VitePWA({
      registerType: "prompt",
      includeAssets: ["paisa-vault-logo.png"],
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],
        navigateFallback: "/index.html",
      },
      manifest: {
        name: "Paisa Vault",
        short_name: "PaisaVault",
        description: "Your personal expense and income tracker",
        theme_color: "#2CA87F",
        background_color: "#ffffff",
        display: "standalone",
        scope: "/",
        start_url: "/",
        id: "paisa-vault",
        orientation: "portrait",
        categories: ["finance", "productivity", "utilities"],
        icons: [
          {
            src: "/paisa-vault-logo.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any maskable",
          },
          {
            src: "/paisa-vault-logo.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
