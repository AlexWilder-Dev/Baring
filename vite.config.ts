import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages serves this repo at /<repo name>/. The deploy workflow passes the real address in
// SITE_URL (from actions/configure-pages), so the asset base and the absolute link-preview URLs in
// index.html always match wherever Pages puts the site.
const DEFAULT_URL = 'https://alexwilder-dev.github.io/Baring/'
const siteUrl = (process.env.SITE_URL || DEFAULT_URL).replace(/\/*$/, '/')

export default defineConfig({
  base: new URL(siteUrl).pathname,
  plugins: [
    react(),
    {
      name: 'site-url',
      transformIndexHtml: (html) => html.replaceAll(DEFAULT_URL, siteUrl),
    },
  ],
})
