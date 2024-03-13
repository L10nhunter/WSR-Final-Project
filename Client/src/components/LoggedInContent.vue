<script setup lang="ts">

import {LoggedInUser} from "@/model/users";
</script>

<template>
<div :class="{'is-hidden': !LoggedInUser}">
    <slot></slot>
</div>
</template>

<style scoped>

</style>