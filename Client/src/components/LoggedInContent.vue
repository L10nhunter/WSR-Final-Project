<script setup lang="ts">

import {getSession} from "@/model/session";

</script>

<template>
<div :class="{'is-hidden': !getSession().user}">
    <slot></slot>
</div>
</template>

<style scoped>

</style>