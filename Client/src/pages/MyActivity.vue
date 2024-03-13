<script setup lang="ts">
import "@/assets/main.css";
import {ref} from "vue";
import AddWorkoutModal from "@/components/AddWorkoutModal.vue";
import {workoutsByID} from "@/model/workouts";
import WorkoutBox from "@/components/WorkoutBox.vue";
import NotLoggedBox from "@/components/NotLoggedBox.vue";
import LoggedInContent from "@/components/LoggedInContent.vue";

const showAddWorkoutModal = ref(false);

</script>

<template>
    <NotLoggedBox/>
    <LoggedInContent>
        <div class="columns">
            <div class="column is-half is-offset-one-quarter">
                <button class="button is-primary is-fullwidth" @click="showAddWorkoutModal = true">Add Workout</button>
                <div class="container" v-for="workout in workoutsByID">
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