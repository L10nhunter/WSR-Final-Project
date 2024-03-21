<script setup lang="ts">
import {definePage} from "vue-router/auto";
import {ref} from "vue";

definePage({
    name: "PeopleSearch",
    path: "/search",
})

const search = ref("");
function searchDB() {
    // This will be an API call to the database
    // This will need a search engine of some sort, problem for later
    console.log("searching for " + search.value);
}

</script>

<template>
<div class="columns is-centered">
    <div class="column is-three-fifths">
        <form @submit.prevent="searchDB()">
            <div class="field has-addons">
                <div class="control is-expanded">
                    <input class="input ics bordered" type="text" placeholder="Search for people" v-model="search"/>
                </div>
                <div class="control">
                    <button class="button is-primary" type="submit">Search</button>
                </div>
            </div>
        </form>
    </div>

</div>
</template>

<style scoped>

</style>