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
