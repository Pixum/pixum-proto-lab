import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/pixum-proto-lab/layouts/',
  plugins: [react()],
})
