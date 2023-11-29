<script setup lang="ts">
defineOptions({
  name: 'IndexPage',
})

const { t } = useI18n()
const season = ref({ year: 0, season: 0 })

async function getActualSeason() {
  season.value.year = new Date().getFullYear()
  const mm = new Date().getMonth() + 1
  season.value.season = mm < 4 ? 1 : mm < 7 ? 2 : mm < 10 ? 3 : 4
}

onBeforeMount(async () => {
  await getActualSeason()
})
</script>

<template>
  <main>
    <h1>Страница ждёт прекрасного будущего</h1>
    <h2>В разработке. Старая версия - на главной странице</h2>
  </main>
</template>

<style>
</style>

<route lang="yaml">
meta:
  layout: home
</route>
