<script setup lang="ts">
import type {User} from "@/model/users";

const user = defineProps<User>()

</script>

<template>
    <div class="media box">
        <div class="media-left">
            <figure class="image is-64x64">
                <img :src="user.image" alt="Image">
            </figure>
        </div>
        <div class="media-content">
            <p class="title is-4">{{user.username}}</p>
            <p class="subtitle is-6">{{user.email}}</p>

        </div>
    </div>

</template>

<style scoped>

</style>