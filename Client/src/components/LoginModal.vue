<script setup lang="ts">

import SignupTextField from "@/components/Fields/SignupTextField.vue";
import {ref} from "vue";
import {getTextField} from "@/model/textField";
import {getUserByLoginCredentials, updateLoggedInUser} from "@/model/users";

const input = {
    emailOrUsername: ref(''),
    password: ref(''),
};
const emits = defineEmits<{
    (event: 'hideModal', value: void): void;
}>();

const textFields = [
    {field: getTextField("EmailLogin"), model: input.emailOrUsername},
    {field: getTextField("PasswordLogin"), model: input.password},
]

const props = defineProps({
    isModalActive: Boolean
});
const isModalActive = ref(props.isModalActive);
const {login} = updateLoggedInUser();


</script>

<template>
    <div class="modal" :class="isModalActive && 'is-active'">
        <div class="modal-background" @click="emits('hideModal')"></div>
        <div class="modal-card dcs bordered">
            <header class="modal-card-head dcs">
                <p class="modal-card-title dcs">Log In</p>
                <button class="delete" aria-label="close" @click="emits('hideModal')"></button>
            </header>
            <section class="modal-content">
                <form autocomplete="on" @submit.prevent>
                    <SignupTextField v-for="text in textFields" v-bind="text.field" v-model="text.model.value"/>
                    <div class="control">
                        <button class="button is-primary" @click="[emits('hideModal'), login(getUserByLoginCredentials(input.emailOrUsername.value, input.password.value))]">Log In</button>
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