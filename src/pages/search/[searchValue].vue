<script setup lang="ts">
import SortingComponent from '~/components/SortingComponent.vue'
import Api from '~/services/ApiCall.js'
import { Sorting } from '~/services/Sorting'

defineOptions({
  name: 'SearchPage',
})

const route = useRoute()

const anime = ref([])
const manga = ref([])
const books = ref([])
const loading = ref(true)

async function getList(value) {
  await Api.search(value)
    .then((response) => {
      anime.value = response.data.anime
      manga.value = response.data.manga
      books.value = response.data.books
    })
  const sort = new Sorting(anime.value)
  sort.byName('title')
  loading.value = false
}

onBeforeMount(async () => {
  await getList(route.params.searchValue)
})
onBeforeRouteUpdate(async (to, from) => {
  if (to.params.searchValue !== from.params.searchValue) {
    loading.value = true
    await getList(to.params.searchValue)
  }
})
</script>

<template>
  <main>
    <h1>{{ $t('search') }}: {{ route.params.searchValue }}</h1>
    <div v-if="loading" class="shelf">
      <CardBlank v-for="i in [1, 2, 3, 4, 5]" :key="i" />
    </div>
    <h2 v-if="anime.length > 0">
      {{ $t('anime') }}
    </h2>
    <SortingComponent
      v-if="anime.length > 0"
      v-model="anime" :raw-data="anime"
    />
    <div v-if="anime.length > 0" class="shelf">
      <CardAnime
        v-for="item in anime" :key="item.title"
        :anime="item"
      />
    </div>
    <h2 v-if="manga.length > 0">
      {{ $t('comics.manga') }}
    </h2>
    <SortingComponent
      v-if="manga.length > 0"
      v-model="manga" :raw-data="manga"
    />
    <div v-if="manga.length > 0" class="shelf">
      <CardManga
        v-for="item in manga" :key="item.title"
        :manga="item"
      />
    </div>
    <h2 v-if="books.length > 0">
      {{ $t('ranobe') }}
    </h2>
    <SortingComponent
      v-if="books.length > 0"
      v-model="books" :raw-data="books"
    />
    <div v-if="books.length > 0" class="shelf">
      <CardRanobe
        v-for="item in books" :key="item.title"
        :ranobe="item"
      />
    </div>
  </main>
</template>
