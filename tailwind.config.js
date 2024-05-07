const defaultTheme = require('tailwindcss/defaultTheme');
const { addDynamicIconSelectors } = require('@iconify/tailwind');

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  prefix: '',
  plugins: [require('@tailwindcss/typography'), addDynamicIconSelectors()],
  theme: {
    fontFamily: {
      sans: [...defaultTheme.fontFamily.sans],
      mono: ['"Geist Mono"', 'Monolisa', ...defaultTheme.fontFamily.mono],
    },
  },
  safelist: ['icon-[tabler--home]', 'icon-[tabler--mail]'],
};
