<script setup lang="ts">

import {getAllTimeStats, getTodayStats, getWeekStats, type Stats} from "@/model/stats";
import StatsBox from "@/components/StatsBox.vue";
import {workoutTypes} from "@/model/workouts";
import {ref} from "vue";
import NotLoggedBox from "@/components/NotLoggedBox.vue";
import LoggedInContent from "@/components/LoggedInContent.vue";
import {definePage} from "unplugin-vue-router/runtime";
import {getSession} from "@/model/session";

definePage({meta: {requiresAuth: true}});
getSession().loading++;
const selected = ref("All");
const todayStats = ref<Stats>(await getTodayStats(selected.value));
const weekStats = ref<Stats>(await getWeekStats(selected.value));
const allTimeStats = ref<Stats>(await getAllTimeStats(selected.value));
getSession().loading--;
const recalculateStats = async () => {
    getSession().loading++;
    todayStats.value = await getTodayStats(selected.value);
    weekStats.value = await getWeekStats(selected.value);
    allTimeStats.value = await getAllTimeStats(selected.value);
    getSession().loading--;
}

</script>

<template>
    <NotLoggedBox/>
    <LoggedInContent>
        <div class="columns is-centered">
            <div class="column is-half">
                <div class="select is-fullwidth mb-4">
                    <select class="ics bordered" v-model="selected" @change="recalculateStats()">
                        <option selected class="is-hovered-mute">All</option>
                        <option class="is-hovered-mute" v-for="type in workoutTypes" :value="type">{{ type }}</option>
                    </select>
                </div>
                <StatsBox :stats="todayStats" label="Today"/>
                <StatsBox :stats="weekStats" label="This Week"/>
                <StatsBox :stats="allTimeStats" label="All Time"/>
            </div>
        </div>
    </LoggedInContent>
</template>

<style scoped>

</style>