<script setup lang="ts">
import {defineProps, defineModel} from "vue";
import {type TextField, forAndId} from "@/model/textField";
const textField = defineProps<TextField>();
const contents = defineModel();

</script>

<template>
    <div class="field">
        <label class="label dcs" :for="forAndId(textField)">{{textField.label}}</label>
        <div class="control">
            <input v-model="contents" class="input ics bordered" :type="textField.type" :id="forAndId(textField)">
        </div>
    </div>
</template>