<script setup lang="ts">

import {getUsers, type User} from "@/model/users";
import {ref} from "vue";
import {getTextField} from "@/model/textField";
import SignupTextField from "@/components/Fields/SignupTextField.vue";
import {definePage} from "vue-router/auto";

definePage({
    meta: {
        requiresAuth: true
    }
});

const Users = await getUsers();

const showEditUserModal = ref(-1);

const editedUser = ref<User | null>(Users[showEditUserModal.value >= 0 ? showEditUserModal.value : 0]);

const textFields = [
    {field: getTextField("First Name"), model: editedUser.value?.firstName ?? ""},
    {field: getTextField("Last Name"), model: editedUser.value?.lastName ?? ""},
    {field: getTextField("EmailReg"), model: editedUser.value?.email ?? ""},
    {field: getTextField("Phone"), model: editedUser.value?.phone ?? ""},
    {field: getTextField("Username"), model: editedUser.value?.username ?? ""},
    {field: getTextField("PasswordLogin"), model: editedUser.value?.password ?? ""},
];

function editUser(user: User | null): void {
    if(user && showEditUserModal.value > 0) Users[showEditUserModal.value] = user;
    showEditUserModal.value = -1;
}
function deleteUser(user: User): void {
    Users.splice(Users.indexOf(user), 1);
    console.log(Users);
}

function striper(user: User): string {
    return Users.indexOf(user) % 2 === 0 ? 'ics' : 'dcs';
}

function showModal(user: User | null): void {
    console.log("showing modal with user: " + user?.firstName + " " + user?.lastName + " " + user?.id)
    if(user) {
        showEditUserModal.value = Users.indexOf(user);
        console.log("show var updated to: " + showEditUserModal.value);
        editedUser.value = Users[showEditUserModal.value];
        console.log("edited user: " + editedUser.value?.firstName + " " + editedUser.value?.lastName + " " + editedUser.value?.id);

    }
}
function hideModal(): void {
    showEditUserModal.value = -1;
}

</script>

<template>
    <div class="columns is-centered">
        <div class="column is-narrow">
            <div class="dcs">
                <table class="table bordered">
                    <thead>
                    <tr>
                        <th class="dcs">First Name</th>
                        <th class="dcs">Last Name</th>
                        <th class="dcs">Email</th>
                        <th class="dcs">Username</th>
                        <th class="dcs">Phone Number</th>
                        <th class="dcs">Admin</th>
                        <th class="dcs has-text-centered">Actions</th>
                    </tr>
                    </thead>
                    <tbody v-for="user in Users" :class="striper(user)">
                    <tr>
                        <td>{{ user.firstName }}</td>
                        <td>{{ user.lastName }}</td>
                        <td>{{ user.email }}</td>
                        <td>{{ user.username }}</td>
                        <td>{{ user.phone }}</td>
                        <td>{{ user.admin }}</td>
                        <td>
                            <button class="button is-small is-primary" @click="showModal(user)"><i
                                class="fa-solid fa-pen"></i></button>
                            <button class="button is-small is-danger" @click="deleteUser(user)"><i
                                class="fa-solid fa-trash"></i></button>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="modal" :class="{'is-active': showEditUserModal >= 0}">
            <div class="modal-background" @click="hideModal"></div>
            <div class="modal-card dcs bordered">
                <header class="modal-card-head dcs">
                    <p class="modal-card-title dcs">Edit User</p>
                    <button class="delete" @click="hideModal" aria-label="close"></button>
                </header>
                <section class="modal-content dcs">
                    <div class="form">
                        <SignupTextField v-for="text in textFields" v-bind="text.field" :v-model="text.model"/>
                        <div class="field control">
                            <label>Admin: </label>
                            <label class="radio">
                                <input type="radio" value="Yes" :checked="editedUser?.admin ?? false">
                                Yes
                            </label>
                            <label class="radio">
                                <input type="radio" value="No" :checked="!editedUser?.admin ?? true">
                                No
                            </label>
                        </div>
                    </div>
                </section>
                <footer class="modal-card-foot dcs">
                    <button class="button is-primary" @submit.prevent @click="editUser(editedUser)">Edit User</button>
                    <button class="button has-text-weight-bold" @click="hideModal">Cancel</button>
                </footer>
            </div>
        </div>
    </div>

</template>

<style scoped>
.table {
    padding-top: 1rem;
    border: 1px var(--color-border) solid;
    border-radius: .25rem;
}
td{
    border: none;
}

</style>