<script setup lang="ts">

import {getAllTimeStats, getTodayStats, getWeekStats} from "@/model/stats";
import StatsBox from "@/components/StatsBox.vue";
import {workoutTypes} from "@/model/workouts";
import {computed, ref} from "vue";
import NotLoggedBox from "@/components/NotLoggedBox.vue";
import LoggedInContent from "@/components/LoggedInContent.vue";
// noinspection TypeScriptCheckImport
import {definePage} from "vue-router/auto";

definePage({
    meta: {
        requiresAuth: true
    }
})

const selected = ref("All");

const shownStats = computed(() => [
    {array: getTodayStats(selected.value), label: "Today"},
    {array: getWeekStats(selected.value), label: "This Week"},
    {array: getAllTimeStats(selected.value), label: "All Time"}
]);
</script>

<template>
    <NotLoggedBox/>
    <LoggedInContent>
        <div class="columns is-centered">
            <div class="column is-half">
                <div class="select is-fullwidth mb-4">
                    <select class="ics bordered" v-model="selected">
                        <option selected class="is-hovered-mute">All</option>
                        <option class="is-hovered-mute" v-for="type in workoutTypes" :value="type">{{ type }}</option>
                    </select>
                </div>
                <StatsBox v-for="stats in shownStats" :stats="stats.array" :label="stats.label"/>
            </div>
        </div>
    </LoggedInContent>
</template>

<style scoped>

</style>