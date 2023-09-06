<script setup lang="ts">
import { onMounted } from 'vue-demi'
import Api from '~/services/ApiCall.js'

defineOptions({
  name: 'AnimeByYear',
})

const { t } = useI18n()
const route = useRoute()

const anime = ref(null)
const winter = ref([])
const spring = ref([])
const summer = ref([])
const fall = ref([])

onMounted(() => {
  getAnimeByYear(route.params.year)
})

function getAnimeByYear(year) {
  Api.getYear(year)
    .then((response) => {
      anime.value = response.data
      for (let i = 0; i < response.data.length; i++) {
        if (response.data[i].season === 1) {
          winter.value.push(response.data[i])
        }
        else if (response.data[i].season === 2) {
          spring.value.push(response.data[i])
        }
        else if (response.data[i].season === 3) {
          summer.value.push(response.data[i])
        }
        else if (response.data[i].season === 4) {
          fall.value.push(response.data[i])
        }
      }
    })
    .catch((e) => {
      console.log(e)
    })
}
</script>

<template>
  <main>
    <h1>{{ route.params.year }}</h1>
    <h2 v-if="winter.length > 0">{{ t('season.1') }}</h2>
    <div v-if="winter.length > 0" class="shelf winter">
      <CardAnime
        v-for="item in winter" :key="item.title"
        :anime="item"
      />
    </div>
    <h2 v-if="spring.length > 0">{{ t('season.2') }}</h2>
    <div v-if="spring.length > 0" class="shelf spring">
      <CardAnime
        v-for="item in spring" :key="item.title"
        :anime="item"
      />
    </div>
    <h2 v-if="summer.length > 0">{{ t('season.3') }}</h2>
    <div v-if="summer.length > 0" class="shelf summer">
      <CardAnime
        v-for="item in summer" :key="item.title"
        :anime="item"
      />
    </div>
    <h2 v-if="fall.length > 0">{{ t('season.4') }}</h2>
    <div v-if="fall.length > 0" class="shelf fall">
      <CardAnime
        v-for="item in fall" :key="item.title"
        :anime="item"
      />
    </div>
  </main>
</template>
