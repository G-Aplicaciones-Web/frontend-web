import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';
import 'primeicons/primeicons.css';
import './style.css';
import { createI18n } from 'vue-i18n';
import en from './locales/en.json';
import es from './locales/es.json';
import ToastService from 'primevue/toastservice';
import Toast from 'primevue/toast';

const i18n = createI18n({
    legacy: false,
    locale: 'en',
    fallbackLocale: 'en',
    messages: {
        en,
        es
    }
});

const app = createApp(App);

app.use(PrimeVue, {
    theme: {
        preset: Aura,
        options: {
            darkModeSelector: '.app-dark-mode',
            cssLayer: true
        }
    }
});
app.use(router);
app.use(i18n);
app.use(ToastService);

app.component('Toast', Toast);

app.mount('#app');
