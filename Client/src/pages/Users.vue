<script setup lang="ts">

import {getUsers, type User, deleteUser} from "@/model/users";
import {definePage} from "unplugin-vue-router/runtime";
import {useRouter} from "vue-router";

definePage({
    meta: {
        requiresAuth: true,
        requiresAdmin: true,
    }
});

const Users = await getUsers();

function striper(user: User): string {
    return Users.indexOf(user) % 2 === 0 ? 'ics' : 'dcs';
}



function deleteHandler(user: User): void {
    deleteUser(user).then(() => {
        useRouter().push("/users");
    });
}

</script>

<template>
    <div class="columns is-centered">
        <div class="column is-narrow">
            <table class="table bordered dcs">
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
                        <router-link :to="{ name: 'EditUser', params: {id: user._id.toString()}}" class="button is-small is-primary">
                            <!--TODO: Please make it work.-->
                            <i class="fa-solid fa-pen"></i>
                        </router-link>
                        <button class="button is-small is-danger" @click="deleteHandler(user)">
                            <i class="fa-solid fa-trash"></i>
                        </button>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>

</template>

<style scoped>
.table {
    padding-top: 1rem;
    border: 1px var(--color-border) solid;
    border-radius: .25rem;
}

td {
    border: none;
}

</style>