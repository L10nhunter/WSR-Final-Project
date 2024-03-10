<script setup lang="ts">
import {ref} from "vue";
import {getTextFieldsFromLabels} from "@/model/TextField";
import WorkoutTextField from "@/components/Fields/WorkoutTextField.vue";

const workout = {
    Title: ref(""),
    WorkoutDate: ref(""),
    Duration: ref<number>(),
    Distance: ref<number>(),
    Location: ref(""),
    Picture: ref(""),
};
const indices = [0, 1, 2, 3, 4, 5];
const textFields = getTextFieldsFromLabels(["Title", "Workout Date", "Duration", "Distance", "Location", "Picture"]);
const models = [workout.Title, workout.WorkoutDate, workout.Duration, workout.Distance, workout.Location, workout.Picture]


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
                    <WorkoutTextField v-for="index in indices" v-bind="textFields[index]" v-model="models[index].value"/>
                    <div class="field">
                        <label class="label dcs" for="type">Type</label>
                        <div class="select is-fullwidth ">
                            <select class="form-control bordered ics" id="type">
                                <option disabled hidden selected>Choose a type</option>
                                <option>Run</option>
                                <option>Bike</option>
                                <option>Swim</option>
                                <option>Cardio</option>
                                <option>Strength</option>
                                <option>Other</option>
                            </select>
                        </div>
                    </div>
                </div>
            </section>
            <footer class="modal-card-foot dcs">
                <button class="button is-success has-text-black has-text-weight-bold">Add Workout</button>
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