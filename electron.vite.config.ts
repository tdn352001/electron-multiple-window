import react from '@vitejs/plugin-react'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import { resolve } from 'path'

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()]
  },
  preload: {
    plugins: [externalizeDepsPlugin()]
  },
  renderer: {
    resolve: {
      alias: {
        '@': resolve('src/renderer/src')
      }
    },

    plugins: [react()],
    build: {
      rollupOptions: {
        input: {
          node: resolve(__dirname, 'src/renderer/node.html'),
          browser: resolve(__dirname, 'src/renderer/browser.html')
        }
      }
    }
  }
})
