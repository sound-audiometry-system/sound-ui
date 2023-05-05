import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/main.css'
// 引入element plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as Icons from '@element-plus/icons-vue' // （1）引入

const app = createApp(App)

for (let icon in Icons) {
    app.component(icon, (Icons as any)[icon]) // （2） 全局注册
}

app.use(ElementPlus).use(router).mount('#app')