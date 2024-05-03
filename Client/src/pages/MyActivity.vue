<script setup lang="ts">
import "@/assets/main.css";
import {definePage} from "unplugin-vue-router/runtime";
import {type Workout, workoutsBySessionID, showAddWorkoutModal} from "@/model/workouts";
import AddWorkoutModal from "@/components/AddWorkoutModal.vue";
import WorkoutBox from "@/components/WorkoutBox.vue";
import NotLoggedBox from "@/components/NotLoggedBox.vue";
import LoggedInContent from "@/components/LoggedInContent.vue";
import {getSession} from "@/model/session";

definePage({meta: {requiresAuth: true}})
getSession().loading+=1000;
const workouts: Workout[] = await workoutsBySessionID().then(workouts => workouts.slice().reverse());
getSession().loading-=1000;
</script>

<template>
    <NotLoggedBox/>
    <LoggedInContent>
        <div class="columns is-centered">
            <div class="column is-three-quarters">
                <button class="button is-primary is-fullwidth" @click="showAddWorkoutModal = true">Add Workout</button>
                <div class="container" v-for="workout in workouts">
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