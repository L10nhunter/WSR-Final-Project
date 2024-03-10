<script setup lang="ts">
import "@/assets/main.css";
import {ref} from "vue";
import AddWorkoutModal from "@/components/AddWorkoutModal.vue";
import {type Workout, getWorkouts} from "@/model/workouts";
import WorkoutCard from "@/components/WorkoutCard.vue";
import {getUsers} from "@/model/users";

const showAddWorkoutModal = ref(false);
const workouts = ref([] as Workout[]);
workouts.value = getWorkouts();

const users = ref(getUsers());

/*
const workouts = ref([] as Workout[]);
workouts.value = getWorkouts().map((workout) => {
    const LoggedInUser = users.value.find((user) => user.id === 31);
    users.value.find((LoggedInUser) => LoggedInUser.id === workout.user.id);
    return {...workout};
});*/

</script>

<template>
    <div class="button is-primary" @click="showAddWorkoutModal = true">Add Workout</div>
    <div class="title">
        total length of workouts: {{workouts.length}}
    </div>
    <div class="container">
        <div class="workout-card">
            <WorkoutCard/>
        </div>
    </div>

    <AddWorkoutModal :class="showAddWorkoutModal && 'is-active'" @hideModal="showAddWorkoutModal = false"/>
</template>

<style scoped>
.workout-card {
    margin: 10px;
    border: 2px var(--color-border) solid;
    border-radius: .25rem;
}


</style>