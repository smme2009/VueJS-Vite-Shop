import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import router from '@/router/Index.js';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';

const app = createApp(App);

app.use(ElementPlus); // 導入Element Plus
app.use(router); // 導入Vue Router

// 導入Pinia
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate) // 記憶狀態套件
app.use(pinia);

// 導入Icon
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component);
}

app.mount('#app');