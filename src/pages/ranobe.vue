<script setup lang="ts">
import Api from '~/services/ApiCall.ts'
import { Sorting } from '~/services/Sorting'
import { displayStore } from '~/stores/display'

defineOptions({
  name: 'RanobePage',
})

const { t } = useI18n()
const display = displayStore()

const books = ref(null)
const genres = ref([])
const booksGenres = ref({})
const selectedGenre = ref(0)

async function getBooks() {
  await Api.getAllBooks()
    .then((response) => {
      books.value = response.data
    })
  await Api.getGenres()
    .then((response) => {
      genres.value = response.data
    })
  const sort = new Sorting(books.value)
  sort.byName('title')
  sort.byQuality()
}

function setGenresList() {
  const genresCount = {}
  books.value.forEach((book) => {
    book.genres[0].forEach((genre) => {
      if (genresCount[genre.id])
        genresCount[genre.id]++
      else
        genresCount[genre.id] = 1
    })
  })

  let sortedGenres = Object.entries(genresCount).sort((a, b) => b[1] - a[1])
  const ignoredGenresId = [1, 2, 4, 12]
  sortedGenres = sortedGenres.filter(g => !ignoredGenresId.includes(Number(g[0])))
  const topGenres = sortedGenres.slice(0, 5).map(genre => genre[0])
  topGenres.forEach((genre) => {
    booksGenres.value[genre] = books.value.filter(book => book.genres[0].some(g => g.id === Number(genre)))
  })
}

onMounted(async () => {
  await getBooks()
  setGenresList()
})
</script>

<template>
  <main>
    <h2>{{ t('ranobe') }}</h2>
    <div v-if="booksGenres && genres.length > 0 && display.window.width >= 1280" class="select-from-best-genres">
      <span
        class="genre-button" :class="[{ active: selectedGenre === 0 }]"
        @click="selectedGenre = 0"
      >
        All
      </span>
      <span class="genre-split">
        <span
          class="genre-button" :class="[{ active: selectedGenre === 1 }]"
          @click="selectedGenre = 1"
        >
          {{ (genres.find(genre => genre.id === 1))[$i18n.locale] }}
        </span>
        <span
          class="genre-button" :class="[{ active: selectedGenre === 2 }]"
          @click="selectedGenre = 2"
        >
          {{ (genres.find(genre => genre.id === 2))[$i18n.locale] }}
        </span>
      </span>
      <span class="genre-split">
        <span
          class="genre-button" :class="[{ active: selectedGenre === 4 }]"
          @click="selectedGenre = 4"
        >
          {{ (genres.find(genre => genre.id === 4))[$i18n.locale] }}
        </span>
        <span
          class="genre-button" :class="[{ active: selectedGenre === 12 }]"
          @click="selectedGenre = 12"
        >
          {{ (genres.find(genre => genre.id === 12))[$i18n.locale] }}
        </span>
      </span>
      <span
        v-for="(i) in Object.keys(booksGenres)" :key="i"
        class="genre-button" :class="[{ active: selectedGenre === Number(i) }]"
        @click="selectedGenre = Number(i)"
      >
        {{ (genres.find(genre => genre.id === Number(i)))[$i18n.locale] }}
      </span>
    </div>
    <div v-if="!books" class="shelf">
      <CardBlank v-for="l in [1, 2, 3]" :key="l" />
    </div>
    <div v-if="books && selectedGenre === 0" id="ranobe" class="shelf">
      <CardRanobe v-for="item in books" :key="item.id" :ranobe="item" />
    </div>
    <div v-if="selectedGenre !== 0" id="ranobe" class="shelf">
      <CardRanobe v-for="item in booksGenres[selectedGenre]" :key="item.id" :ranobe="item" />
    </div>
  </main>
</template>

<style>
.select-from-best-genres {
  margin: 0 0 12px;
  display: flex;
  justify-content: center;
  user-select: none;
  align-items: center;
  flex-wrap: wrap;
}
.genre-button {
  background: var(--bar_bg);
  color: var(--bar_color);
  border-radius: 5px;
  margin: 5px 3px;
  padding: 4px 8px;
  font-size: .8em;
  display: flex;
  flex-direction: column;
  cursor: pointer;
}
.genre-button:hover {
  color: white;
}
.genre-button.active {
  color: var(--blue);
  cursor: default;
}
</style>
