<script setup lang="ts">

import {LoggedIn} from "@/model/users";
</script>

<template>
<div class="box dcs bordered" :class="{'is-hidden': LoggedIn}">
    <p class="title is-4 dcs">You are not logged in</p>
    <p class="subtitle is-6 dcs">Please log in to access this page</p>
</div>
</template>

<style scoped>

</style>