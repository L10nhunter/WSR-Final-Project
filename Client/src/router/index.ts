import {createRouter, createWebHistory} from 'vue-router';
import {routes} from 'vue-router/auto-routes';
import {showLoginModal} from "@/model/users";
import {getUser, getSession} from "@/model/session";


const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: routes,
})

router.beforeEach((to, from, next) => {
    if (to.meta.requiresAuth && !getUser()) {
        const session = getSession();
        session.redirectURL = to.fullPath;
        showLoginModal.value = true;
        next(false);
    }
    else next();
})

export default router