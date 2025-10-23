/* eslint-env node */
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Use repo base only for GitHub Pages builds; keep '/' for Vercel/Netlify
const isGhPages = process.env.GITHUB_PAGES === 'true' || process.env.DEPLOY_TARGET === 'gh-pages'
const repoBase = '/PersonalWebsite/'

export default defineConfig({
  plugins: [react()],
  base: isGhPages ? repoBase : '/',
  build: {
    outDir: 'dist',
  }
})
