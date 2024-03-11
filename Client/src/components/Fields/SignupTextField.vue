<script setup lang="ts">
import {defineProps, defineModel} from "vue";
import {forAndId, type TextField} from "@/model/textField";

const contents = defineModel({type: String, default: ''});
const textField = defineProps<TextField>();

function leftIcon(): string {
    if (textField.label === 'First Name') {
        return 'fa-solid fa-f';
    } else if (textField.label === 'Last Name') {
        return 'fa-solid fa-l';
    } else if (textField.label === 'Email Address') {
        return 'fa-solid fa-envelope';
    } else if (textField.label === 'Username') {
        return 'fa-solid fa-user';
    } else if (textField.label === 'Password') {
        return 'fa-solid fa-lock';
    } else if (textField.label === 'Password Verification') {
        return 'fa-solid fa-lock';
    } else {
        return '';
    }
}

</script>

<template>
    <div class="field">
        <label class="dcs" :for="forAndId(textField)">{{ textField.label }}</label>
        <div class="control has-icons-left">
            <input class="input ics bordered" v-model="contents" :type="textField.type" :placeholder="textField.placeholder" :id="forAndId(textField)" :autocomplete="textField.autocomplete">
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