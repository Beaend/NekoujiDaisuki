<script setup lang="ts">
import Sorting from '~/components/Sorting.vue'
import Api from '~/services/ApiCall.js'
import { userCookies } from '~/stores/cookies'

defineOptions({
  name: 'IndexPage',
})

const { t } = useI18n()

const anime = ref([])
const year = ref(0)
const season = ref(0)
const refind = ref(true)

function getYear() {
  year.value = new Date().getFullYear()
}
function getCurrentSeason() {
  const mm = new Date().getMonth() + 1
  if (mm < 4)
    season.value = 1
  else if (mm < 7)
    season.value = 2
  else if (mm < 10)
    season.value = 3
  else
    season.value = 4
}
function getAnime() {
  Api.getYear(year.value)
    .then((response) => {
      for (let i = 0; i < response.data.length; i++) {
        if (response.data[i].season === season.value) {
          anime.value.push(response.data[i])
          refind.value = false
        }
      }
      if (refind.value) {
        if (season.value > 1) {
          season.value = season.value - 1
        }
        else {
          season.value = 4
          year.value = year.value - 1
        }
        getAnime()
      }
    })
}

onBeforeMount(() => {
  getYear()
  getCurrentSeason()
  getAnime()
})

const cookies = userCookies()
</script>

<template>
  <main>
    <Sorting
      v-if="anime.length > 1"
      v-model="anime" :raw-data="anime" :settings="cookies.sorting.index"
      :hide-years="true"
    />
    <h2>{{ t(`season.${season}`) }} {{ year }}</h2>
    <div v-if="anime.length < 1" class="shelf">
      <CardBlank v-for="l in [1, 2, 3]" :key="l" />
    </div>
    <div class="shelf">
      <CardAnime v-for="item in anime" :key="item.id" :anime="item" />
    </div>
  </main>
</template>

<route lang="yaml">
meta:
  layout: home
</route>
