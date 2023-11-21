import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { createPersistedState } from 'pinia-plugin-persistedstate';
import App from '@/primary/App.vue';
import PhosphorIcons from '@phosphor-icons/vue';

import '@/primary/index.css';
import router from '@/primary/infrastructure/router';
import '../includes/firebase';
const app = createApp(App);
app.use(router);

const pinia = createPinia();
pinia.use(createPersistedState());

app.use(pinia);
app.use(PhosphorIcons);

app.mount('#app');
