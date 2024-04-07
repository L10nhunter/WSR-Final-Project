
<script setup lang="ts">
import "@/assets/main.css";
import {ref} from "vue";
import {getWorkoutsByUserID, type Workout} from "@/model/workouts";
import WorkoutBox from "@/components/WorkoutBox.vue";
import AddWorkoutModal from "@/components/AddWorkoutModal.vue";
import NotLoggedBox from "@/components/NotLoggedBox.vue";
import LoggedInContent from "@/components/LoggedInContent.vue";
import {definePage} from "vue-router/auto";
import {getUser} from "@/model/session";
import type {User} from "@/model/users";

definePage({
    meta: {
        requiresAuth: true
    }
})

// function to make API call to get all friends' workouts
async function getFriendsWorkouts(): Promise<Workout[]> {
    // make API call to get all workouts of each friend
    const user = getUser() as User;
    const workouts = [] as Workout[];
    if (user.friends?.length === 0) return workouts;
    for(const friend of user.friends!){
        const friendWorkouts = await getWorkoutsByUserID(friend);
        for(const workout of friendWorkouts){
            workouts.push(workout);
        }
    }
    // sort workouts in descending order of time
    return workouts.sort((a, b) => {
        return b.time - a.time;
    });
}
const friendsWorkouts = await getFriendsWorkouts();

const showAddWorkoutModal = ref(false);
</script>

<template>
    <NotLoggedBox/>
    <LoggedInContent>
        <div class="columns is-centered">
            <div class="column is-three-fifths">
                <button class="button is-primary is-fullwidth" @click="showAddWorkoutModal = true">Add Workout</button>
                <div class="container" v-for="workout in friendsWorkouts">
                    <div class="workout-card">
                        <WorkoutBox v-bind="workout"/>
                    </div>
                </div>
            </div>
        </div>
        <AddWorkoutModal :class="{'is-active': showAddWorkoutModal}" @hideModal="() => showAddWorkoutModal = false"/>
    </LoggedInContent>
</template>

<style scoped>

</style>