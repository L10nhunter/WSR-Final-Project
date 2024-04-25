<script setup lang="ts">

import SignupTextField from "@/components/Fields/SignupTextField.vue";
import {ref} from "vue";
import {getTextField} from "@/model/textField";
import {useLogin} from "@/model/session";

const {login} = useLogin();

const input = {
    emailOrUsername: ref(''),
    password: ref(''),
};
const emits = defineEmits<{(event: 'hideModal', value: void): void;}>();

async function loginHandler() {
    await login(input.emailOrUsername.value, input.password.value).then(() => emits('hideModal')).catch(() => {});
}

const props = defineProps({
    isModalActive: Boolean
});
const isModalActive = ref(props.isModalActive);
</script>

<template>
    <div class="modal" :class="isModalActive && 'is-active'">
        <div class="modal-background" @click="emits('hideModal')"></div>
        <div class="modal-card dcs bordered">
            <header class="modal-card-head dcs">
                <p class="modal-card-title has-text-centered dcs">Log In</p>
                <button class="delete" aria-label="close" @click="emits('hideModal')"></button>
            </header>
            <section class="modal-content">
                <form class="px-3 pb-3" autocomplete="on" @submit.prevent>
                    <SignupTextField v-bind="getTextField('EmailLogin')" v-model="input.emailOrUsername.value"/>
                    <SignupTextField v-bind="getTextField('PasswordLogin')" v-model="input.password.value"/>
                    <div class="control">
                        <button class="button is-primary" type="submit" @click.prevent="loginHandler()">Log In</button>
                    </div>
                </form>
            </section>
        </div>
    </div>
</template>

<style scoped>
.modal-card-head {
    box-shadow: none;
}
</style>