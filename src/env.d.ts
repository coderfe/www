/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_SUPABASE_URL: string;
  readonly PUBLIC_SUPABASE_SERVICE_KEY: string;
  readonly PUCLIC_BASE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
