<script setup lang="ts">
import {RouterLink} from 'vue-router';
import {computed, ref} from 'vue';
import "bulma/css/bulma.css";
import "../assets/base.css";
import LoginModal from "@/components/LoginModal.vue";
import {showLoginModal} from "@/model/users";
import {isMobile} from "@/model/isMobile";
import LoginBadge from "@/components/LoginBadge.vue";
import {getSession, useLogin} from "@/model/session";

const isMyMobile = computed<boolean>(() => isMobile.value < 1024);

const {logout} = useLogin();

const isBurgerActive = ref(false);

let mobileNav = [
    {name: "My Activity", path: "/myactivity"},
    {name: "Statistics", path: "/statistics"},
    {name: "Friends' Activity", path: "/friendsactivity"},
    {name: "Search", path: "/search"},
    {name: "Users", path: "/users"},
    {name: "Documentation", path: "/documentation"},
    {name: "About", path: "/about"},
    {name: "Contact Us", path: "/contact"},
    {name: "Report an issue", path: "/report"}
];
const desktopNav = mobileNav.slice(3, 5);
const desktopNavDropdown = mobileNav.slice(5);

mobileNav = getSession().user ? mobileNav : mobileNav.slice(3);

</script>

<template>

    <nav class="navbar is-fixed-top ics" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
            <router-link @click="isBurgerActive = false" class="navbar-item is-hovered-mute" to="/">
                <img class="is-32x32" src="/l10nFitnessIcon.png" alt="logo">
            </router-link>
            <a role="button" :class="{'is-active': isBurgerActive}" @click="isBurgerActive = !isBurgerActive"
               class="navbar-burger"
               aria-label="menu" aria-expanded="false"
               data-target="navbar-drop-menu">
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
            </a>
        </div>
        <!--TODO: maybe make loading bar the background of the navbar. I bet that would look super cool-->
        <progress class="progress is-mine" max="100" v-if="getSession().loading>0"/>
        <div class="navbar-menu navbar-dropdown ics" :class="{'is-active': isBurgerActive, 'is-hidden': !isMyMobile}">
            <div class="navbar-start">
                <router-link v-for="route in mobileNav" class="navbar-item ics is-hovered-mute"
                             :class="{'is-hidden': route.name==='Users' && (!getSession().user?.admin)}"
                             :to="route.path"
                             @click="isBurgerActive = false">
                    {{ route.name }}
                </router-link>
                <div :class="{'is-hidden': getSession().user}">
                    <router-link class="navbar-item ics is-hovered-mute" to="/signup" @click="isBurgerActive = false">
                        Sign up
                    </router-link>
                    <a class="navbar-item ics is-hovered-mute" @click="[showLoginModal = true, isBurgerActive = false]">
                        Log in
                    </a>
                </div>
                <a class="navbar-item ics is-hovered-mute" :class="{'is-hidden': !getSession().user}"
                   @click="[logout(), isBurgerActive = false]">
                    Log Out
                </a>
            </div>
        </div>

        <div id="navbar-drop-menu" class="navbar-menu">
            <div class="navbar-start">
                <router-link v-for="route in desktopNav" class="navbar-item ics is-hovered-mute"
                             :class="{'is-hidden': route.name==='Users' && (!getSession().user?.admin)}"
                             :to="route.path">
                    {{ route.name }}
                </router-link>
                <div class="navbar-item has-dropdown is-hoverable is-hovered-mute">
                    <a class="navbar-link ics is-hovered-mute">
                        More
                    </a>
                    <div class="navbar-dropdown ics">
                        <div v-for="route in desktopNavDropdown">
                            <hr v-if="route.name === 'Report an issue'" class="navbar-divider">
                            <router-link class="navbar-item ics is-hovered-mute" :to="route.path">
                                {{ route.name }}
                            </router-link>
                        </div>
                    </div>
                </div>
            </div>
            <div class="navbar-end">
                <LoginBadge @showModal="() => showLoginModal = true"/>
            </div>
        </div>
    </nav>
    <login-modal :class="{'is-active': showLoginModal}" @hideModal="() => showLoginModal = false"/>
</template>

<style scoped>
.navbar {
    border-bottom: 1px solid var(--color-background-mute);
}
.progress {
    margin: 0;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    border-radius: 0;
}
.progress.is-mine{
    height: .5rem;
    animation-duration: var(--bulma-progress-indeterminate-duration);
    animation-iteration-count: infinite;
    animation-name: moveIndeterminate;
    animation-timing-function: linear;
    background-color: var(--color-background-soft);
    background-image: linear-gradient(to right, var(--color-primary) 50%, var(--color-background-soft) 50%);
    background-position: top left;
    background-repeat: no-repeat;
    background-size: 150% 150%;
}
</style>