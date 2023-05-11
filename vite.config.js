import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

const addPrefixPlugin = (prefix) => ({
  name: 'add-prefix-plugin',
  async transformIndexHtml(html) {
      return html.replace(/(href|src)="(?!http|\/\/)/g, `$1="${prefix}`)
  },
})

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // addPrefixPlugin("/stat"),
    // ...
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    port: 8090,
    open: true
  }
})
