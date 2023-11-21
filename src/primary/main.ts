import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { createPersistedState } from 'pinia-plugin-persistedstate';
import App from '@/primary/App.vue';
import router from '@/primary/infrastructure/router';
import '@/primary/index.css';
import '@/includes/firebase';

const app = createApp(App);

const pinia = createPinia();
pinia.use(createPersistedState());

app.use(pinia);
app.use(router);

app.mount('#app');
