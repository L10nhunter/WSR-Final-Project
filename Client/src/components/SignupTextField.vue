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
    <div class="field">
        <label class="dcs" :for="text.label">{{ text.label }}</label>
        <div class="control has-icons-left">
            <input class="input main-color" v-model="textField" :type="((text.label === 'Password') || (text.label === 'Password Verification')) ? 'password' : ''" :placeholder="text.placeholder" :id="text.label">
            <span class="icon is-small is-left">
                <i :class="leftIcon()"></i>
            </span>
        </div>
    </div>
</template>

<style scoped>
div.field{
    padding-right: 8px;
}
</style>