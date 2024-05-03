<script setup lang="ts">
import "bulma/css/bulma.css";
import NavBar from "@/components/NavBar.vue";
import {RouterView} from 'vue-router';
</script>

<template>
    <body class="has-navbar-fixed-top">
    <div id="app">
        <NavBar/>
        <!-- TODO: figure out skeltons and use susponse properly -->
        <Suspense>
            <div class="container" id="site-container">
                <RouterView/>
            </div>
            <template #fallback>
                <div class="container" id="site-container">
                    <div class="columns is-centered">
                        <div class="column is-three-quarters">
                            <div class="card">
                                <div class="card-content">
                                    <div class="content">
                                        <h1 class="title">Loading...</h1>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </template>
        </Suspense>
        <footer class="footer dcs">
            <div class="content has-text-centered">
                <p><strong>L10n Fitness</strong> by <a href="https://github.com/L10nhunter">This Weirdo</a>.</p>
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
    padding-top: 1rem;
    display: flex;
    flex-direction: column;
}

</style>
```
