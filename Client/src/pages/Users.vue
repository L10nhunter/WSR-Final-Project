<script setup lang="ts">

import {ref} from "vue";
import {type User, getUsers} from "@/model/users";

const users = ref([] as User[]);

users.value = getUsers();

</script>

<template>
    <div class="columns is-centered">
        <div class="column is-narrow">
            <div class="dcs">
                <table class="table is-striped dcs">
                    <thead>
                    <tr>
                        <th class="dcs">First Name</th>
                        <th class="dcs">Last Name</th>
                        <th class="dcs">Email</th>
                        <th class="dcs">Username</th>
                        <th class="dcs">Phone Number</th>
                        <th class="dcs">Admin</th>
                    </tr>
                    </thead>
                    <tbody v-for="user in users">
                    <tr>
                        <td>{{ user.firstName }}</td>
                        <td>{{ user.lastName }}</td>
                        <td>{{ user.email }}</td>
                        <td>{{ user.username }}</td>
                        <td>{{ user.phone }}</td>
                        <td>{{ user.admin }}</td>
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

</style>