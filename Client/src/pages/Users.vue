<script setup lang="ts">

import {Users, type User} from "@/model/users";

/*const showEditUserModal = ref(false);
const editedUser = ref<User>(Users.value[0]);

function editUser(user: User): void {
    if (user) Users.value[Users.value.indexOf(user)] = editedUser.value;
    showEditUserModal.value = false;

}
function deleteUser(user: User): void {
    Users.value.splice(Users.value.indexOf(user), 1);
}*/

function striper(user: User): string {
    return Users.value.indexOf(user) % 2 === 0 ? 'ics' : 'dcs';
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
                        <td>{{user.firstName}}</td>
                        <td>{{user.lastName}}</td>
                        <td>{{user.email}}</td>
                        <td>{{user.username}}</td>
                        <td>{{user.phone}}</td>
                        <td>{{user.admin}}</td>
                        <td>
                            <button class="button is-small is-primary"><i class="fa-solid fa-pen"></i></button>
                            <button class="button is-small is-danger"><i class="fa-solid fa-trash"></i></button>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    <editUserModal v-bind="editedUser" @hideModal="showEditUserModal=false" @editUser="editUser(editedUser)" :class="{'is-active': showEditUserModal}"/>

</template>

<style scoped>
.table {
    padding-top: 1rem;
    border: 1px var(--color-border) solid;
    border-radius: .25rem;
}

</style>