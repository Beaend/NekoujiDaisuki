<script setup lang="ts">
import Api from '~/services/ApiCall.js'

defineOptions({
  name: 'RanobePage',
})

const { t } = useI18n()

const books = ref([])

function getBooks() {
  Api.getAllBooks()
    .then((response) => {
      books.value = response.data
    })
}

onMounted(() => {
  getBooks()
})
</script>

<template>
  <main>
    <h2>{{ t('ranobe') }}</h2>
    <div id="ranobe" class="shelf">
      <CardRanobe v-for="item in books" :key="item.id" :ranobe="item" />
    </div>
  </main>
</template>