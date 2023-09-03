<script setup lang="ts">
import BarTop from '~/components/bar/BarTop.vue'

// import BarBottom from '~/components/bar/BarBottom.vue'

defineOptions({
  name: 'TheBar',
})

const years = [2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013, 2012, 2011, 2010, 2009]
const genres = [[1, 'Приключения'], [2, 'Повседневность'], [3, 'Комедия'], [4, 'Фантастика'], [5, 'Экшен'],
  [6, 'Драма'], [13, 'Романтика']]
</script>

<template>
  <nav>
    <BarTop
      :years=years
      :genres=genres
    />
    <!--    <BarBottom -->
    <!--      :years=years -->
    <!--      :genres=genres -->
    <!--    /> -->
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
