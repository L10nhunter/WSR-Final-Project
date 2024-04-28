<script setup lang="ts">
import "@/assets/main.css";
import {ref} from "vue";
import {definePage} from "vue-router/auto";
import {workoutsBySessionID} from "@/model/workouts";
import AddWorkoutModal from "@/components/AddWorkoutModal.vue";
import WorkoutBox from "@/components/WorkoutBox.vue";
import NotLoggedBox from "@/components/NotLoggedBox.vue";
import LoggedInContent from "@/components/LoggedInContent.vue";

definePage({meta: {requiresAuth: true}})
const showAddWorkoutModal = ref(false);
const workouts = await workoutsBySessionID().then(workouts => workouts.slice().reverse());
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