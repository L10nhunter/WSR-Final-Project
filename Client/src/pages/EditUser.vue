<script setup lang="ts">

import {getUser, updateUser, type User} from "@/model/users";
import router from "@/router";
import {definePage} from "vue-router/auto";
import {useRoute} from "vue-router";
import {ObjectId} from "mongodb";
import {getTextField} from "@/model/textField";
import {ref} from "vue";
import EditUserTextField from "@/components/Fields/EditUserTextField.vue";

definePage({
    path: "/editUser/:id",
    meta: {
        requiresAuth: true,
        requiresAdmin: true,
    }
});
console.log("editUser page please?");

const route = useRoute();
console.log("route: " + route);
for (const key in route) {
    console.log(key + ": " + route.params[key]);
}
const userId = route.params.id as string;
const user = ref<User>(await getUser(new ObjectId(userId)));
console.log(user);


const textFields = [
    {field: getTextField("First Name"), model: user.value?.firstName ?? ""},
    {field: getTextField("Last Name"), model: user.value?.lastName ?? ""},
    {field: getTextField("EmailReg"), model: user.value?.email ?? ""},
    {field: getTextField("Phone"), model: user.value?.phone ?? ""},
    {field: getTextField("Username"), model: user.value?.username ?? ""},
    {field: getTextField("PasswordLogin"), model: user.value?.password ?? ""},
];


function editUserHandler(user: User): void {
    updateUser(user).then(() => router.push("/users"));
}
//TODO: make everything less broken.
</script>

<template>
    <div class="card dcs bordered">
        <header class="card-head dcs">
            <p class="card-title dcs">Edit User</p>
            <button class="delete" aria-label="close"></button>
        </header>
        <section class="content dcs">
            <div class="form">
                <EditUserTextField v-for="text in textFields" v-bind="text.field" :v-model="text.model"/>
                <div class="field control">
                    <label>Admin: </label>
                    <label class="radio">
                        <input type="radio" value="Yes" :checked="user?.admin ?? false">
                        Yes
                    </label>
                    <label class="radio">
                        <input type="radio" value="No" :checked="!user?.admin ?? true">
                        No
                    </label>
                </div>
            </div>
        </section>
        <footer class="card-foot dcs">
            <button class="button is-primary" @submit.prevent @click="editUserHandler(user)">Edit User</button>
            <button class="button has-text-weight-bold">Cancel</button>
        </footer>
    </div>
</template>


<style scoped>

</style>