<script setup lang="ts">

import SignupTextField from "@/components/SignupTextField.vue";
import {ref} from "vue";
import {updateLoggedInUser} from "@/model/Globals";
import {users} from "@/model/Globals";

const input = {
    email: ref(''),
    password: ref(''),
};

const props = defineProps({
    isModalActive: Boolean
});
const isModalActive = ref(props.isModalActive);

function login() {
    updateLoggedInUser((users.value.find(user => (user.email === input.email.value) && (user.password === input.password.value))?.id) ?? 0);}

</script>

<template>
    <div class="modal" :class="isModalActive && 'is-active'">
        <div class="modal-background"></div>
        <div class="modal-card dcs bordered">
            <header class="modal-card-head dcs">
                <p class="modal-card-title dcs">Log In</p>
                <button class="delete" aria-label="close" @click="$emit('hideModal', false)"></button>
            </header>
            <section class="modal-content">
                <form autocomplete="on">
                    <SignupTextField v-model=input.email.value label="Email Address" placeholder="Email Address"/>
                    <SignupTextField v-model=input.password.value label="Password" placeholder="Password"/>
                    <div class="control">
                        <button class="button is-primary has-text-black has-text-weight-bold" @click="[isModalActive = false, login()]">Log In</button>
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