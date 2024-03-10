<script setup lang="ts">
import "@/assets/main.css";
import {getAllTimeStats, getTodayStats, getWeekStats} from "@/model/stats";
import StatsBox from "@/components/StatsBox.vue";

const indices = [0, 1, 2];
const statsArray = [getTodayStats(), getWeekStats(), getAllTimeStats()]
const labels = ["Today", "This Week", "All Time"];
</script>

<template>
    <div class="columns is-centered">
        <div class="column is-half">
            <StatsBox v-for="index in indices" :key="index" :stats="statsArray[index]" :label="labels[index]"/>
        </div>
    </div>
</template>
