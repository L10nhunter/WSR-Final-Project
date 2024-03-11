<script setup lang="ts">
import {ref} from "vue";
import {getTextField} from "@/model/textField";
import WorkoutTextField from "@/components/Fields/WorkoutTextField.vue";
import {workoutTypes} from "@/model/workouts";

const workout = {
    Title: ref(""),
    WorkoutDate: ref(""),
    Duration: ref<number>(),
    Distance: ref<number>(),
    Location: ref(""),
    Picture: ref(""),
};

const textFields = [
    {field: getTextField("Title"), model: workout.Title},
    {field: getTextField("Workout Date"), model: workout.WorkoutDate},
    {field: getTextField("Duration"), model: workout.Duration},
    {field: getTextField("Distance"), model: workout.Distance},
    {field: getTextField("Location"), model: workout.Location},
    {field: getTextField("Picture"), model: workout.Picture},
]


</script>

<template>
    <div class="modal">
        <div class="modal-background" @click="$emit('hideModal', false)"></div>
        <div class="modal-card dcs bordered">
            <header class="modal-card-head dcs">
                <p class="modal-card-title dcs">Add a Workout</p>
                <button class="delete" @click="$emit('hideModal', false)" aria-label="close"></button>
            </header>
            <section class="modal-content dcs">
                <div class="form">
                    <WorkoutTextField v-for="text in textFields" v-bind="text.field" v-model="text.model.value"/>
                    <div class="field">
                        <label class="label dcs" for="type">Type</label>
                        <div class="select is-fullwidth ">
                            <select class="form-control bordered ics" id="type">
                                <option disabled hidden selected>Choose a type</option>
                                <option v-for="type in workoutTypes">{{type}}</option>
                            </select>
                        </div>
                    </div>
                </div>
            </section>
            <footer class="modal-card-foot dcs">
                <button class="button is-primary">Add Workout</button>
                <button class="button has-text-weight-bold" @click="$emit('hideModal', false)">Cancel</button>
            </footer>
        </div>
    </div>

</template>

<style scoped>
option:hover {
    background: var(--color-border-hover);
}
</style>