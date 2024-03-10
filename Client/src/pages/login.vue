<script setup lang="ts">
import SignupTextField from "@/components/Fields/SignupTextField.vue";
import "../assets/main.css";

import {ref} from "vue";

const user = {
    email: ref(''),
    password: ref(''),
};
</script>

<template>
    <h1 class="title">Log In</h1>
    <form autocomplete="on">
        <SignupTextField v-model=user.email.value label="Email Address" placeholder="Email Address"/>
        <SignupTextField v-model=user.password.value label="Password" placeholder="Password"/>
        <div class="control">
            <button class="button is-primary has-text-black has-text-weight-bold">Log In</button>
        </div>
    </form>
</template>

<style scoped>

</style>