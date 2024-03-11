<script setup lang="ts">
import "@/assets/main.css";
import {getAllTimeStats, getTodayStats, getWeekStats} from "@/model/stats";
import StatsBox from "@/components/StatsBox.vue";

const Stats = [
    {label: "Today", stats: getTodayStats()},
    {label: "This Week", stats: getWeekStats()},
    {label: "All Time", stats: getAllTimeStats()}
];

</script>

<template>
    <div class="columns is-centered">
        <div class="column is-half">
            <StatsBox v-for="stat in Stats" :stats="stat.stats" :label="stat.label"/>
        </div>
    </div>
</template>
