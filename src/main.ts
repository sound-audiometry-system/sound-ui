import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/main.css'
// 引入element plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as Icons from '@element-plus/icons-vue' // （1）引入
//必须引入的核心，换成require也是一样的。注意：recorder-core会自动往window下挂载名称为Recorder对象，全局可调用window.Recorder，也许可自行调整相关源码清除全局污染
import Recorder from 'recorder-core'

//引入相应格式支持文件；如果需要多个格式支持，把这些格式的编码引擎js文件放到后面统统引入进来即可
import 'recorder-core/src/engine/mp3'
import 'recorder-core/src/engine/mp3-engine' //如果此格式有额外的编码引擎（*-engine.js）的话，必须要加上

//以上三个也可以合并使用压缩好的recorder.xxx.min.js
//比如 import Recorder from 'recorder-core/recorder.mp3.min' //已包含recorder-core和mp3格式支持

//可选的插件支持项
import 'recorder-core/src/extensions/waveview'

const app = createApp(App)
app.use(Recorder);
for (let icon in Icons) {
    app.component(icon, (Icons as any)[icon]) // （2） 全局注册
}

app.use(ElementPlus).use(router).mount('#app')