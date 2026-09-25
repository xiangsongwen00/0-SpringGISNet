import { defineConfig } from "vite";
import uni from "@dcloudio/vite-plugin-uni";
import apkEnvironment from "./config/apk.env.json";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [uni()],
  server: {
    host: apkEnvironment.h5DebugServer.host,
    port: apkEnvironment.h5DebugServer.port,
    strictPort: apkEnvironment.h5DebugServer.strictPort,
    proxy: {
      '/api': {
        target: apkEnvironment.api.h5DevelopmentProxyTarget,
        changeOrigin: true,
      },
    },
  },
  preview: {
    host: apkEnvironment.h5DebugServer.host,
    port: apkEnvironment.h5DebugServer.previewPort,
    strictPort: apkEnvironment.h5DebugServer.strictPort,
  },
});
