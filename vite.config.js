import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";

import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

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
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server: {
    port: 8090,
    open: true,
    cors: true,
    proxy: {
      "/api": { //apiTest是自行设置的请求前缀，按照这个来匹配请求，有这个字段的请求，就会进到代理来
        target: 'http://192.168.2.114:8080',
        changeOrigin: true, //是否跨域
        rewrite: (path) => path.replace('/api', '')
    }
    },
  },
});
