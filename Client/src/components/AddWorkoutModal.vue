<script setup lang="ts">

</script>

<template>
    <div class="modal ">
        <div class="modal-background"></div>
        <div class="modal-card default-color-scheme">
            <header class="modal-card-head default-color-scheme">
                <p class="modal-card-title default-color-scheme">Add a Workout</p>
                <button class="delete" @click="$emit('hideModal', false)" aria-label="close"></button>
            </header>
            <section class="modal-content default-color-scheme">
                <div class="form">
                    <div class="field">
                        <label class="label default-color-scheme">Title</label>
                        <div class="control">
                            <input class="input" type="text">
                        </div>
                    </div>
                    <div class="field">
                        <label class="label default-color-scheme">Workout Date</label>
                        <div class="control">
                            <input class="input" type="date" placeholder="Workout Date">
                        </div>
                    </div>
                    <div class="field">
                        <label class="label default-color-scheme">Duration in Minutes</label>
                        <div class="control">
                            <input class="input" type="number">
                        </div>
                    </div>
                    <div class="field">
                        <label class="label default-color-scheme">Distance in Feet</label>
                        <div class="control">
                            <input class="input" type="number">
                        </div>
                    </div>
                    <div class="field">
                        <label class="label default-color-scheme">Location</label>
                        <div class="control">
                            <input class="input" type="text">
                        </div>
                    </div>
                    <div class="field">
                        <label class="label default-color-scheme">Picture</label>
                        <div class="control">
                            <input class="input" type="text">
                        </div>
                    </div>
                    <div class="field">
                        <label class="label default-color-scheme" for="type">Type</label>
                        <div class="select is-fullwidth ">
                            <select class="form-control has-main-color" id="type">
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
            <footer class="modal-card-foot default-color-scheme">
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