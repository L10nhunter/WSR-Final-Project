import './assets/main.css'
import "vue-toastification/dist/index.css";

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Toast from "vue-toastification";

const app = createApp(App)

const options = {
    position: 'top-right',
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

    .mount('#app')
