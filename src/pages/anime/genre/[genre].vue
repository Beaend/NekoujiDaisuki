<script setup lang="ts">
import Api from '~/services/ApiCall.ts'
import { Sorting } from '~/services/Sorting'

defineOptions({
  name: 'AnimeByGenre',
})

const { t } = useI18n()
const route = useRoute()

const anime = ref([])
const genre = ref(String)
const genres = ref([])
const loading = ref(true)

async function getAnimeByGenre(genre) {
  await Api.getAnimeGenre(genre)
    .then((response) => {
      anime.value.push(...response.data[0])
      anime.value.push(...response.data[1])
    })
  const sort = new Sorting(anime.value)
  sort.byName('title')
  sort.byQuality()
  sort.byYear(true)
  loading.value = false
}
async function getGenres() {
  await Api.getGenres()
    .then((response) => {
      genres.value = response.data
    })
}

function getGenreName(genreName) {
  for (let g = 0; g < genres.value.length; g++) {
    if (genres.value[g].id === Number(genreName))
      genre.value = genres.value[g]
  }
}

onBeforeMount(async () => {
  await getAnimeByGenre(route.params.genre)
  await getGenres()
  getGenreName(route.params.genre)
})

onBeforeRouteUpdate(async (to, from) => {
  if (to.params.genre !== from.params.genre) {
    anime.value = []
    loading.value = true
    await getAnimeByGenre(to.params.genre)
    getGenreName(to.params.genre)
  }
})
</script>

<template>
  <main>
    <h1>
      {{ t('anime') }}
      <span v-if="!genre[`${$i18n.locale}_description`]">
        {{ genre[$i18n.locale] }}
      </span>
      <span v-else style="cursor: help;">
        {{ genre[$i18n.locale] }}
        <div class="genre-description">
          <p v-for="g in genre[`${$i18n.locale}_description`]" :key="g.id">
            {{ g }}
          </p>
        </div>
      </span>
    </h1>
    <div v-if="loading" class="shelf">
      <CardBlank v-for="l in [1, 2, 3]" :key="l" />
    </div>
    <div class="shelf">
      <CardAnime v-for="item in anime" :key="item.id" :anime="item" />
    </div>
  </main>
</template>

<style>
h1 {
  position: relative;
  cursor: default;
  user-select: none;
}
.genre-description {
  position: absolute;
  display: none;
  font-size: 1rem;
  font-weight: normal;
  background: var(--bar_bg);
  padding: 10px;
  border-radius: 8px;
  left: 50%;
  transform: translate(-50%);
  z-index: 2;
}
h1:hover .genre-description {
  display: block;
}
</style>
