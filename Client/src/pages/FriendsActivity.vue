<script setup lang="ts">
import "@/assets/main.css";
import {getWorkoutsByUserID, type Workout} from "@/model/workouts";
import {defineAsyncComponent} from "vue";
import AddWorkoutModal from "@/components/AddWorkoutModal.vue";
import NotLoggedBox from "@/components/NotLoggedBox.vue";
import LoggedInContent from "@/components/LoggedInContent.vue";
import {definePage} from "unplugin-vue-router/runtime";
import {getSession} from "@/model/session";
import {showAddWorkoutModal} from "@/model/workouts";

const WorkoutBox = defineAsyncComponent(() => import("@/components/WorkoutBox.vue"));

definePage({meta: {requiresAuth: true}})
async function getFriendsWorkouts(): Promise<Workout[]> {
    const user = getSession().user;
    const workouts = [] as Workout[];
    if (!user || !user.friends) return workouts;
    console.debug(user.friends);
    for(const friend of user.friends){
        const friendWorkouts = await getWorkoutsByUserID(friend);
        console.debug(friendWorkouts);
        for(const workout of friendWorkouts){
            workouts.push(workout);
        }
    }
    // sort workouts from newest to oldest
    return workouts.sort((a, b) => {
        return b.time - a.time;
    });
}
// await to make make this async setup
getSession().loading += 1000;
const friendsWorkouts = await getFriendsWorkouts();
getSession().loading -= 1000;
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
        <AddWorkoutModal :class="{'is-active': showAddWorkoutModal}"/>
    </LoggedInContent>
</template>

<style scoped>

</style>