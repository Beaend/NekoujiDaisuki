<script setup lang="ts">
import Api from '~/services/ApiCall.ts'

defineOptions({
  name: 'MangaPage',
})

const { t } = useI18n()

const manga = ref([])
const manhwa = ref([])
const manhua = ref([])

function getManga() {
  Api.getAllManga()
    .then((response) => {
      for (let i = 0; i < response.data.length; i++) {
        if (response.data[i].type === 'Манга')
          manga.value.push(response.data[i])
        else if (response.data[i].type === 'Корейская Манхва')
          manhwa.value.push(response.data[i])
        else if (response.data[i].type === 'Китайская Маньхуа')
          manhua.value.push(response.data[i])
      }
    })
}

onMounted(() => {
  getManga()
})
</script>

<template>
  <main>
    <h2>{{ t('comics.manga') }}</h2>
    <div v-if="manga.length < 1" class="shelf">
      <CardBlank v-for="l in [1, 2, 3]" :key="l" />
    </div>
    <div id="manga" class="shelf">
      <CardManga v-for="item in manga" :key="item.id" :manga="item" />
    </div>
    <br>
    <h2>{{ t('comics.manhua') }}</h2>
    <div id="manhua" class="shelf">
      <CardManga v-for="item in manhua" :key="item.id" :manga="item" />
    </div>
    <br>
    <h2>{{ t('comics.manhwa') }}</h2>
    <div id="manhwa" class="shelf">
      <CardManga v-for="item in manhwa" :key="item.id" :manga="item" />
    </div>
  </main>
</template>
