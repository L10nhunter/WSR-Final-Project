<script setup lang="ts">
import {getSession, getUserFullName, useLogin} from "@/model/session";

const {logout} = useLogin();

const emits = defineEmits<{
    (event: 'showModal', value: void): void;
}>();

</script>

<template>
    <div class="navbar-item" v-if="!getSession().user">
        <div class="buttons">
            <router-link class="button is-primary" to="/signup">
                Sign up
            </router-link>
            <button class="button is-light has-text-weight-bold" @click="emits('showModal')">
                Log in
            </button>
        </div>
    </div>
    <div class="navbar-item has-dropdown is-hoverable is-hovered-mute" v-else>
        <a class="navbar-link ics is-hovered-mute is-arrowless" aria-haspopup="true" aria-controls="dropdown-menu">
            <img :src="getSession().user?.image" class="is-32x32 pr-3" alt="profile">
            {{ getUserFullName() }}
        </a>
        <div class="navbar-dropdown ics is-right" role="menu">
            <router-link class="dropdown-item ics is-hovered-mute" to="/myactivity">
                My Activity
            </router-link>
            <router-link class="dropdown-item ics is-hovered-mute" to="/statistics">
                Statistics
            </router-link>
            <router-link class="dropdown-item ics is-hovered-mute" to="/friendsactivity">
                Friends' Activity
            </router-link>
            <router-link class="dropdown-item ics is-hovered-mute" to="/profile">
                My Profile
            </router-link>
            <a class="dropdown-item ics is-hovered-mute" @click="[logout()]">
                Log out
            </a>
        </div>

    </div>
</template>

<style scoped>

</style>