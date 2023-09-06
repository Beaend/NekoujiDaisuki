<script setup lang="ts">
const props = defineProps({
  ranobe: Array,
})
</script>

<template>
  <article class="card book ranobe" :class="ranobe.color">
    <div class="left">
      {{ranobe.title}}
    </div>
    <div class="right">
      {{ranobe.title_ru}}
    </div>
  </article>
</template>
