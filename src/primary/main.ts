import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { createPersistedState } from 'pinia-plugin-persistedstate';

import '@/primary/index.css';

import App from '@/primary/App.vue';
import { provide } from '@/primary/infrastructure/dependency-injection';
import router from '@/primary/infrastructure/router';

const app = createApp(App);

provide(app);

const pinia = createPinia();
pinia.use(createPersistedState());

app.use(pinia);
app.use(router);

app.mount('#app');
