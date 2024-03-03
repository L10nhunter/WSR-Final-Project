<script setup lang="ts">
import NavBar from "@/components/NavBar.vue";
import {RouterView} from 'vue-router'
import {ref} from "vue";

const isMobile = ref(false);
function checkMobile() {
    isMobile.value = window.innerWidth < 1024;
}

</script>

<template>
    <NavBar />
    <div class="container">
        <RouterView></RouterView>
    </div>

</template>

<style scoped>

</style>