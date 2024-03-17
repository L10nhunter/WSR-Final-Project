<script setup lang="ts">
import {ref} from "vue";
import {getTextField} from "@/model/textField";
import WorkoutTextField from "@/components/Fields/WorkoutTextField.vue";
import {addWorkout, Workouts, workoutTypes} from "@/model/workouts";
import {LoggedIn, type User} from "@/model/users";

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
    {field: getTextField("Workout Date"), model: workout.WorkoutDate},
    {field: getTextField("Calories"), model: workout.Calories},
    {field: getTextField("Duration"), model: workout.Duration},
    {field: getTextField("Distance"), model: workout.Distance},
    {field: getTextField("Location"), model: workout.Location},
    {field: getTextField("Picture"), model: workout.Picture},
]

const emits = defineEmits<{
    (event: 'hideModal', value: void): void;
}>();

function addThisWorkout(workout: any) {
    addWorkout({
        user: LoggedIn.value as User,
        id: (Workouts.value.length + 1).toString(),
        title: workout.Title.value !== "" ? workout.Title.value : "Workout",
        time: new Date().getTime(),
        duration: workout.Duration.value !== "" ? workout.Duration.value : 0,
        distance: workout.Distance.value !== "" ? workout.Distance.value : 0,
        calories: workout.Calories.value !== "" ? workout.Calories.value : 0,
        location: workout.Location.value,
        picture: workout.Picture.value,
        type: workout.type.value !== "" ? workout.type.value : "Other"
    })
}


</script>

<template>
    <div class="modal">
        <div class="modal-background" @click="emits('hideModal')"></div>
        <div class="modal-card dcs bordered">
            <header class="modal-card-head dcs">
                <p class="modal-card-title dcs">Add a Workout</p>
                <button class="delete" @click="emits('hideModal')" aria-label="close"></button>
            </header>
            <section class="modal-content dcs">
                <div class="form">
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
                <button class="button is-primary" @submit.prevent @click="[addThisWorkout(workout), emits('hideModal')]">Add Workout</button>
                <button class="button has-text-weight-bold" @click="emits('hideModal')">Cancel</button>
            </footer>
        </div>
    </div>

</template>

<style scoped>
option:hover {
    background: var(--color-border-hover);
}
</style>