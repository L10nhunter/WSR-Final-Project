<script setup lang="ts">
import { type Stats,  } from "@/model/stats";
import {caloriesFormat, distanceFormat, durationFormat, paceFormat} from "@/model/Globals";

const props = defineProps({
    stats: Object as () => Stats,
    label: String,
});

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
                <div class="is-size-2">{{ paceFormat(props.stats?.pace ?? 0) }}</div>
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