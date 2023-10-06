<script setup lang="ts">
const props = defineProps({
  ranobe: Object,
})
</script>

<template>
  <article class="card book ranobe" :class="ranobe.color">
    <div class="left">
      <div class="image" :style="`background-image: url(${ranobe.image})`">
        <div class="texts">
          {{ranobe.title}}
        </div>
      </div>
    </div>
    <div class="right">
      {{ranobe.title_ru}}
    </div>
  </article>
</template>
