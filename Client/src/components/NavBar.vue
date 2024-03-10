<script setup lang="ts">
import {RouterLink} from 'vue-router';
import {onMounted, ref} from 'vue';
import "bulma/css/bulma.css";
import "../assets/base.css";
import LoginModal from "@/components/LoginModal.vue";

const isMobile = ref(false)
const isBurgerActive = ref(false);
const isModalActive = ref(false);


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
    <nav class="navbar is-fixed-top" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
            <router-link @click="isBurgerActive = false" class="navbar-item" to="/">
                <img src="/l10nfitnessIcon.png" width="28" alt="logo">
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
                <router-link class="navbar-item" to="/" @click="isBurgerActive = false">
                    Home
                </router-link>
                <router-link class="navbar-item" to="/documentation" @click="isBurgerActive = false">
                    Documentation
                </router-link>
                <router-link class="navbar-item" to="/products" @click="isBurgerActive = false">
                    Products
                </router-link>
                <router-link class="navbar-item" to="/users" @click="isBurgerActive = false">
                    Users
                </router-link>
                <router-link class="navbar-item" to="/about" @click="isBurgerActive = false">
                    About
                </router-link>
                <router-link class="navbar-item" to="/contact" @click="isBurgerActive = false">
                    Contact Us
                </router-link>
                <router-link class="navbar-item" to="/report" @click="isBurgerActive = false">
                    Report an issue
                </router-link>
            </div>
        </div>

        <div id="navbarBasicExample" class="navbar-menu">
            <div class="navbar-start">
                <router-link class="navbar-item" to="/">
                    Home
                </router-link>
                <router-link class="navbar-item" to="/myactivity">
                    My Activity
                </router-link>
                <router-link class="navbar-item" to="/users">
                    Users
                </router-link>
                <div class="navbar-item has-dropdown is-hoverable">
                    <a class="navbar-link">
                        More
                    </a>
                    <div class="navbar-dropdown">
                        <router-link class="navbar-item" to="/documentation">
                            Documentation
                        </router-link>
                        <router-link class="navbar-item" to="/products">
                            Products
                        </router-link>
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
                        <button class="button is-light has-text-weight-bold" @click="isModalActive = true">
                            Log in
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </nav>
    <login-modal :class="isModalActive && 'is-active'" @hideModal="(mod: boolean) => isModalActive = mod"/>
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
    .navbar-item.has-dropdown:hover .navbar-link, .navbar-item.has-dropdown.is-active .navbar-link{
        background: #232323;
        color: white;
    }
    .navbar-item, .navbar-item.has-dropdown .navbar-item{
        background: #181818;
        color: white;
    }
    .navbar .navbar-item:has(.buttons):hover {
        background: #181818;
    }
    .navbar .navbar-item:hover {
        background: #232323;
        color: white;
    }
    .navbar .navbar-dropdown .navbar-item:hover {
        background: #232323;
        color: white;
    }
    .navbar-dropdown {
        background: #181818;
    }
    a.navbar-link{
        color: white;
    }
    a:hover {
        background: #232323;
        color: white;
    }
    a.navbar-item:focus {
        background: #181818;
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