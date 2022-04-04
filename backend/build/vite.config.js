"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vite_1 = require("vite");
exports.default = (0, vite_1.defineConfig)({
    build: {
        outDir: "build",
        target: "esnext",
        ssr: true,
        rollupOptions: {
            input: "./src/index.ts",
        },
    },
});
