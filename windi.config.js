/* eslint-disable */
import { defineConfig } from 'windicss/helpers';

export default defineConfig({
  darkMode: 'class',
  extract: {
    include: ['src/**/*.{html,vue,jsx,tsx,svelte}'],
  },
});
