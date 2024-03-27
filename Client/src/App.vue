<script setup lang="ts">
import "bulma/css/bulma.css";
import NavBar from "@/components/NavBar.vue";
import {RouterView} from 'vue-router';
</script>

<template>
    <Suspense>
        <body class="has-navbar-fixed-top">
        <div id="app">
            <NavBar/>
            <div class="container" id="site-container">
                <RouterView/>
            </div>
        </div>
        </body>
    </Suspense>
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
</style>
```
