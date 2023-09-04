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
    <h1>Поиск: {{ route.params.searchValue }}</h1>
    <h2 v-if="anime.length > 0">Аниме</h2>
    <template v-if="anime.length > 0">
      <template v-for="item in anime">
        {{ item.title }}
      </template>
    </template>
    <h2 v-if="manga.length > 0">Манга</h2>
    <template v-if="manga.length > 0">
      <template  v-for="item in manga">
        {{ item.title }}
      </template>
    </template>
    <h2 v-if="books.length > 0">Ранобе</h2>
    <template v-if="books.length > 0">
      <template  v-for="item in books">
        {{ item.title }}
      </template>
    </template>
  </main>
</template>

<style scoped>
  h1 {
    color: rgb(223, 223, 223);
    font-size: 1.8em;
    font-weight: 500;
  }
</style>
