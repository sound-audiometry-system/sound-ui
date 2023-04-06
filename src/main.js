import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/main.css'
// 引入elementplus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
const app = createApp(App).use(ElementPlus).use(router).mount('#app')
