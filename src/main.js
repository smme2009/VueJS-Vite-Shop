import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import router from '@/router/Index.js';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import store from '@/store/Index.js';

const app = createApp(App);

app.use(ElementPlus); // 導入Element Plus
app.use(router); // 導入Vue Router
app.use(store); // 導入Vuex

// 導入Icon
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component);
}

app.mount('#app');