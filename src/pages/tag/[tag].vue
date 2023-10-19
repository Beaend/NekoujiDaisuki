<script setup lang="ts">
import Sorting from '~/components/Sorting.vue'
import Api from '~/services/ApiCall.js'
import { userCookies } from '~/stores/cookies'

defineOptions({
  name: 'TagPage',
})

const route = useRoute()

const anime = ref([])
const manga = ref([])
const books = ref([])
const cookies = userCookies()

function getList(value) {
  Api.tag(value)
    .then((response) => {
      anime.value = response.data.anime
      manga.value = response.data.manga
      books.value = response.data.books
    })
}

onBeforeMount(() => {
  getList(route.params.tag)
})
</script>

<template>
  <main>
    <h1>{{ $t('tag') }}: {{ route.params.tag }}</h1>
    <h2 v-if="anime.length > 0">
      {{ $t('anime') }}
    </h2>
    <Sorting
      v-if="anime.length > 0"
      v-model="anime" :raw-data="anime" :settings="cookies.sorting.index"
      :hide-years="true"
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
    <Sorting
      v-if="manga.length > 0"
      v-model="manga" :raw-data="manga" :settings="cookies.sorting.index"
      :hide-years="true"
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
    <Sorting
      v-if="books.length > 0"
      v-model="books" :raw-data="books" :settings="cookies.sorting.index"
      :hide-years="true"
    />
    <div v-if="books.length > 0" class="shelf">
      <CardRanobe
        v-for="item in books" :key="item.title"
        :ranobe="item"
      />
    </div>
  </main>
</template>
