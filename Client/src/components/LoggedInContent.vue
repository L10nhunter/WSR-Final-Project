<script setup lang="ts">

import {getUser} from "@/model/session";

</script>

<template>
<div :class="{'is-hidden': !getUser()}">
    <slot></slot>
</div>
</template>

<style scoped>

</style>