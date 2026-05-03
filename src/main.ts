import './assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import './assets/tailwind.css'

// 建立Vue的實例
const app = createApp(App)

// 引入套件
app.use(createPinia())
app.use(router)

// 掛載Vue實例
app.mount('#app')
