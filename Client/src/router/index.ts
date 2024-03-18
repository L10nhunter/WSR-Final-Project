// noinspection TypeScriptCheckImport
import {createRouter, createWebHistory} from 'vue-router';
import {routes} from 'vue-router/auto-routes';
import {LoggedIn} from "@/model/users";
import {showLoginModal} from "@/model/users";


const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: routes,
})

router.beforeEach((to, from, next) => {
    if (to.meta.requiresAuth && !LoggedIn.user){
        showLoginModal.value = true;
    }
    else {
        next();
    }
})

export default router
