<script setup lang="ts">
import Api from '~/services/ApiCall.ts'
import { Sorting } from '~/services/Sorting.ts'

defineOptions({
  name: 'PageAnimeBest',
})

const { t } = useI18n()

const anime = ref(null)
const loading = ref(true)
const now = ref('tv')

function getAnime() {
  Api.getAnimeBest()
    .then((response) => {
      anime.value = response.data
      const sort = new Sorting(anime.value)
      sort.byName('title')
      sort.byYear(true)
    })
}

async function floading() {
  await new Promise(resolve => setTimeout(resolve, 500))
  loading.value = false
}
onBeforeMount(async () => {
  await getAnime()
  await floading()
})
</script>

<template>
  <main>
    <h1>{{ t('anime') }}</h1>
    <div class="select-type">
      <div class="menu">
        <span class="type-button" :class="[{ active: now === 'tv' }]" @click="now = 'tv'">
          {{ t("anime-type.tv-s") }}
        </span>
        <span class="type-button" :class="[{ active: now === 'film' }]" @click="now = 'film'">
          {{ t("anime-type.film-s") }}
        </span>
      </div>
    </div>
    <div v-show="loading" class="shelf">
      <CardBlank v-for="l in [1, 2, 3]" :key="l" />
    </div>
    <template v-if="now === 'tv'">
      <div v-if="anime && !loading" class="shelf">
        <template v-for="item in anime">
          <CardAnime v-if="item.type.toLowerCase() === 'tv'" :key="item.id" :anime="item" />
        </template>
      </div>
    </template>
    <template v-if="now === 'film'">
      <div v-if="anime && !loading" class="shelf">
        <template v-for="item in anime">
          <CardAnime v-if="item.type.toLowerCase() === 'film'" :key="item.id" :anime="item" />
        </template>
      </div>
    </template>
  </main>
</template>

<style scoped>
h1 {
  color: var(--gold);
}

.select-type {
  margin: 0 0 12px;
}
.menu {
  background: var(--bar_bg);
  display: flex;
  justify-content: center;
  height: 50px;
  border-radius: 5px;
  width: fit-content;
  margin: auto;
  font-size: .8em;
  color: var(--bar_color);
}
.type-button {
  display: flex;
  flex-direction: column;
  cursor: pointer;
  margin: 0 2px;
  font-size: 24px;
  font-weight: bold;
  line-height: 40px;
  padding: 5px 12px;
}
.type-button:hover {
  color: white;
}
.type-button.active {
  color: var(--blue);
  cursor: default;
}
/* Анимации появления и исчезновения могут иметь */
/* различные продолжительности и динамику.       */
.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
  /* .slide-fade-leave-active до версии 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
</style>

<route lang="yaml">
meta:
  layout: home
</route>
