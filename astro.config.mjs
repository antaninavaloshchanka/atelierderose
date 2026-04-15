// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://antaninavaloshchanka.github.io',
  base: '/atelierderose',
  i18n: {
    locales: ['ru'],
    defaultLocale: 'ru',
  },
  image: {
    experimentalLayout: 'constrained',
  },
  fonts: [
    {
      provider: fontProviders.fontsource(),
      name: 'Playfair Display',
      cssVariable: '--font-heading',
    },
    {
      provider: fontProviders.fontsource(),
      name: 'Inter',
      cssVariable: '--font-body',
    },
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [sitemap()],
});
