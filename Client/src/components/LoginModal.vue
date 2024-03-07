<script setup lang="ts">

import SignupTextField from "@/components/SignupTextField.vue";
import {ref} from "vue";

const user = {
    email: ref(''),
    password: ref(''),
};

const props = defineProps({
    isModalActive: Boolean
});
const isModalActive = ref(props.isModalActive);

</script>

<template>
    <div class="modal" :class="isModalActive && 'is-active'">
        <div class="modal-background"></div>
        <div class="modal-card has-background-black">
            <header class="modal-card-head has-background-black">
                <p class="modal-card-title has-text-white">Log In</p>
                <button class="delete" aria-label="close" @click="$emit('hideModal', false)"></button>
            </header>
            <section class="modal-content">
                <form autocomplete="on">
                    <SignupTextField v-model=user.email.value label="Email Address" placeholder="Email Address"/>
                    <SignupTextField v-model=user.password.value label="Password" placeholder="Password"/>
                    <div class="control">
                        <button class="button is-primary has-text-black has-text-weight-bold" @click="isModalActive = false">Log In</button>
                    </div>
                </form>
            </section>
        </div>
    </div>
</template>

<style scoped>

</style>