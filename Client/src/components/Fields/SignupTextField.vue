<script setup lang="ts">
import {forAndId, type TextField} from "@/model/textField";
import {ref} from "vue";

const contents = defineModel();
const textField = defineProps<TextField>();
const showPassword = ref(false);
function toggleShowPassword(): void {showPassword.value = !showPassword.value;}

</script>

<template>
    <div class="field pr-3" :class="{'has-addons': textField.label.includes('Password')}">
        <label class="dcs" :for="forAndId(textField)">{{ textField.label }}</label>
        <div class="control is-expanded has-icons-left">
            <input class="input ics bordered" v-model="contents" :type="!showPassword ? textField.type : 'text'" :placeholder="textField.placeholder" :id="forAndId(textField)" :autocomplete="textField.autocomplete">
            <span class="icon is-small is-left">
                <i :class="textField.icon"></i>
            </span>
        </div>
        <a class="button ics" type="button" v-if="textField.label.includes('Password')"
           @click.prevent="toggleShowPassword()">
            <i :class="showPassword ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye'"></i>
        </a>
    </div>
</template>

<style scoped>
a.button {
    border: none;
    background: none;
    cursor: pointer;
}
</style>