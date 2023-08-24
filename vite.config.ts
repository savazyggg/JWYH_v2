import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import removeConsole from "vite-plugin-remove-console";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), removeConsole()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // 필요한 모듈을 별도의 청크로 분할하기 위한 설정
          if (id.includes("node_modules")) {
            return "vendor";
          }
        },
      },
    },
  },
  resolve: {
    alias: {
      "@mui/styled-enine": "@mui/styled-engine-sc",
    },
  },
});
