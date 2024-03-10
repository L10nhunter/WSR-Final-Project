<script setup lang="ts">
import {ref} from "vue";
import {getTextFieldsFromLabels} from "@/model/TextField";
import WorkoutTextField from "@/components/Fields/WorkoutTextField.vue";

const textFields = getTextFieldsFromLabels(["Title", "Workout Date", "Duration", "Distance", "Location", "Picture"]);

const workout = {
    Title: ref(""),
    WorkoutDate: ref(""),
    Duration: ref<number>(),
    Distance: ref<number>(),
    Location: ref(""),
    Picture: ref(""),
};


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
                    <WorkoutTextField v-bind="textFields[0]" v-model="workout.Title.value"/>
                    <WorkoutTextField v-bind="textFields[1]" v-model="workout.WorkoutDate.value"/>
                    <WorkoutTextField v-bind="textFields[2]" v-model="workout.Duration.value"/>
                    <WorkoutTextField v-bind="textFields[3]" v-model="workout.Distance.value"/>
                    <WorkoutTextField v-bind="textFields[4]" v-model="workout.Location.value"/>
                    <WorkoutTextField v-bind="textFields[5]" v-model="workout.Picture.value"/>
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