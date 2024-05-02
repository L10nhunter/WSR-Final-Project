<script setup lang="ts">
import {ref, watch} from "vue";
import {useRoute} from "vue-router";
import {getSession} from "@/model/session";
import WorkoutBox from "@/components/WorkoutBox.vue";
import UserBox from "@/components/UserBox.vue";
import {searchUsers, showLoginModal, type User} from "@/model/users";
import {getWorkoutsBySearch, searchWorkouts, type Workout} from "@/model/workouts";
import type {RouteParams} from "unplugin-vue-router";

const route = useRoute();
const personSearch = ref<User[]>([]);
const workoutSearch = ref<Workout[]>([]);

// outbound handling
const output = ref(route.params.q ?? "");
const isPersonSearch = ref<boolean>((route.params?.type === "person"));
const isWorkoutSearch = ref<boolean>((route.params?.type === "workout"));

await updatePage(route.params);

async function updatePage(params: RouteParams<string>) {
    getSession().loading++;
    if ((params?.type ?? false) && (params?.q ?? false)) {
        if (params.type === "person") {
            personSearch.value = [];
            personSearch.value = await searchUsers(params.q);
        } else if (params.type === "workout") {
            workoutSearch.value = [];
            if (params.user === "user") workoutSearch.value = await getWorkoutsBySearch(params.q);
            else workoutSearch.value = await searchWorkouts(params.q);
        }
    }
    isPersonSearch.value = (params.type === "person");
    isWorkoutSearch.value = (params.type === "workout");
    getSession().loading--;
}

watch(() => route.params, async (params) => {
    await updatePage(params)
});
watch(() => getSession(), async () => {
    await updatePage(route.params);
});
watch(() => showLoginModal.value, () => {
    if (showLoginModal.value) getSession().redirectURL = route.fullPath;
});

</script>

<template>
    <div class="columns is-centered">
        <div class="column is-three-fifths">
            <form class="mb-5" @submit.prevent>
                <div class="field has-addons">
                    <div class="control is-expanded">
                        <input class="input ics bordered" type="text" placeholder="Search" v-model="output"/>
                    </div>
                    <div class="control">
                        <RouterLink :to="{name: '/search/[[type]].[[q]]', params: {type: 'person', q: output}}" class="button is-primary">
                        <span class="icon is-small">
                            <i class="fa-solid fa-p"></i>
                        </span>
                        </RouterLink>
                    </div>
                    <div class="control">
                        <RouterLink :to="{name: '/search/[[type]].[[q]]', params: {type: 'workout', q: output}}" class="button is-primary">
                        <span class="icon is-small">
                            <i class="fa-solid fa-w"></i>
                        </span>
                        </RouterLink>
                    </div>
                </div>
            </form>
            <div v-if="isPersonSearch">
                <UserBox v-for="person in personSearch" v-bind="person"/>
            </div>
            <div v-if="isWorkoutSearch">
                <WorkoutBox v-for="workout in workoutSearch" v-bind="workout"/>
            </div>
        </div>

    </div>
</template>