
<script setup lang="ts">
import "@/assets/main.css";
import {ref} from "vue";
import {Workouts, toReversed} from "@/model/workouts";
import WorkoutBox from "@/components/WorkoutBox.vue";
import AddWorkoutModal from "@/components/AddWorkoutModal.vue";
import NotLoggedBox from "@/components/NotLoggedBox.vue";
import LoggedInContent from "@/components/LoggedInContent.vue";
// noinspection TypeScriptCheckImport
import {definePage} from "vue-router/auto";

definePage({
    meta: {
        requiresAuth: true
    }
})

const showAddWorkoutModal = ref(false);
</script>

<template>
    <NotLoggedBox/>
    <LoggedInContent>
        <div class="columns is-centered">
            <div class="column is-three-fifths">
                <button class="button is-primary is-fullwidth" @click="showAddWorkoutModal = true">Add Workout</button>
                <div class="container" v-for="workout in toReversed(Workouts)">
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