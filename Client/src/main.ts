import './assets/main.css'
import "vue-toastification/dist/index.css";

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Toast from "vue-toastification";
import Oruga from '@oruga-ui/oruga-next'
import { bulmaConfig } from '@oruga-ui/theme-bulma';
import '@oruga-ui/theme-bulma/dist/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

const app = createApp(App)

const options = {
    position: 'top-center',
    timeout: 5000,
    closeOnClick: true,
    pauseOnFocusLoss: true,
    pauseOnHover: false,
    draggable: true,
    draggablePercent: 0.6,
    showCloseButtonOnHover: true,
    hideProgressBar: false,
    closeButton: "button",
    transition: "Vue-Toastification__fade",
    icon: true,
    rtl: false
}

app
    .use(router)
    .use(Toast, options)
    .use(Oruga, bulmaConfig)

    .mount('#app')
