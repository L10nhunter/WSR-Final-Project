<script setup lang="ts">
import type {User} from "@/model/users";
import {getSession} from "@/model/session";
import FriendButton from "@/components/FriendButton.vue";
import {ref, watch} from "vue";
import {printDebug} from "@/model/rest";

const user = defineProps<User>();

const isSessionUser = ref<boolean>(getSession().user?._id === user._id);

watch(() => getSession().user, () => {
    isSessionUser.value = getSession().user?._id === user._id;
    printDebug({msg: "session user changed: listened to in UserBox", isSessionUser: isSessionUser.value});
});

</script>

<template>
    <div class="media box dcs">
        <div class="media-left dcs">
            <figure class="image is-64x64" @click="printDebug({user: user})">
                <img :src="user.image" alt="Image">
            </figure>
        </div>
        <div class="media-content">
            <p class="title is-4">{{ user.username }}</p>
            <p class="subtitle mb-0 is-6">{{ user.firstName + " " + user.lastName }}</p>
            <p class="subtitle is-6">{{ user.email }}</p>
        </div>
        <nav class="level is-mobile">
            <div class="level-left">
                <div class="level-item">
                <FriendButton v-bind="user"/>
                </div>
            </div>
        </nav>
    </div>

</template>

<style scoped>
div.box {
    margin-top: 1rem;
    margin-bottom: 1rem;
    border: 2px var(--color-border) solid;
    border-radius: .25rem;
}
</style>