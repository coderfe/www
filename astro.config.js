import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import { transformerMetaHighlight, transformerNotationDiff } from '@shikijs/transformers';
import pagefind from 'astro-pagefind';
import { defineConfig } from 'astro/config';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeExternalLinks from 'rehype-external-links';
import rehypeCodeProps from 'rehype-mdx-code-props';
import rehypeSlug from 'rehype-slug';
import remarkToc from 'remark-toc';

export default defineConfig({
  site: 'https://coderfee.com',
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'viewport',
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
          content: {
            type: 'element',
            tagName: 'span',
            properties: {
              className: 'icon-[tabler--external-link]',
            },
          },
          target: '_blank',
        },
      ],
    ],
  },
  integrations: [
    react(),
    tailwind({
      applyBaseStyles: false,
    }),
    mdx(),
    sitemap(),
    pagefind(),
  ],
  devToolbar: {
    enabled: false,
  },
  vite: {
    build: {
      rollupOptions: {
        external: ['fsevents'],
      },
    },
    server: {
      watch: {
        usePolling: true,
      },
    },
  },
});
