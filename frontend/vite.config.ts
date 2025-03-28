import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
// Remove incorrect import and use the proper way to configure tailwindcss
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
});
