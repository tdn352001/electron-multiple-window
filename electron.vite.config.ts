import react from '@vitejs/plugin-react'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import { resolve } from 'path'

export default defineConfig({
  main: {
    resolve: {
      alias: {
        '@main': resolve('src/main')
      }
    },
    plugins: [externalizeDepsPlugin()]
  },
  preload: {
    resolve: {
      alias: {
        '@main': resolve('src/main')
      }
    },
    plugins: [externalizeDepsPlugin()]
  },
  renderer: {
    resolve: {
      alias: {
        '@': resolve('src/renderer/src'),
        '@main': resolve('src/main')
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
