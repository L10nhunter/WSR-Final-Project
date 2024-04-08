<script setup lang="ts">

import {getUsers, type User, deleteUser} from "@/model/users";
import {definePage} from "vue-router/auto";
import {useRouter} from "vue-router";
import {useRouteToEditUser} from "@/model/session";

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

function routeToEditUser(user: User): void {
    console.log("routing to edit user: " + user._id);
    console.log("pushed route to: /editUser/" + user._id);
    useRouteToEditUser(user._id);
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
                            <button class="button is-small is-primary" @click="routeToEditUser(user)"><i
                                class="fa-solid fa-pen"></i></button>
                            <button class="button is-small is-danger" @click="deleteHandler(user)"><i
                                class="fa-solid fa-trash"></i></button>
                        </td>
                    </tr>
                    </tbody>
                </table>
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