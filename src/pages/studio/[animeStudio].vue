<script setup lang="ts">
import Api from '~/services/ApiCall.ts'
import { Sorting } from '~/services/Sorting.ts'

defineOptions({
  name: 'StudioPage',
})

const route = useRoute()
const { t } = useI18n()

const rawData = ref([])
const anime = ref({})
const ready = ref(false)
const sortedYears = ref([])

async function getList(name) {
  await Api.studio(name)
    .then((response) => {
      rawData.value = response.data
    })
  const sort = new Sorting(rawData.value)
  sort.byName('title')
  sort.byQuality()
  for (const i in rawData.value) {
    if (!anime.value[rawData.value[i].year])
      anime.value[rawData.value[i].year] = []
    anime.value[rawData.value[i].year].push(rawData.value[i])
  }
  sortedYears.value = Object.keys(anime.value).sort().reverse()
  ready.value = true
}

onBeforeMount(() => {
  getList(route.params.animeStudio)
})
onBeforeRouteUpdate(async (to, from) => {
  if (to.params.animeStudio !== from.params.animeStudio)
    getList(to.params.animeStudio)
})
</script>

<template>
  <main>
    <h1>{{ t('studio') }}: {{ route.params.animeStudio }}</h1>
    <div v-if="!ready" class="shelf">
      <CardBlank v-for="i in [1, 2, 3]" :key="i" />
    </div>
    <template v-for="year in sortedYears" :key="year">
      <h2>{{ year }}</h2>
      <div v-if="ready" class="shelf">
        <CardAnime
          v-for="item in anime[year]" :key="item.title"
          :anime="item"
        />
      </div>
    </template>
  </main>
</template>
