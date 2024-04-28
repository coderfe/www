const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  prefix: '',
  plugins: [require('@tailwindcss/typography')],
  theme: {
    fontFamily: {
      sans: [...defaultTheme.fontFamily.sans],
      mono: ['"Geist Mono"', 'Monolisa', ...defaultTheme.fontFamily.mono],
    },
  },
};
