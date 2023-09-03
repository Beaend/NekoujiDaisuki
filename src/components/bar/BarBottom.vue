<script setup lang="ts">
import { barStore } from '~/stores/bar'

defineOptions({
  name: 'BarBottom',
})

const bar = barStore()
</script>

<template>
  {{ bar.searchValue }}
</template>

<style scoped>

</style>
