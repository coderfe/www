const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        primary: '#33b270',
        'accent-1': '#ffca21',
        'text-1': '#242f5a',
        'bg-1': '#fdfdff',
      },
      fontFamily: {
        sans: ['LXGW WenKai', ...defaultTheme.fontFamily.sans],
        mono: ['MonoLisa', ...defaultTheme.fontFamily.mono],
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
