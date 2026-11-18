import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/pixum-proto-lab/smart-select-prototype/',
  plugins: [react()],
  server: {
    port: 5173,
    strictPort: true,
  },
})
