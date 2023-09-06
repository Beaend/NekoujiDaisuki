<script setup lang="ts">
const props = defineProps({
  manga: Array,
})
</script>

<template>
  <article class="card manga" :class="manga.color">
    <div class="left">
      {{manga.title}}
    </div>
    <div class="right">
      {{manga.title_ru}}
    </div>
  </article>
</template>
