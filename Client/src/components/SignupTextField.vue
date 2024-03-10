<script setup lang="ts">
import {defineProps, defineModel} from "vue";
const textField = defineModel({type: String, default: ''});


const text = defineProps({
    label: String,
    placeholder: String,
    for: String,
});


function leftIcon(): string {
    if (text.label === 'First Name') {
        return 'fa-solid fa-F';
    } else if (text.label === 'Last Name') {
        return 'fa-solid fa-L';
    } else if (text.label === 'Email Address') {
        return 'fa-solid fa-envelope';
    } else if (text.label === 'Username') {
        return 'fa-solid fa-user';
    } else if (text.label === 'Password') {
        return 'fa-solid fa-lock';
    } else if (text.label === 'Password Verification') {
        return 'fa-solid fa-lock';
    } else {
        return '';
    }
}

</script>

<template>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA==" crossorigin="anonymous" referrerpolicy="no-referrer" />
    <div class="field">
        <label class="default-color-scheme">{{ text.label }}</label>
        <div class="control has-icons-left">
            <input class="input has-main-color" v-model="textField" :type="((text.label === 'Password') || (text.label === 'Password Verification')) ? 'password' : ''" :placeholder="text.placeholder">
            <span class="icon is-small is-left">
                <i :class="leftIcon()"></i>
            </span>
        </div>
    </div>
</template>

<style scoped>

</style>