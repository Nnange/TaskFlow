import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  base: '/',
  test: {
    name: 'todo-frontend-tests',
    globals: true,
    coverage: {
      provider: 'v8',
      reporter: [
        ['lcov', {project: './coverage/lcov.info'}]
      ],
    },
    include: ['src/tests/**/*.{test,spec}.{js,ts,jsx,tsx}'],
    environment: 'jsdom',
    exclude: [
      '**/node_modules/**',
      '**/dist/**',
      './temp/**',
    ],
  },
})
