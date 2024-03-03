<script setup lang="ts">
import NavBar from "@/components/NavBar.vue";
import {RouterView} from 'vue-router'


</script>

<template>
    <div id="app">
        <NavBar/>
        <div class="container">
            <RouterView/>
        </div>
    </div>
</template>

<style scoped>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #041536;
}

.container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}
</style>
```
