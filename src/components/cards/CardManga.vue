<script setup lang="ts">
const props = defineProps({
  manga: Object,
})
</script>

<template>
  <article class="card manga" :class="manga.color">
    <div class="left">
      <div class="image" :style="`background-image: url(${manga.image})`">
        <div class="texts">
          {{manga.title}}
        </div>
      </div>
    </div>
    <div class="right">
      {{manga.title_ru}}
    </div>
  </article>
</template>
