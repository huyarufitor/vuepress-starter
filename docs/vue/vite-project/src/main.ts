import { createApp } from 'vue';
import App from './App.vue';
import router from './router/index.ts';
import store from './store';
import ElementPlus from 'element-plus'// 全局引用element-ui
import 'element-plus/dist/index.css'
createApp(App)
.use(router)
.use(store)
.use(ElementPlus)
.mount('#app');


