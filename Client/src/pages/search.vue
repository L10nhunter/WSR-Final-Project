<script setup lang="ts">
import {ref, watch} from "vue";
import {useRoute, useRouter} from "vue-router";
import {getSession} from "@/model/session";
import WorkoutBox from "@/components/WorkoutBox.vue";
import UserBox from "@/components/UserBox.vue";
import type {User} from "@/model/users";
import type {Workout} from "@/model/workouts";
import {api} from "@/model/rest";

getSession().loading++;
const router = useRouter();
console.debug(router);
const route = useRoute();
const type = route.params.type;
const query = route.params.q;
const personSearch = ref<User[]>([]);
const workoutSearch = ref<Workout[]>([]);
if (type && query) {
    console.debug("searching for " + query + " as a " + type);
    if(type === "person") {
        personSearch.value = await searchDB<User>(type, query);
    } else if(type === "workout") {
        workoutSearch.value = await searchDB<Workout>(type, query);
    }
} else {
    console.debug("No search query or type provided");
}

async function searchDB<T>(type: string, query: string|string[]): Promise<T[]> {
    // This will be an API call to the database
    // This will need a search engine of some sort, problem for later
    console.debug("searching for " + query);
    const db = type === "person" ? "users" : "workouts";
    return api<T[]>(db + "/search?q=" + query)
        .then(response => response.data)
        .catch(error => {
            console.error(error);
            return [];
        });
}

// ooutbound handling
const output = ref("");
const isPersonSearch = ref<boolean>((type==="person"));
const isWorkoutSearch = ref<boolean>((type==="workout"));

async function handleSearchPerson() {
    router.push({
        name: "/search/[type].[q]",
        params: {type: "person", q: output.value}
    }).then(r => r).catch(e => console.error(e));
    personSearch.value = await searchDB<User>("person", output.value);
    isPersonSearch.value = true;
    isWorkoutSearch.value = false;
}

async function handleSearchWorkout() {
    getSession().loading++;
    router.push({
        name: "/search/[type].[q]",
        params: {type: "workout", q: output.value}
    }).then(r => r).catch(e => console.error(e));
    workoutSearch.value = await searchDB<Workout>("workout", output.value);
    isWorkoutSearch.value = true;
    isPersonSearch.value = false;
    getSession().loading--;
}

getSession().loading--;

/*watch(() => route.params, async (params) => {
    console.debug("route params changed");
    if (params.type && params.q) {
        console.debug("searching for " + params.q + " as a " + params.type);
        if(params.type === "person") {
            personSearch.value = await searchDB<User>(params.type, params.q);
        } else if(params.type === "workout") {
            workoutSearch.value = await searchDB<Workout>(params.type, params.q);
        }
    } else {
        console.debug("No search query or type provided");
    }
});*/

</script>

<template>
    <div class="columns is-centered">
        <div class="column is-three-fifths">
            <form class="mb-5">
                <div class="field has-addons">
                    <div class="control is-expanded">
                        <input class="input ics bordered" type="text" placeholder="Search" v-model="output"/>
                    </div>
                    <div class="control">
                        <button class="button is-primary" @click.prevent="handleSearchPerson()">
                        <span class="icon is-small">
                            <i class="fa-solid fa-p"></i>
                        </span>
                        </button>
                    </div>
                    <div class="control">
                        <button class="button is-primary" @click.prevent="handleSearchWorkout()">
                        <span class="icon is-small">
                            <i class="fa-solid fa-w"></i>
                        </span>
                        </button>
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