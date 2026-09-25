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
import pcEnvironment from './config/pc.env.json';

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      'spring-autumn-gis/env.config.json': fileURLToPath(
        new URL('../../SpringAndAutumnGIS/SpringAndAutumnGIS/env.config.json', import.meta.url)
      )
    }
  },
  server: {
    host: pcEnvironment.devServer.host,
    port: pcEnvironment.devServer.port,
    strictPort: pcEnvironment.devServer.strictPort,
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
    strictPort: pcEnvironment.devServer.strictPort,
    proxy: {
      '/api': {
        target: pcEnvironment.api.productionReverseProxyUpstream,
        changeOrigin: true
      }
    }
  }
});
