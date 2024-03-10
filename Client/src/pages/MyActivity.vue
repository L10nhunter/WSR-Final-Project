<script setup lang="ts">
import "@/assets/main.css";
import {ref} from "vue";
import AddWorkoutModal from "@/components/AddWorkoutModal.vue";
import {type Workout, getWorkouts} from "@/model/workouts";
import WorkoutBox from "@/components/WorkoutBox.vue";
import {LoggedInUser} from "@/model/Globals";

const showAddWorkoutModal = ref(false);
const workouts = ref([] as Workout[]);


function getWorkoutsByUserId(workouts: Workout[], userId: number): Workout[] {
    return workouts.filter(workout => workout.user.id === userId);
}

workouts.value = getWorkoutsByUserId(getWorkouts(), LoggedInUser.value?.id ?? 0);

</script>

<template>
    <div class="columns">
        <div class="column is-half is-offset-one-quarter">
            <div class="button is-primary is-fullwidth" @click="showAddWorkoutModal = true">Add Workout</div>
            <div class="container" v-for="workout in workouts">
                <div class="workout-card">
                    <WorkoutBox v-bind="workout"/>
                </div>
            </div>
        </div>
    </div>

    <AddWorkoutModal :class="showAddWorkoutModal && 'is-active'" @hideModal="showAddWorkoutModal = false"/>
</template>

<style scoped>

</style>