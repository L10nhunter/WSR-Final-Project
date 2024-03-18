<script setup lang="ts">
import {forAndId, type TextField} from "@/model/textField";

const contents = defineModel({type: String, default: ''});
const textField = defineProps<TextField>();

</script>

<template>
    <div class="field">
        <label class="dcs" :for="forAndId(textField)">{{ textField.label }}</label>
        <div class="control has-icons-left">
            <input class="input ics bordered" v-model="contents" :type="textField.type" :placeholder="textField.placeholder" :id="forAndId(textField)" :autocomplete="textField.autocomplete">
            <span class="icon is-small is-left">
                <i :class="textField.icon"></i>
            </span>
        </div>
    </div>
</template>

<style scoped>
div.field{
    padding-right: 8px;
}
</style>