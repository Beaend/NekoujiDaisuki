<script setup lang="ts">
import BarTop from '~/components/bar/BarTop.vue'

// import BarBottom from '~/components/bar/BarBottom.vue'

defineOptions({
  name: 'TheBar',
})
</script>

<template>
  <nav>
    <BarTop />
    <!--    <BarBottom /> -->
  </nav>
</template>

<style>
:root {
  --green: #1dff1d;
  --blue: rgb(63,191,256);
  --gold: #FFD700;

  --bar_bg: rgb(31,35,39);
  --bar_bg_2: rgb(25, 28, 31);
  --bar_bg_3: rgb(39,43,47);
  --bar_color: rgb(223,223,223);
  --bar_color_hide: rgb(191,199,207);
  --bar_color_2: #becde2;
  --bar_active: rgb(63,127,191);
}
</style>
