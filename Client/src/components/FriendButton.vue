<script setup lang="ts">
import {getSession} from "@/model/session";
import {ref, watch} from "vue";
import {showLoginModal, addFriend, removeFriend, type User} from "@/model/users";
import {useToast} from "vue-toastification";
import type {ObjectId} from "mongodb";

const user = defineProps<User>();
const sessionUser = getSession().user;

const sessionFriends = ref<(string | ObjectId)[]>(sessionUser?.friends ?? []);
const isSessionFriend = ref<boolean>(sessionFriends.value.includes(user._id));
const isSessionUser = ref<boolean>(sessionUser?._id === user._id ?? false);
const showUnfriendModal = ref<boolean>(false);
async function updateSessionFriends() {
    console.debug({click: true, sessionUser: sessionUser, boxUser: user, isSessionFriend: isSessionFriend.value, isSessionUser: isSessionUser.value});
    if(!sessionUser) {
        useToast().warning("You must be logged in to add friends.");
        showLoginModal.value = true;
        return;
    }
    if(isSessionUser.value) {
        useToast().warning("You cannot friend yourself.");
        return;
    }
    if (isSessionFriend.value) showUnfriendModal.value = true;
    else {
        await addFriend(user._id);
        isSessionFriend.value = true;
    }
}
watch(() => getSession().user, () => {
    sessionFriends.value = sessionUser?.friends ?? [];
    isSessionFriend.value = sessionFriends.value.includes(user._id);
    isSessionUser.value = sessionUser?._id === user._id ?? false;
});

</script>

<template>
    <button class="level-item" aria-label="like" :class="{'is-color-pink': isSessionUser || isSessionFriend}" @click="updateSessionFriends()">
        <span class="icon is-small">
            <i class="fa-solid fa-heart" aria-hidden="true"></i>
        </span>
    </button>
    <div class="modal" :class="{'is-active': showUnfriendModal}">
        <div class="modal-background" @click="showUnfriendModal=false"></div>
        <div class="modal-card dcs bordered">
            <header class="modal-card-head dcs">
                <p class="modal-card-title has-text-centered dcs">Are you sure you want to unfriend {{ user.username }}?</p>
                <button class="delete" aria-label="close" @click="showUnfriendModal=false"></button>
            </header>
            <section class="modal-content">
                <div class="control">
                    <button class="button" @click="showUnfriendModal=false">Cancel</button>
                    <button class="button is-danger" @click="removeFriend(user._id)">Unfriend</button>
                </div>
            </section>
        </div>
    </div>

</template>

<style scoped>
.is-color-pink {
    color: deeppink;
}
</style>