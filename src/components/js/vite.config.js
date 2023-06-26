import { defineConfig } from "vite";
import image from "@rollup/plugin-image";

export default defineConfig({
  // ... other configuration options ...
  plugins: [image()],
});
