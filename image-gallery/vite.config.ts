import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), // plugin oficial Tailwind v4 para Vite
  ],
  server: {
    host: true, // permite --host 0.0.0.0 y accesos desde la red
    port: 5173,
  },
})
