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
        <progress class="progress is-primary is-small" max="100" v-if="getSession().loading"/>
        <Suspense>
            <div class="container" id="site-container">
                <RouterView/>
            </div>
        </Suspense>
        <footer class="footer dcs">
            <div class="content has-text-centered">
                <p>
                    <strong>L10n Fitness</strong> by <a href="https://github.com/L10nhunter">This Weirdo</a>.
                </p>
            </div>
        </footer>
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
.progress.is-primary {
    --bulma-progress-value-background-color: var(--color-primary) !important;
    --bulma-progress-bar-background-color: var(--color-background-soft) !important;
    background-image: linear-gradient(to right, var(--bulma-progress-value-background-color) 30%, var(--bulma-progress-bar-background-color) 30%);
}
</style>
```
