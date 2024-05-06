<script setup lang="ts">
import {updateUser, type User} from "@/model/users";
import {ref} from "vue";
import {getSession} from "@/model/session";
import {definePage} from "unplugin-vue-router/runtime";
import EditUserTextField from "@/components/Fields/EditUserTextField.vue";
import {getTextField} from "@/model/textField";
import {printDebug} from "@/model/rest";

definePage({meta: {requiresAuth: true,}});
const user = ref<User>(getSession().user!);
printDebug(user);

const textFields = [
    {field: getTextField("First Name"), model: user.value.firstName},
    {field: getTextField("Last Name"), model: user.value.lastName},
    {field: getTextField("EmailReg"), model: user.value.email},
    {field: getTextField("Phone"), model: user.value.phone},
    {field: getTextField("Username"), model: user.value.username},
    {field: getTextField("PasswordLogin"), model: user.value.password},
];
//TODO: fix how broken everything is.
</script>

<template>
    <div class="box dcs bordered">
        <div class="form">
            <EditUserTextField v-for="text in textFields" v-bind="text.field" :v-model="text.model"/>
        </div>
        <button class="button is-primary" @submit.prevent @click="updateUser(user)">Edit User</button>
        <button class="button has-text-weight-bold">Cancel</button>
    </div>
</template>

<style scoped>

</style>