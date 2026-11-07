import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
// BASE_PATH is set by the GitHub Pages workflow; defaults to '/' for local dev and Netlify.
export default defineConfig({
  plugins: [react()],
  base: process.env.BASE_PATH || '/',
})
