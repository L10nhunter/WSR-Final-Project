<script setup lang="ts">
import "bulma/css/bulma.css";
import NavBar from "@/components/NavBar.vue";
import {RouterView} from 'vue-router';
import {getSession} from "@/model/session";
</script>

<template>

    <body class="has-navbar-fixed-top">
    <div id="app">
        <NavBar/>
        <div class="">
            <progress class="progress is-primary is-small" max="100" v-if="getSession().loading">15%</progress>
        </div>
        <Suspense>
            <div class="container" id="site-container">
                <RouterView/>
            </div>
        </Suspense>
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

#site-container {
    padding-top: 1.25rem;
    display: flex;
    flex-direction: column;
}

.progress.is-primary:indeterminate {
    background-color: var(--color-background-mute);
    background-image: linear-gradient(to right, var(--color-background-soft) 0% 10%, var(--color-primary) 15%, var(--color-background-soft) 20% 30%, var(--color-background-mute));
}
</style>
```
