import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import staticSchema from './vite-plugin-static-schema.js'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), staticSchema()],
})
