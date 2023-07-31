import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from '@/primary/App.vue';
import '@/primary/index.css';

const app = createApp(App);

app.use(createPinia());

app.mount('#app');
