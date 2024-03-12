<script setup lang="ts">
import "@/assets/main.css";
import {getAllTimeStats, getTodayStats, getWeekStats} from "@/model/stats";
import StatsBox from "@/components/StatsBox.vue";
import {computed} from "vue";

const Stats = computed(() => [
    {array: getTodayStats(), label: "Today"},
    {array: getWeekStats(), label: "This Week"},
    {array: getAllTimeStats(), label: "All Time"}
]);

</script>

<template>
    <div class="columns is-centered">
        <div class="column is-half">
            <StatsBox v-for="stat in Stats" :stats="stat.array" :label="stat.label"/>
        </div>
    </div>
</template>
