<script setup lang="ts">
import {forAndId, type TextField} from "@/model/textField";
import {ref} from "vue";

const contents = defineModel();
const textField = defineProps<TextField>();
const showPassword = ref(false);
function toggleShowPassword(): void {showPassword.value = !showPassword.value;}
//TODO: make this work for what it's supposed to do in profile and edit pages
</script>

<template>
    <label class="dcs is-size-5" :for="forAndId(textField)">{{ textField.label }}</label>
    <div class="field pt-3" :class="{'has-addons': textField.label.includes('Password')}">
        <div class="control is-expanded has-icons-left">
            <input class="input ics bordered" v-model="contents" :type="!showPassword ? textField.type : 'text'" :placeholder="textField.placeholder" :id="forAndId(textField)" :autocomplete="textField.autocomplete">
            <span class="icon is-small is-left">
                <i :class="textField.icon"></i>
            </span>
        </div>
        <button class="button ics bordered" type="button" tabindex="-1" v-if="textField.label.includes('Password')"
                @click.prevent="toggleShowPassword()">
            <span class="icon is-small is-right">
                <i class="fa-solid" :class="showPassword ? 'fa-eye-slash' : 'fa-eye'"></i>
            </span>
        </button>
    </div>
</template>

<style scoped>
button {
    height: var(--bulma-control-height);
    border: none;
    background: none;
    cursor: pointer;
}
</style>