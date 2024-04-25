import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import rehypeExternalLinks from 'rehype-external-links';
import remarkToc from 'remark-toc';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import { defineConfig, squooshImageService } from 'astro/config';

import sentry from '@sentry/astro';
import spotlightjs from '@spotlightjs/astro';
import pagefind from 'astro-pagefind';

// https://astro.build/config
export default defineConfig({
  site: 'https://coderfee.com',
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'viewport',
  },
  image: {
    service: squooshImageService(),
  },
  markdown: {
    syntaxHighlight: 'shiki',
    gfm: true,
    shikiConfig: {
      theme: 'vitesse-dark',
      wrap: true,
    },
    remarkPlugins: [[remarkToc, { headings: ['h2', 'h3', 'h4'] }]],
    rehypePlugins: [
      [rehypeSlug, [rehypeAutolinkHeadings, { behavior: 'append' }]],
      [
        rehypeExternalLinks,
        {
          content: { type: 'text', value: ' 🔗' },
          target: '_blank',
        },
      ],
    ],
  },
  integrations: [
    pagefind(),
    mdx(),
    sitemap(),
    tailwind(),
    react(),
    sentry({
      sourceMapsUploadOptions: {
        enabled: false,
        telemetry: false,
      },
    }),
    spotlightjs(),
  ],
  server: {
    host: 'dev.coderfee.com',
    port: 80,
    open: '/',
  },
});
