<script setup lang="ts">
import "@/assets/main.css";
import {getAllTimeStats, getTodayStats, getWeekStats, type Stats} from "@/model/stats";
import StatsBox from "@/components/StatsBox.vue";
import {ref} from "vue";

const todayStats = ref<Stats>(await getTodayStats());
const weekStats = ref<Stats>(await getWeekStats());
const allTimeStats = ref<Stats>(await getAllTimeStats());


</script>

<template>
    <div class="columns is-centered">
        <div class="column is-half">
            <StatsBox :stats="todayStats" label="Today"/>
            <StatsBox :stats="weekStats" label="This Week"/>
            <StatsBox :stats="allTimeStats" label="All Time"/>
        </div>
    </div>
</template>
