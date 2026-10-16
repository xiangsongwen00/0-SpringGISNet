import { defineConfig } from "vite";
import uni from "@dcloudio/vite-plugin-uni";
import apkEnvironment from "./config/apk.env.json";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [uni()],
  server: {
    host: apkEnvironment.development.h5Server.host,
    port: apkEnvironment.development.h5Server.port,
    strictPort: apkEnvironment.development.h5Server.strictPort,
    proxy: {
      '/api': {
        target: apkEnvironment.development.apiProxyTarget,
        changeOrigin: true,
      },
    },
  },
  preview: {
    host: apkEnvironment.development.h5Server.host,
    port: apkEnvironment.development.h5Server.previewPort,
    strictPort: apkEnvironment.development.h5Server.strictPort,
  },
});
