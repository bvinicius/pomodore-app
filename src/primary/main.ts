import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { createPersistedState } from 'pinia-plugin-persistedstate';

import '@/primary/index.css';
import App from '@/primary/App.vue';
import router from '@/primary/infrastructure/router';
import { provide } from '@/primary/infrastructure/dependency-injection';

console.log('VITE_SUPABASE_URL', import.meta.env.VITE_SUPABASE_URL);
console.log('VITE_SUPABASE_API_KEY', import.meta.env.VITE_SUPABASE_API_KEY);
console.log(
    'VITE_SUPABASE_API_SECRET',
    import.meta.env.VITE_SUPABASE_API_SECRET
);
console.log(
    'VITE_SUPABASE_JWT_SECRET',
    import.meta.env.VITE_SUPABASE_JWT_SECRET
);

const app = createApp(App);

provide(app);

const pinia = createPinia();
pinia.use(createPersistedState());

app.use(pinia);
app.use(router);

app.mount('#app');
