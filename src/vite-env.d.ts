/// <reference types="vite/client" />

declare module "modern-normalize";

interface ImportMetaEnv {
  readonly VITE_TMDB_TOKEN?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
