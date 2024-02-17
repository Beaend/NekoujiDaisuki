<script setup lang="ts">
import { onMounted } from 'vue-demi'
import Api from '~/services/ApiCall.ts'
import { Sorting } from '~/services/Sorting'

defineOptions({
  name: 'AnimeByYear',
})

const { t } = useI18n()
const route = useRoute()

const anime = ref({ 1: [], 2: [], 3: [], 4: [] })
const loading = ref(true)

onMounted(async () => {
  await getAnimeByYear(route.params.year)
})

async function getAnimeByYear(year) {
  await Api.getAnimeByYear(year)
    .then((response) => {
      anime.value = { 1: [], 2: [], 3: [], 4: [] }
      for (let i = 0; i < response.data.length; i++)
        anime.value[response.data[i].season].push(response.data[i])
    })
  for (const s in anime.value) {
    const sort = new Sorting(anime.value[s])
    sort.byName('title')
    sort.byQuality()
  }
  loading.value = false
}
onBeforeRouteUpdate(async (to, from) => {
  if (to.params.year !== from.params.year) {
    loading.value = true
    await getAnimeByYear(to.params.year)
  }
})
</script>

<template>
  <main>
    <h1>{{ t('anime') }} {{ route.params.year }}</h1>
    <h2 v-if="loading">
      {{ t('season') }}
    </h2>
    <div v-if="loading" class="shelf">
      <CardBlank v-for="i in [1, 2, 3, 4, 5]" :key="i" />
    </div>
    <h2 v-if="anime[1].length > 0">
      {{ t('season.1') }}
    </h2>
    <div v-if="anime[1].length > 0" class="shelf winter">
      <CardAnime
        v-for="item in anime[1]" :key="item.title"
        :anime="item"
      />
    </div>
    <h2 v-if="anime[2].length > 0">
      {{ t('season.2') }}
    </h2>
    <div v-if="anime[2].length > 0" class="shelf spring">
      <CardAnime
        v-for="item in anime[2]" :key="item.title"
        :anime="item"
      />
    </div>
    <h2 v-if="anime[3].length > 0">
      {{ t('season.3') }}
    </h2>
    <div v-if="anime[3].length > 0" class="shelf summer">
      <CardAnime
        v-for="item in anime[3]" :key="item.title"
        :anime="item"
      />
    </div>
    <h2 v-if="anime[4].length > 0">
      {{ t('season.4') }}
    </h2>
    <div v-if="anime[4].length > 0" class="shelf fall">
      <CardAnime
        v-for="item in anime[4]" :key="item.title"
        :anime="item"
      />
    </div>
  </main>
</template>
