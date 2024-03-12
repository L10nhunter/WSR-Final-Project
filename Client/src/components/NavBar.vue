<script setup lang="ts">
import {RouterLink} from 'vue-router';
import {computed, onMounted, ref} from 'vue';
import "bulma/css/bulma.css";
import "../assets/base.css";
import LoginModal from "@/components/LoginModal.vue";
import {LoggedInUser, updateLoggedInUser} from "@/model/Globals";
import {getUserByFullName} from "@/model/users";

const isMobile = ref(false)
const isBurgerActive = ref(false);
const isModalActive = ref(false);

const isAllowedToAccessUserPage = computed( () => LoggedInUser.value ? LoggedInUser.value.admin ? "/users" : "#" : "#");

const mobileNav = [
    {name: "My Activity", path: "/myactivity"},
    {name: "Statistics", path: "/statistics"},
    {name: "Friends' Activity", path: "/friendsactivity"},
    {name: "Users", path: isAllowedToAccessUserPage},
    {name: "Documentation", path: "/documentation"},
    {name: "About", path: "/about"},
    {name: "Contact Us", path: "/contact"},
    {name: "Report an issue", path: "/report"},
    {name: "Sign up", path: "/signup"}
];
const desktopNav = [ mobileNav[0], mobileNav[1], mobileNav[2], mobileNav[3] ];
const desktopNavDropdown = [ mobileNav[4], mobileNav[5], mobileNav[6], mobileNav[7] ];

const user = ref("Not logged in");

window.addEventListener('resize', () => {
    if (window.innerWidth > 1024) {
        isBurgerActive.value = false;
    }
    isMobile.value = window.innerWidth < 1024;
});

onMounted(() => {isMobile.value = window.innerWidth < 1024;});

</script>

<template>
    <nav class="navbar is-fixed-top ncs" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
            <router-link @click="isBurgerActive = false" class="navbar-item is-hovered-mute" to="/">
                <img class="is-32x32" src="/l10nFitnessIcon.png" alt="logo">
            </router-link>

            <a role="button" :class="{'is-active': isBurgerActive}" @click="isBurgerActive = !isBurgerActive" class="navbar-burger"
               aria-label="menu" aria-expanded="false"
               data-target="navbar-drop-menu">
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
            </a>
        </div>

        <div class="navbar-menu navbar-dropdown ncs" :class="{'is-active': isBurgerActive, 'is-hidden': !isMobile}">
            <div class="navbar-start">
                <router-link v-for="route in mobileNav" class="navbar-item ncs is-hovered-mute" :to="route.path" @click="isBurgerActive = false">
                    {{route.name}}
                </router-link>
                <a class="navbar-item ncs is-hovered-mute" @click="[isModalActive = true, isBurgerActive = false]">
                    Log in
                </a>
            </div>
        </div>

        <div id="navbar-drop-menu" class="navbar-menu">
            <div class="navbar-start">
                <router-link v-for="route in desktopNav" class="navbar-item ncs is-hovered-mute" :to="route.path" >
                    {{ route.name }}
                </router-link>
                <div class="navbar-item has-dropdown is-hoverable is-hovered-mute">
                    <a class="navbar-link ncs is-hovered-mute">
                        More
                    </a>
                    <div class="navbar-dropdown ncs">
                        <div v-for="route in desktopNavDropdown">
                        <hr v-if="route.name === 'Report an issue'" class="navbar-divider">
                        <router-link class="navbar-item ncs is-hovered-mute" :to="route.path">
                            {{ route.name }}
                        </router-link>
                        </div>
                    </div>
                </div>
            </div>
            <div class="navbar-end">
                <select class="navbar-item ncs" v-model="user" @change="updateLoggedInUser(getUserByFullName(user)?.id)">
                    <option selected class="is-hovered-mute">Not logged in</option>
                    <option class="is-hovered-mute">Terry Medhurst</option>
                    <option class="is-hovered-mute">Ari Yeger</option>
                </select>
                <div class="navbar-item" :class="{'is-hidden': !LoggedInUser}">
                    <button class="button is-light has-text-weight-bold" @click="[updateLoggedInUser(0), user='Not logged in']">
                        Log Out
                    </button>
                </div>
                <div class="navbar-item" :class="{'is-hidden': LoggedInUser}">
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
    <login-modal :class="{'is-active': isModalActive}" @hideModal="() => isModalActive = false"/>
</template>

<style scoped>
.navbar {
    border-bottom: 1px solid var(--color-background-mute);
}
.ncs{
    background: var(--color-background-soft) !important;
    color: var(--color-text) !important;
}
.is-hovered-mute:hover {
    background: var(--color-background-mute) !important;
}
.navbar-divider{
    background: var(--color-border-hover) !important;
}
.navbar-dropdown {
    border-color: var(--color-border-hover) !important;
}
select.navbar-item{
    border-color: var(--color-background-soft) !important;
}
option.is-hovered-mute:hover {
    background: var(--color-background-mute) !important;
}
</style>