<script setup lang="ts">
import "@fortawesome/free-brands-svg-icons";
import {defineProps, defineModel} from "vue";
const textField = defineModel({type: String, default: ''});

const text = defineProps({
    label: String,
    placeholder: String,
    for: String,
});


function leftIcon(): string {
    if (text.label === 'First Name') {
        return 'fas fa-F';
    } else if (text.label === 'Last Name') {
        return 'fas fa-L';
    } else if (text.label === 'Email Address') {
        return 'fas fa-envelope';
    } else if (text.label === 'Username') {
        return 'fas fa-user';
    } else if (text.label === 'Password') {
        return 'fas fa-lock';
    } else if (text.label === 'Password Verification') {
        return 'Client/node_modules/@fortawesome/fontawesome-free/sprites/solid.svg#lock';
    } else {
        return '';
    }
}

</script>

<template>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@5.15.4/css/all.min.css">
    <div class="field">
        <label>{{ text.label }}</label>
        <div class="control has-icons-left">
            <input class="input" v-model="textField" :type="((text.label === 'Password') || (text.label === 'Password Verification')) ? 'password' : ''" :placeholder="text.placeholder">
            <span class="icon is-small is-left">
                <i :class="leftIcon()"></i>
            </span>
        </div>
    </div>
</template>

<style scoped>
@media (prefers-color-scheme: dark) {
    label {
        color: white;
    }
}
@media (prefers-color-scheme: light) {
    label {
        color: black;
    }
}
</style>