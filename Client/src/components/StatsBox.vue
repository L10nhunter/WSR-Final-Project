<script setup lang="ts">
import { type Stats } from "@/model/stats";

const props = defineProps({
    stats: Object as () => Stats,
    label: String,
});
function distanceFormat(distance: number) {
    if (distance > 5280) {
        return (distance / 5280).toFixed(2) + " mi";
    }
    return distance.toFixed(2) + " ft";
}
function durationFormat(duration: number) {
    const hours = Math.floor(duration / 60);
    const minutes = Math.floor(duration % 60);
    return (hours<10 ? "0"+ hours : hours) + ":" + (minutes < 10 ? "0" + minutes : minutes);
}
function paceFormat(pace?: number) {
    if (!pace) return "0 mi/h";
    if (pace < 1) return (pace * 88).toFixed(2) + " ft/m";
    return pace.toFixed(2) + " mi/h";
}
function caloriesFormat(calories: number) {
    if(calories > 1000) return (calories/1000).toFixed(2) + "k";
    return calories + "";
}

</script>

<template>
    <div class="box dcs bordered mb-4">
        <div class="is-size-3 dcs has-text-centered">{{ props.label }}</div>
        <div class="columns is-multiline has-text-centered">
            <div class="column is-half scs">
                <div class="is-size-2 ">{{ distanceFormat(props.stats?.distance ?? 0) }}</div>
                <div class="is-size-7 soft-color">Distance</div>
            </div>
            <div class="column is-half scs">
                <div class="is-size-2">{{ durationFormat(props.stats?.duration ?? 0) }}</div>
                <div class="is-size-7 soft-color">Duration</div>
            </div>
            <div class="column is-half scs">
                <div class="is-size-2">{{ paceFormat(props.stats?.pace) }}</div>
                <div class="is-size-7 soft-color">Avg Pace</div>
            </div>
            <div class="column is-half scs">
                <div class="is-size-2">{{ caloriesFormat(props.stats?.calories ?? 0) }}</div>
                <div class="is-size-7 soft-color">Calories</div>
            </div>
        </div>
    </div>
</template>

<style scoped>
div.is-size-2{
    font-weight: bold;
}
div.is-size-3{
    margin-bottom: .25rem;
}
</style>