import { defineConfig } from 'astro/config'

// https://astro.build/config
import mdx from '@astrojs/mdx'
import Unocss from 'unocss/astro'
import presetUno from '@unocss/preset-uno'
import { presetTypography, presetAttributify, presetIcons } from 'unocss'
import transformerVariantGroup from '@unocss/transformer-variant-group'
import transformerDirectives from '@unocss/transformer-directives'

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
      transformers: [transformerVariantGroup(), transformerDirectives()],
      presets: [
        presetUno(),
        presetAttributify(),
        presetTypography({
          cssExtend: {
            img: {
              'border-radius': '12px',
            },
          },
        }),
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
