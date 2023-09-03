<script setup lang="ts">
import { barStore } from '~/stores/bar'

const bar = barStore()
</script>

<template>
  <input
    id="search"
    v-model="bar.searchValue"
    v-bind="$attrs"
    type="search"
    h="40px"
    w="250px"
    class="input"
    bg="#191c1f"
    border="~ rounded gray-200 dark:gray-900"
    outline="none active:none"
  >
</template>
