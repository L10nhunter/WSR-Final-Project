<script setup lang="ts">
import "bulma/css/bulma.css";
import NavBar from "@/components/NavBar.vue";
import {RouterView} from 'vue-router'
import {ref} from "vue";

const isModalActive = ref(false);


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
    color: #041536;
}

.container {
    display: flex;
    flex-direction: column;
}
</style>
```
