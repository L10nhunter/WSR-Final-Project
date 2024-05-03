<script setup lang="ts">
import {ref} from "vue";
import {getTextField} from "@/model/textField";
import WorkoutTextField from "@/components/Fields/WorkoutTextField.vue";
import {addWorkout, workoutTypes} from "@/model/workouts";
import {getSession} from "@/model/session";
import {showAddWorkoutModal} from "@/model/workouts";

const workout = {
    Title: ref(""),
    WorkoutDate: ref(""),
    Duration: ref<number>(),
    Distance: ref<number>(),
    Calories: ref<number>(),
    Location: ref(""),
    Picture: ref(""),
    type: ref(""),
};

const textFields = [
    {field: getTextField("Title"), model: workout.Title},
    {field: getTextField("Calories"), model: workout.Calories},
    {field: getTextField("Duration"), model: workout.Duration},
    {field: getTextField("Distance"), model: workout.Distance},
    {field: getTextField("Location"), model: workout.Location}
]

async function addThisWorkout(workout: any) {
    await addWorkout({
        title: workout.Title.value !== "" ? workout.Title.value : "Workout",
        time: new Date().getTime(),
        duration: workout.Duration.value !== "" ? workout.Duration.value : 0,
        distance: workout.Distance.value !== "" ? workout.Distance.value : 0,
        calories: workout.Calories.value !== "" ? workout.Calories.value : 0,
        location: workout.Location.value,
        picture: workout.Picture.value,
        type: workout.type.value !== "" ? workout.type.value : "Other",
        uid: getSession().user!._id
    })
}
</script>

<template>
    <div class="modal">
        <div class="modal-background" @click="showAddWorkoutModal = false"></div>
        <div class="modal-card dcs bordered">
            <header class="modal-card-head dcs">
                <p class="modal-card-title dcs">Add a Workout</p>
                <button class="delete" @click="showAddWorkoutModal = false" aria-label="close"></button>
            </header>
            <section class="modal-content dcs">
                <div class="form mx-4">
                    <WorkoutTextField v-for="text in textFields" v-bind="text.field" v-model="text.model.value"/>
                    <div class="field">
                        <label class="label dcs" for="type">Type</label>
                        <div class="select is-fullwidth ">
                            <select class="bordered ics" id="type" v-model="workout.type.value">
                                <option disabled hidden selected>Choose a type</option>
                                <option v-for="type in workoutTypes" :value="type">{{type}}</option>
                            </select>
                        </div>
                    </div>
                </div>
            </section>
            <footer class="modal-card-foot dcs">
                <button class="button is-primary" @click.prevent="[addThisWorkout(workout), showAddWorkoutModal = false]">Add Workout</button>
                <button class="button has-text-weight-bold" @click="showAddWorkoutModal = false">Cancel</button>
            </footer>
        </div>
    </div>

</template>

<style scoped>
option:hover {
    background: var(--color-border-hover);
}
</style>