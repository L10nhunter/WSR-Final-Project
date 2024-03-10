<script setup lang="ts">

import {ref} from "vue";
import {type User, getUsers} from "@/model/users";

const users = ref([] as User[]);

users.value = getUsers();

</script>

<template>
<div class="table">
    <table class="table is-striped">
        <thead>
            <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Username</th>
                <th>Phone Number</th>
                <th>Admin</th>
            </tr>
        </thead>
        <tbody v-for="user in users">
            <tr>
                <td>{{user.firstName}}</td>
                <td>{{user.lastName}}</td>
                <td>{{user.email}}</td>
                <td>{{user.username}}</td>
                <td>{{user.phone}}</td>
                <td>{{user.admin}}</td>
            </tr>
        </tbody>
    </table>
</div>
</template>

<style scoped>
@media(prefers-color-scheme:dark) {
    .table {
        background-color: #232323;
        color: white;
    }
    .table thead {
        background-color: #232323;
        color: white;
    }
    .table th {
        background-color: #232323;
        color: white;
    }
}

</style>