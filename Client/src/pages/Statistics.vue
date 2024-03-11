<script setup lang="ts">

import {getAllTimeStats, getTodayStats, getWeekStats} from "@/model/stats";
import StatsBox from "@/components/StatsBox.vue";
import {workoutTypes} from "@/model/workouts";
import {ref} from "vue";

const selected = ref("All");

const indices = [0, 1, 2];
const statsArray = [getTodayStats(), getWeekStats(), getAllTimeStats()];
const labels = ["Today", "This Week", "All Time"];

const shownStats = ref(statsArray);

function updateShownStats() {
    if (selected.value === "All") shownStats.value = statsArray;
    else shownStats.value = [getTodayStats(selected.value), getWeekStats(selected.value), getAllTimeStats(selected.value)]
}

</script>

<template>
    <div class="columns is-centered">
        <div class="column is-half">
            <div class="select is-fullwidth mb-4">
                <select class="ics bordered" v-model="selected" @change="updateShownStats()">
                    <option selected class="is-hovered-mute">All</option>
                    <option class="is-hovered-mute" v-for="type in workoutTypes" :key="type" :value="type">{{ type }}</option>
                </select>
            </div>
            <StatsBox v-for="index in indices" :key="index" :stats="shownStats[index]" :label="labels[index]"/>

        </div>
    </div>
</template>

<style scoped>

</style>