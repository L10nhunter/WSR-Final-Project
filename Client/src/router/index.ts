import {createRouter, createWebHistory} from 'vue-router';
import {routes} from 'vue-router/auto-routes';


const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: routes,
})

router.beforeEach((to, from, next) => {
    next();
})

export default router
