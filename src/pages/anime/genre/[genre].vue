<script setup lang="ts">
import Sorting from '~/components/Sorting.vue'
import Api from '~/services/ApiCall.js'
import { userCookies } from '~/stores/cookies'

defineOptions({
  name: 'AnimeByGenre',
})

const { t } = useI18n()
const route = useRoute()

const anime = ref([])
const genre = ref(String)
function getAnimeByGenre(genre) {
  Api.getAnimeGenre(genre)
    .then((response) => {
      anime.value.push(...response.data[0])
      anime.value.push(...response.data[1])
    })
}
function getGenreName() {
  Api.getGenres()
    .then((response) => {
      for (let g = 0; g < response.data.length; g++) {
        if (response.data[g].id === Number(route.params.genre))
          genre.value = response.data[g].en
      }
    })
}

onBeforeMount(() => {
  getAnimeByGenre(route.params.genre)
  getGenreName()
})

const cookies = userCookies()
</script>

<template>
  <main>
    <h1>{{ t('anime') }} {{ t(`genres.${genre}`) }}</h1>
    <Sorting
      v-model="anime" :raw-data="anime" :settings="cookies.sorting.index"
    />
    <div class="shelf">
      <CardAnime v-for="item in anime" :key="item.id" :anime="item" />
    </div>
  </main>
</template>
