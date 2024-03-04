<script setup lang="ts">
import {RouterLink} from 'vue-router';
import {onMounted, ref} from 'vue';
import "bulma/css/bulma.css";
import "../assets/base.css";

const isMobile = ref(false)
const isBurgerActive = ref(false);


function toggleBurgerActive() {
    isBurgerActive.value = !isBurgerActive.value;
}

function checkMobile() {
    isMobile.value = window.innerWidth < 1024;
}

window.addEventListener('resize', () => {
    if (window.innerWidth > 1024) {
        isBurgerActive.value = false;
    }
    checkMobile();
});

onMounted(() => {
    checkMobile();
});

</script>

<template>
    <nav class="navbar" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
            <router-link @click="isBurgerActive = false" class="navbar-item" to="/">
                <img src="../assets/logo.svg" width="28" height="28" alt="bulma logo">
            </router-link>

            <a role="button" :class="isBurgerActive && 'is-active'" @click="toggleBurgerActive()" class="navbar-burger"
               aria-label="menu" aria-expanded="false"
               data-target="navbarBasicExample">
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
            </a>
        </div>

        <div class="navbar-menu" :class="isBurgerActive && 'is-active', !isMobile && 'is-hidden'">
            <div class="navbar-start">
                <router-link class="navbar-item" to="/">
                    Home
                </router-link>
                <router-link class="navbar-item" to="/documentation">
                    Documentation
                </router-link>
                <router-link class="navbar-item" to="/about">
                    About
                </router-link>
                <router-link class="navbar-item" to="/contact">
                    Contact Us
                </router-link>
                <router-link class="navbar-item" to="/report">
                    Report an issue
                </router-link>
            </div>
        </div>

        <div id="navbarBasicExample" class="navbar-menu">
            <div class="navbar-start">
                <router-link class="navbar-item" to="/">
                    Home
                </router-link>

                <router-link class="navbar-item" to="/documentation">
                    Documentation
                </router-link>

                <div class="navbar-item has-dropdown is-hoverable">
                    <a class="navbar-link">
                        More
                    </a>

                    <div class="navbar-dropdown">
                        <router-link class="navbar-item" to="/about">
                            About
                        </router-link>
                        <router-link class="navbar-item" to="/contact">
                            Contact Us
                        </router-link>
                        <hr class="navbar-divider">
                        <router-link class="navbar-item" to="/report">
                            Report an issue
                        </router-link>
                    </div>
                </div>
            </div>

            <div class="navbar-end">
                <div class="navbar-item">
                    <div class="buttons">
                        <router-link class="button is-primary has-text-black has-text-weight-bold" to="/signup">
                            Sign up
                        </router-link>
                        <router-link class="button is-light has-text-weight-bold" to="/login">
                            Log in
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </nav>
</template>

<style scoped>
@media (prefers-color-scheme: dark) {
    .navbar {
        background: #181818;
        border-bottom: 1px solid #232323;
    }
    .navbar-menu {
        background: #181818;
        color: white;
    }
    .navbar-dropdown {
        background: #181818;
        color: white;
    }
    .navbar-item {
        background: #181818;
        color: white;
    }
    .navbar-item:hover {
        background: #232323;
        color: white;
    }
    a.navbar-link {
        background: #181818;
        color: white;
    }
    a.navbar-link:hover {
        background: #232323;
        color: white;
    }
    a:hover {
        background: #232323;
        color: white;
    }
}
@media (prefers-color-scheme: light) {
    .navbar {
        background: #ffffff;
        border-bottom: 1px solid #dbdbdb;
    }

}
</style>