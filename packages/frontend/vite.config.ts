import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  test: {
    globals: true,  // to use global fonctions like describe, it, expect, etc.
    environment: 'jsdom', // necessary to test components that manipulate the DOM
    include: ['tests/unit/**/*.spec.{js,ts}'],
  }
})
