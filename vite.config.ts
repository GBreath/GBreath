import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { VitePWA } from "vite-plugin-pwa";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    svelte(),
    VitePWA({
      manifest: {
        theme_color: "#191A1B",
        background_color: "#FFFFFF",
        display: "standalone",
        scope: "/",
        start_url: "/",
        name: "GBreath",
        short_name: "GBreath",
        description:
          "GBreath is an open-source project to help you with your breathing practice.",
        icons: [
          {
            src: "/images/icon-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/images/icon-256x256.png",
            sizes: "256x256",
            type: "image/png",
          },
          {
            src: "/images/icon-384x384.png",
            sizes: "384x384",
            type: "image/png",
          },
          {
            src: "/images/icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
      workbox: {},
    }),
  ],
  resolve: {
    alias: {
      "@/": `${path.resolve(__dirname, "src")}/`,
    },
  },
  optimizeDeps: {
    exclude: ["svelte-navigator"],
  },
});
