<script setup lang="ts">
import { onMounted } from 'vue-demi'
import Api from '~/services/ApiCall.js'

defineOptions({
  name: 'SearchPage',
})

const route = useRoute()

const anime = ref([])
const manga = ref([])
const books = ref([])

function getList(value) {
  Api.search(value)
    .then((response) => {
      anime.value = response.data.anime
      manga.value = response.data.manga
      books.value = response.data.books
    })
    .catch((e) => {
      console.log(e)
    })
}

onMounted(() => {
  getList(route.params.searchValue)
})
onBeforeRouteUpdate(async (to, from) => {
  if (to.params.searchValue !== from.params.searchValue) {
    getList(to.params.searchValue)
  }
})
</script>

<template>
  <main>
    <h1>{{ $t('search') }}: {{ route.params.searchValue }}</h1>
    <h2 v-if="anime.length > 0">Аниме</h2>
    <div v-if="anime.length > 0" class="shelf">
      <CardAnime
        v-for="item in anime" :key="item.title"
        :anime="item"
      />
    </div>
    <h2 v-if="manga.length > 0">Манга</h2>
    <div v-if="manga.length > 0" class="shelf">
      <CardManga
        v-for="item in manga" :key="item.title"
        :manga="item"
      />
    </div>
    <h2 v-if="books.length > 0">Ранобе</h2>
    <div v-if="books.length > 0" class="shelf">
      <CardRanobe
        v-for="item in books" :key="item.title"
        :ranobe="item"
      />
    </div>
  </main>
</template>
