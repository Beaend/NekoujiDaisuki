<script setup lang="ts">
import Api from '~/services/ApiCall.js'
import { Sorting } from '~/services/Sorting.ts'

defineOptions({
  name: 'PageAnimeBest',
})

const { t } = useI18n()

const anime = ref(null)
const loading = ref(true)

function getAnime() {
  Api.getAnimeByType('movie')
    .then((response) => {
      anime.value = response.data
      const sort = new Sorting(anime.value)
      sort.byName('title')
      sort.byYear(true)
    })
}

async function floading() {
  await new Promise(resolve => setTimeout(resolve, 500))
  loading.value = false
}
onBeforeMount(async () => {
  await getAnime()
  await floading()
})
</script>

<template>
  <main>
    <h1>{{ t('anime-type.film-s') }}</h1>
    <div v-show="loading" class="shelf">
      <CardBlank v-for="l in [1, 2, 3]" :key="l" />
    </div>
    <div v-if="anime && !loading" class="shelf">
      <template v-for="item in anime">
        <CardAnime v-if="item.type.toLowerCase() === 'film'" :key="item.id" :anime="item" />
      </template>
    </div>
  </main>
</template>

<route lang="yaml">
meta:
  layout: home
</route>
