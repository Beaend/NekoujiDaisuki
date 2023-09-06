<script setup lang="ts">
import Api from '~/services/ApiCall.js'

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

onMounted(() => {
  getYear()
  getCurrentSeason()
  getAnime()
})
</script>

<template>
  <main>
    <h2>{{ t(`season.${season}`) }} {{year}}</h2>
    <div class="shelf">
      <CardAnime v-for="item in anime" :key="item.id" :anime="item" />
    </div>
  </main>
</template>

<route lang="yaml">
meta:
  layout: home
</route>
