<script setup lang="ts">

import {LoggedIn} from "@/model/users";
</script>

<template>
<div :class="{'is-hidden': !LoggedIn}">
    <slot></slot>
</div>
</template>

<style scoped>

</style>