import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { createPersistedState } from 'pinia-plugin-persistedstate';
import PhosphorIcons from '@phosphor-icons/vue';

import '@/primary/index.css';
import App from '@/primary/App.vue';
import router from '@/primary/infrastructure/router';
import { provide } from '@/primary/infrastructure/dependency-injection';

const app = createApp(App);

provide(app);

const pinia = createPinia();
pinia.use(createPersistedState());

app.use(pinia);
app.use(router);
app.use(PhosphorIcons);

app.mount('#app');
