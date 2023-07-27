/* eslint-disable simple-import-sort/imports */
import { createApp } from 'vue';

import App from './App.vue';
import router from './router';
import { store } from './store';
import { setupGlobDirectives } from '@/directives';

import 'tdesign-vue-next/es/style/index.css';
import '@/style/index.less';
import './permission';

const app = createApp(App);

app.use(store);
app.use(router);
// 注册指令
setupGlobDirectives(app);

app.mount('#app');
