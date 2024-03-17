<script setup lang="ts">
const emits = defineEmits<{
    (event: 'showModal', value: void): void;
}>();

const {logout} = updateLoggedInUser();

import {LoggedIn, updateLoggedInUser} from "@/model/users";
</script>

<template>
    <div class="navbar-item" v-if="!LoggedIn.user">
        <div class="buttons">
            <router-link class="button is-primary" to="/signup">
                Sign up
            </router-link>
            <button class="button is-light has-text-weight-bold" @click="emits('showModal')">
                Log in
            </button>
        </div>
    </div>
    <div class="navbar-item" v-else>
        <div class="buttons">
            <router-link class="button is-primary" to="/myactivity">
                My Activity
            </router-link>
            <button class="button is-light has-text-weight-bold" @click="[logout()]">
                Log out
            </button>
        </div>
    </div>
</template>

<style scoped>

</style>