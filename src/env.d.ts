/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly SITE: string
  readonly SITE_NAME: string
  readonly SITE_DESCRIPTION: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
