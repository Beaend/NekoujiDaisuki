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

<style scoped>
</style>
