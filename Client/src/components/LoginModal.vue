<script setup lang="ts">

import SignupTextField from "@/components/Fields/SignupTextField.vue";
import {ref} from "vue";
import {updateLoggedInUser} from "@/model/Globals";
import {users} from "@/model/Globals";
import {getTextFieldsFromLabels} from "@/model/TextField";



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
    // this doesnt work because the page gets instantly reloaded. i need to pass the result of this function to the reloaded page
    updateLoggedInUser((users.value.find(user => (user.email === input.email.value) && (user.password === input.password.value))?.id) ?? 0);}

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
                <form autocomplete="on">
                    <SignupTextField v-for="index in indices" :key="index" v-bind="textFields[index]" v-model="inputFields[index].value"/>
                    <div class="control">
                        <button class="button is-primary" @click="[isModalActive = false, login()]">Log In</button>
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