<script setup lang="ts">
import {forAndId, type TextField} from "@/model/textField";
import {ref} from "vue";

const contents = defineModel();
const textField = defineProps<TextField>();
const showPassword = ref(false);
function toggleShowPassword(): void {showPassword.value = !showPassword.value;}

</script>

<template>
    <label class="dcs" :for="forAndId(textField)">{{ textField.label }}</label>
    <div class="field pr-3" :class="{'has-addons': textField.label.includes('Password')}">
        <div class="control is-expanded has-icons-left">
            <input class="input ics bordered" v-model="contents" :type="!showPassword ? textField.type : 'text'" :placeholder="textField.placeholder" :id="forAndId(textField)" :autocomplete="textField.autocomplete">
            <span class="icon is-small is-left">
                <i :class="textField.icon"></i>
            </span>
        </div>
        <button class="button ics bordered" type="button" v-if="textField.label.includes('Password')"
           @click.prevent="toggleShowPassword()">
            <span class="icon is-small is-right">
                <i :class="showPassword ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye'"></i>
            </span>
        </button>
    </div>
</template>

<style scoped>
button {
    border: none;
    background: none;
    cursor: pointer;
}
</style>