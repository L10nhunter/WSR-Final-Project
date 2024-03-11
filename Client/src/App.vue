<script setup lang="ts">
import "bulma/css/bulma.css";
import NavBar from "@/components/NavBar.vue";
import {RouterView, useRoute} from 'vue-router'
import {onBeforeMount} from "vue";
import {updateLoggedInUser} from "@/model/Globals";

function getUserIdFromRoute(): number {
    console.log('getUserIdFromRoute');
    const route = useRoute();
    console.log(route.fullPath);
    console.log(route.params.userId);
    return parseInt(<string>route.params.userId);
}

onBeforeMount(() => {
    console.log('onBeforeMount');
    const userId = getUserIdFromRoute();
    if (userId) {
        console.log("userId is not null or undefined:" + userId);
        updateLoggedInUser(userId);
    }
});

</script>

<template>
    <body class="has-navbar-fixed-top">
        <div id="app">
            <NavBar/>
            <div class="container">
                <RouterView/>
            </div>
        </div>
    </body>
</template>

<style scoped>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: var(--color-text);
}
.container {
    padding-top: 1.25rem;
    display: flex;
    flex-direction: column;
}
</style>
```
