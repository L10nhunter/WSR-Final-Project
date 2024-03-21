<script setup lang="ts">
import {getSession, useLogin} from "@/model/session";

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