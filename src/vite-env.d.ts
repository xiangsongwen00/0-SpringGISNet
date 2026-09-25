/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ENABLE_TERRAIN?: string;
  readonly VITE_GEOVIS_TERRAIN_URL?: string;
  readonly VITE_GEOVIS_TERRAIN_SCHEME?: 'xyz' | 'tms';
  readonly VITE_MAPTILER_KEY?: string;
  readonly VITE_TIANDITU_TOKEN?: string;
  readonly VITE_TERRAIN_EXAGGERATION?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare module 'spring-autumn-gis/env.config.json' {
  const layerCatalog: {
    defaultBaseLayerId?: string;
    defaults?: { levelOffset?: number };
    sources: unknown[];
    layers: Array<{ id: string; sourceId?: string; role?: string; levelOffset?: number }>;
  };

  export default layerCatalog;
}

declare module '../../token.json' {
  const tokenConfig: {
    tianditu?: { token?: string };
  };

  export default tokenConfig;
}
