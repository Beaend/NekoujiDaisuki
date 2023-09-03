<script>
import Api from '~/services/ApiCall.js'

export default {
  name: 'Search',
  data() {
    return {
      anime: [],
      manga: [],
      books: [],
    }
  },
  mounted() {
    this.getList(this.$route.params.value)
    // this.formatSeasons()
  },
  methods: {
    getList(value) {
      Api.search(value)
        .then((response) => {
          this.anime = response.data.anime
          this.manga = response.data.manga
          this.books = response.data.books
        })
        .catch((e) => {
          console.log(e)
        })
    },
  },
}
</script>

<template>
  <main>
    <h1>Поиск: {{ $route.params.value }}</h1>
    <h2 v-if="anime">Аниме</h2>
    {{anime}}
    <h2 v-if="manga">Манга</h2>
    {{manga}}
    <h2 v-if="books">Ранобе</h2>
    {{books}}
  </main>
</template>

<style scoped>
  h1 {
    color: rgb(223, 223, 223);
    font-size: 1.8em;
    font-weight: 500;
  }
</style>
