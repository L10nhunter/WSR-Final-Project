<script setup lang="ts">

</script>

<template>
    <div class="modal">
        <div class="modal-background"></div>
        <div class="modal-card dcs bordered">
            <header class="modal-card-head dcs">
                <p class="modal-card-title dcs">Add a Workout</p>
                <button class="delete" @click="$emit('hideModal', false)" aria-label="close"></button>
            </header>
            <section class="modal-content dcs">
                <div class="form">
                    <div class="field">
                        <label class="label dcs" for="Title">Title</label>
                        <div class="control">
                            <input class="input" type="text" id="Title">
                        </div>
                    </div>
                    <div class="field">
                        <label class="label dcs" for="Workout Date">Workout Date</label>
                        <div class="control">
                            <input class="input" type="date" placeholder="Workout Date" id="Workout Date">
                        </div>
                    </div>
                    <div class="field">
                        <label class="label dcs" for="Duration">Duration in Minutes</label>
                        <div class="control">
                            <input class="input" type="number" id="Duration">
                        </div>
                    </div>
                    <div class="field">
                        <label class="label dcs" for="Distance">Distance in Feet</label>
                        <div class="control">
                            <input class="input" type="number" id="Distance">
                        </div>
                    </div>
                    <div class="field">
                        <label class="label dcs" for="Location">Location</label>
                        <div class="control">
                            <input class="input" type="text" id="Location">
                        </div>
                    </div>
                    <div class="field">
                        <label class="label dcs" for="Picture">Picture</label>
                        <div class="control">
                            <input class="input" type="text" id="Picture">
                        </div>
                    </div>
                    <div class="field">
                        <label class="label dcs" for="type">Type</label>
                        <div class="select is-fullwidth ">
                            <select class="form-control main-color" id="type">
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
                <button class="button is-success has-text-black has-text-weight-bold">Save changes</button>
                <button class="button" @click="$emit('hideModal', false)">Cancel</button>
            </footer>
        </div>
    </div>

</template>

<style scoped>

option:hover {
    background: var(--color-border-hover);
}
</style>