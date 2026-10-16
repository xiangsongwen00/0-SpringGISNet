/*
 * @Author: yangjie
 * @Date: 2026-09-21 23:53:26
 * @LastEditors: yangjie 
 * @LastEditTime: 2026-09-22 00:27:34
 * @FilePath: \0-SpringGISNet\site\vite.config.ts
 * @Description: 
 * 
 * Copyright (c) 2026 by bimcc, All Rights Reserved. 
 */
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { fileURLToPath } from 'node:url';
import { resourceConfigPlugin } from './scripts/public-resource-config.mjs';
import pcEnvironment from './config/pc.env.json';

export default defineConfig({
  plugins: [vue(), resourceConfigPlugin(fileURLToPath(new URL('./token.json', import.meta.url)))],
  build: {
    rollupOptions: {
      input: {
        site: fileURLToPath(new URL('./index.html', import.meta.url)),
        sdk: fileURLToPath(new URL('./sdk.html', import.meta.url)),
        sdkJs: fileURLToPath(new URL('./sdk-js.html', import.meta.url))
      }
    }
  },
  server: {
    host: pcEnvironment.devServer.host,
    port: pcEnvironment.devServer.port,
    strictPort: pcEnvironment.devServer.strictPort,
    fs: { deny: ['**/.git/**', '**/.env', '**/.env.*', '**/*.{crt,pem}', '**/token.json'] },
    proxy: {
      '/api': {
        target: pcEnvironment.api.developmentProxyTarget,
        changeOrigin: true
      }
    }
  },
  preview: {
    host: pcEnvironment.devServer.host,
    port: pcEnvironment.devServer.previewPort,
    strictPort: pcEnvironment.devServer.strictPort
  }
});
