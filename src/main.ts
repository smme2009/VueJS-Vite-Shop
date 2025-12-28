import './assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './assets/tailwind.css'

// 建立Vue的實例
const app = createApp(App)

// 引入套件
app.use(createPinia())
app.use(router)
app.use(ElementPlus)

// 掛載Vue實例
app.mount('#app')
