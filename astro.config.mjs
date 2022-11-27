import { defineConfig } from 'astro/config'

// https://astro.build/config
import mdx from '@astrojs/mdx'
import Unocss from 'unocss/astro'
import { presetTypography, presetUno } from 'unocss'
import presetIcons from '@unocss/preset-icons'
import transformerVariantGroup from '@unocss/transformer-variant-group'

// https://astro.build/config
import sitemap from '@astrojs/sitemap'

// https://astro.build/config
import prefetch from '@astrojs/prefetch'

// https://astro.build/config
export default defineConfig({
  site: 'https://coderfee.com',
  markdown: {
    shikiConfig: {
      theme: 'vitesse-dark',
    },
  },
  integrations: [
    mdx(),
    Unocss({
      transformers: [transformerVariantGroup()],
      presets: [
        presetUno(),
        presetTypography(),
        presetIcons({
          extraProperties: {
            display: 'inline-block',
            'vertical-align': 'middle',
            width: '1.2em',
            height: '1.2em',
          },
        }),
      ],
    }),
    sitemap(),
    prefetch(),
  ],
})
