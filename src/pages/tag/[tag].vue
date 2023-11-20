<script setup lang="ts">
import Api from '~/services/ApiCall.js'
import { Sorting } from '~/services/Sorting'

defineOptions({
  name: 'TagPage',
})

const route = useRoute()

const anime = ref([])
const manga = ref([])
const books = ref([])

async function getList(value) {
  await Api.tag(value)
    .then((response) => {
      anime.value = response.data.anime
      manga.value = response.data.manga
      books.value = response.data.books
    })
  if (anime.value) {
    const sort = new Sorting(anime.value)
    sort.byName('title')
    sort.byYear(true)
  }
}

onBeforeMount(async () => {
  await getList(route.params.tag)
})
onBeforeRouteUpdate(async (to, from) => {
  if (to.params.tag !== from.params.tag)
    await getList(to.params.tag)
})
</script>

<template>
  <main>
    <h1>{{ $t('tag') }}: {{ route.params.tag }}</h1>
    <h2 v-if="anime.length > 0">
      {{ $t('anime') }}
    </h2>
    <div v-if="anime.length > 0" class="shelf">
      <CardAnime
        v-for="item in anime" :key="item.title"
        :anime="item"
      />
    </div>
    <h2 v-if="manga.length > 0">
      {{ $t('comics.manga') }}
    </h2>
    <div v-if="manga.length > 0" class="shelf">
      <CardManga
        v-for="item in manga" :key="item.title"
        :manga="item"
      />
    </div>
    <h2 v-if="books.length > 0">
      {{ $t('ranobe') }}
    </h2>
    <div v-if="books.length > 0" class="shelf">
      <CardRanobe
        v-for="item in books" :key="item.title"
        :ranobe="item"
      />
    </div>
  </main>
</template>
