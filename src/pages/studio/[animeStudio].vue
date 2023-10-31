<script setup lang="ts">
import Sorting from '~/components/Sorting.vue'
import Api from '~/services/ApiCall.js'
import { userCookies } from '~/stores/cookies'

defineOptions({
  name: 'StudioPage',
})

const route = useRoute()

const anime = ref([])
const cookies = userCookies()

function getList(name) {
  Api.studio(name)
    .then((response) => {
      anime.value = response.data
    })
}

onBeforeMount(() => {
  getList(route.params.animeStudio)
})
onBeforeRouteUpdate(async (to, from) => {
  if (to.params.animeStudio !== from.params.animeStudio)
    getList(to.params.animeStudio)
})
</script>

<template>
  <main>
    <h1>{{ $t('studio') }}: {{ route.params.animeStudio }}</h1>
    <Sorting
      v-if="anime.length > 0"
      v-model="anime" :raw-data="anime" :settings="cookies.sorting.index"
    />
    <div v-if="anime.length > 0" class="shelf">
      <CardAnime
        v-for="item in anime" :key="item.title"
        :anime="item"
      />
    </div>
  </main>
</template>
