import { defineConfig } from "vite";

export default defineConfig({
  build: {
    outDir: "dist",
    target: "esnext",
    ssr: true,
    rollupOptions: {
      input: "./src/index.ts",
    },
  },
});
