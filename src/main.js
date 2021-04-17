import { createApp } from 'troisjs';
import App from './App.vue';
import router from './router';
import store from './store';
import axios from 'axios'
import { createHead } from '@vueuse/head';

const app = createApp(App)
const head = createHead()

app.use(store)
app.use(router)
app.use(head)
app.config.globalProperties.axios=axios

app.mount('#app');
