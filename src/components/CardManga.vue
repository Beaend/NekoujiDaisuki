<script setup lang="ts">
const props = defineProps({
  manga: Array,
})
</script>

<template>
  {{manga.title}}
</template>
