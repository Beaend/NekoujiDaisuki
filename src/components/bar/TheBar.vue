<script setup lang="ts">
import { displayStore } from '~/stores/display'

defineOptions({
  name: 'TheBar',
})

const display = displayStore()
</script>

<template>
  <nav>
    <BarTop />
    <BarBottom v-if="display.window.width <= 800" />
  </nav>
</template>

<style>
:root {
  --green: #1dff1d;
  --blue: rgb(63,191,255);
  --gold: #FFD700;
  --blue-passive: rgb(63, 127, 224);
  --blue-active: rgb(63, 223, 255);

  --bar_bg: rgb(31,35,39);
  --bar_bg_2: rgb(25, 28, 31);
  --bar_bg_3: rgb(39,43,47);
  --bar_color: rgb(223,223,223);
  --bar_color_hide: rgb(191,199,207);
  --bar_color_2: #becde2;
  --bar_active: rgb(63,127,191);
}
</style>
