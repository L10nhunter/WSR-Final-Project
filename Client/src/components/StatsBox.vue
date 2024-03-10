<script setup lang="ts">
import { type Stats,  } from "@/model/stats";
import {caloriesFormat, distanceFormat, durationFormat, paceFormat} from "@/model/Globals";

const props = defineProps({
    stats: Object as () => Stats,
    label: String,
});

</script>

<template>
    <div class="box dcs bordered">
        <div class="is-size-4 dcs">{{ props.label }}</div>
        <div class="columns is-multiline has-text-centered">
            <div class="column is-half">
                <div class="is-size-2">{{ distanceFormat(props.stats?.distance ?? 0) }}</div>
                <div class="is-size-7 soft-color">Distance</div>
            </div>
            <div class="column is-half">
                <div class="is-size-2">{{ durationFormat(props.stats?.duration ?? 0) }}</div>
                <div class="is-size-7 soft-color">Duration</div>
            </div>
            <div class="column is-half">
                <div class="is-size-2">{{ paceFormat(props.stats?.pace ?? 0) }}</div>
                <div class="is-size-7 soft-color">Avg Pace</div>
            </div>
            <div class="column is-half">
                <div class="is-size-2">{{ caloriesFormat(props.stats?.calories ?? 0) }}</div>
                <div class="is-size-7 soft-color">Calories</div>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>