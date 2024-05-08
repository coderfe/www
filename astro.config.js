import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import { transformerMetaHighlight, transformerNotationDiff } from '@shikijs/transformers';
import { defineConfig, squooshImageService } from 'astro/config';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeExternalLinks from 'rehype-external-links';
import rehypeCodeProps from 'rehype-mdx-code-props';
import rehypeSlug from 'rehype-slug';
import remarkToc from 'remark-toc';

import sentry from '@sentry/astro';
import pagefind from 'astro-pagefind';

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
      transformers: [transformerNotationDiff(), transformerMetaHighlight()],
    },
    remarkPlugins: [[remarkToc, { headings: ['h2', 'h3', 'h4'] }]],
    rehypePlugins: [
      [rehypeSlug, [rehypeAutolinkHeadings, { behavior: 'append' }]],
      [rehypeCodeProps, []],
      [
        rehypeExternalLinks,
        {
          content: { type: 'text', value: '🔗' },
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
  ],
  devToolbar: {
    enabled: false,
  },
  server: {
    host: 'dev.coderfee.com',
    port: 80,
  },
});
