<script setup lang="ts">
import {RouterLink} from 'vue-router';
import {onMounted, ref} from 'vue';
import "bulma/css/bulma.css";
import "../assets/base.css";
import LoginModal from "@/components/LoginModal.vue";
import {LoggedInUser} from "@/model/Globals";

const isMobile = ref(false)
const isBurgerActive = ref(false);
const isModalActive = ref(false);

function isAllowedToAccessUserPage() {
    return LoggedInUser.value?.admin ? "/users" : "#" ?? "#";
}


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
    <nav class="navbar is-fixed-top nav-color-scheme" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
            <router-link @click="isBurgerActive = false" class="navbar-item is-hovered-nav" to="/">
                <img class="is-32x32" src="/l10nFitnessIcon.png" alt="logo">
            </router-link>

            <a role="button" :class="isBurgerActive && 'is-active'" @click="toggleBurgerActive()" class="navbar-burger"
               aria-label="menu" aria-expanded="false"
               data-target="navbar-drop-menu">
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
            </a>
        </div>

        <div class="navbar-menu nav-color-scheme" :class="[isBurgerActive && 'is-active', !isMobile && 'is-hidden']">
            <div class="navbar-start">
                <router-link class="navbar-item nav-color-scheme is-hovered-nav" to="/myactivity" @click="isBurgerActive = false">
                    My Activity
                </router-link>
                <router-link class="navbar-item nav-color-scheme is-hovered-nav" to="/friendsactivity" @click="isBurgerActive = false">
                    Friends' Activity
                </router-link>
                <router-link class="navbar-item nav-color-scheme is-hovered-nav" :to="isAllowedToAccessUserPage()" @click="isBurgerActive = false">
                    Users
                </router-link>
                <hr class="navbar-divider">
                <router-link class="navbar-item nav-color-scheme is-hovered-nav" to="/documentation" @click="isBurgerActive = false">
                    Documentation
                </router-link>
                <router-link class="navbar-item nav-color-scheme is-hovered-nav" to="/about" @click="isBurgerActive = false">
                    About
                </router-link>
                <router-link class="navbar-item nav-color-scheme is-hovered-nav" to="/contact" @click="isBurgerActive = false">
                    Contact Us
                </router-link>
                <hr class="navbar-divider">
                <router-link class="navbar-item nav-color-scheme is-hovered-nav" to="/report" @click="isBurgerActive = false">
                    Report an issue
                </router-link>
            </div>
        </div>

        <div id="navbar-drop-menu" class="navbar-menu">
            <div class="navbar-start">
                <router-link class="navbar-item nav-color-scheme is-hovered-nav" to="/myactivity">
                    My Activity
                </router-link>
                <router-link class="navbar-item nav-color-scheme is-hovered-nav" to="/friendsactivity" @click="isBurgerActive = false">
                    Friends' Activity
                </router-link>
                <router-link class="navbar-item nav-color-scheme is-hovered-nav" :to="isAllowedToAccessUserPage()">
                    Users
                </router-link>
                <div class="navbar-item has-dropdown is-hoverable">
                    <a class="navbar-link nav-color-scheme is-hovered-nav">
                        More
                    </a>
                    <div class="navbar-dropdown nav-color-scheme">
                        <router-link class="navbar-item nav-color-scheme is-hovered-nav" to="/documentation">
                            Documentation
                        </router-link>
                        <router-link class="navbar-item nav-color-scheme is-hovered-nav" to="/about">
                            About
                        </router-link>
                        <router-link class="navbar-item nav-color-scheme is-hovered-nav" to="/contact">
                            Contact Us
                        </router-link>
                        <hr class="navbar-divider">
                        <router-link class="navbar-item nav-color-scheme is-hovered-nav" to="/report">
                            Report an issue
                        </router-link>
                    </div>
                </div>
            </div>
            <div class="navbar-end">
                <div class="navbar-item">
                    <div class="buttons">
                        <router-link class="button is-primary" to="/signup">
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
.navbar {
    border-bottom: 1px solid var(--color-background-mute);
}
.nav-color-scheme{
    background: var(--color-background-soft) !important;
    color: var(--color-text) !important;
}
.is-hovered-nav:hover{
    background: var(--color-background-mute) !important;
}
.navbar-divider{
    background: var(--color-border-hover) !important;
}
.navbar-dropdown {
    border-color: var(--color-border-hover) !important;
}
</style>