<script setup>
import { windowStore } from '~/stores/window'

const window = windowStore()
</script>

<template>
  <main
    text="center gray-700 dark:gray-200"
  >
    <div
      class="page-wrapper-image"
      :style="{ backgroundImage: `url(${window.backgroundUrl})` }"
    />
    <RouterView />
    <TheFooter />
  </main>
</template>
