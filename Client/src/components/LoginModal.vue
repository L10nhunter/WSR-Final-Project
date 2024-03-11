<script setup lang="ts">

import SignupTextField from "@/components/Fields/SignupTextField.vue";
import {nextTick, ref} from "vue";
import {users} from "@/model/Globals";
import {getTextFieldsFromLabels} from "@/model/TextField";
import router from "@/router";

const input = {
    email: ref(''),
    password: ref(''),
};

const textFields = getTextFieldsFromLabels(["EmailLogin", "PasswordLogin"]);
const inputFields = [input.email, input.password];
const indices = [0, 1];

const props = defineProps({
    isModalActive: Boolean
});
const isModalActive = ref(props.isModalActive);

function login() {
    // this doesn't work because the page gets instantly reloaded. I need to pass the result of this function to the reloaded page
    const userId = users.value.find(user => (user.email === input.email.value) && (user.password === input.password.value))?.id ?? 0;

    nextTick(() => {
        if (router.currentRoute.value.name) {
            console.log("route name in login modal:");
            console.log(router.currentRoute.value.name);
            console.log("userId in login modal: " + userId);
            router.push({name: router.currentRoute.value.name, state: {userId}});
            //router.go(0);
        } else {
            console.error('Route name is null or undefined');
        }
    });
}

</script>

<template>
    <div class="modal" :class="isModalActive && 'is-active'">
        <div class="modal-background" @click="$emit('hideModal', false)"></div>
        <div class="modal-card dcs bordered">
            <header class="modal-card-head dcs">
                <p class="modal-card-title dcs">Log In</p>
                <button class="delete" aria-label="close" @click="$emit('hideModal', false)"></button>
            </header>
            <section class="modal-content">
                <form @submit.prevent="login()" autocomplete="on">
                    <SignupTextField v-for="index in indices" :key="index" v-bind="textFields[index]" v-model="inputFields[index].value"/>
                    <div class="control">
                        <button class="button is-primary" @click="$emit('hideModal', false)">Log In</button>
                    </div>
                </form>
            </section>
        </div>
    </div>
</template>

<style scoped>
form {
    padding-left: .25rem;
}
</style>