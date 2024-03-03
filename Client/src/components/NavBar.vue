<script setup lang="ts">
import {RouterLink} from 'vue-router';
import {ref} from 'vue';

const isBurgerActive = ref(false);

function toggleBurgerActive() {
    isBurgerActive.value = !isBurgerActive.value;
}

</script>

<template>
    <nav class="navbar" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
            <router-link @click="isBurgerActive = false" class="navbar-item" to="/">
                <img src="../assets/logo.svg" width="28" height="28" alt="bulma logo">
            </router-link>

            <a role="button" :class="isBurgerActive && 'is-active'" @click="toggleBurgerActive()" class="navbar-burger" aria-label="menu" aria-expanded="false"
               data-target="navbarBasicExample">
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
            </a>
        </div>

        <div id="navbarBasicExample" class="navbar-menu">
            <div class="navbar-start">
                <router-link class="navbar-item" to="/">
                    Home
                </router-link>

                <a class="navbar-item">
                    Documentation
                </a>

                <div class="navbar-item has-dropdown is-hoverable">
                    <a class="navbar-link">
                        More
                    </a>

                    <div class="navbar-dropdown">
                        <router-link class="navbar-item" to="/about">
                            About
                        </router-link>
                        <a class="navbar-item">
                            Jobs
                        </a>
                        <a class="navbar-item">
                            Contact
                        </a>
                        <hr class="navbar-divider">
                        <a class="navbar-item">
                            Report an issue
                        </a>
                    </div>
                </div>
            </div>

            <div class="navbar-end">
                <div class="navbar-item">
                    <div class="buttons">
                        <a class="button is-primary">
                            <strong>Sign up</strong>
                        </a>
                        <a class="button is-light">
                            Log in
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </nav>
</template>

<style scoped>
.router-link-active {
    color: red;
}
</style>