<script setup>
import { displayStore } from '~/stores/display'

const display = displayStore()
</script>

<template>
  <main
    text="center gray-700 dark:gray-200"
  >
    <div
      class="page-wrapper-image"
      :style="{ backgroundImage: `url(${display.backgroundUrl})` }"
    />
    <RouterView />
    <TheFooter />
  </main>
</template>
