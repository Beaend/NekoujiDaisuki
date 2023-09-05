<script setup lang="ts">
// https://github.com/vueuse/head
// you can use this to manipulate the document head in any components,
// they will be rendered correctly in the html results with vite-ssg
import { windowStore } from '~/stores/window'

const siteWindow = windowStore()

onMounted(() => {
  setWindowStoreSizeValue()
  window.addEventListener('resize', () => {
    setWindowStoreSizeValue()
  })
})

function setWindowStoreSizeValue(): void {
  siteWindow.screenSize.width = window.innerWidth
  siteWindow.screenSize.height = window.innerHeight
}

useHead({
  title: 'Nekouji Daisuki',
  meta: [
    { name: 'description', content: 'Nekouji Daisuki site' },
    {
      name: 'theme-color',
      content: () => isDark.value ? '#00aba9' : '#ffffff',
    },
  ],
  link: [
    {
      rel: 'icon',
      type: 'image/svg+xml',
      href: () => preferredDark.value ? '/favicon-dark.svg' : '/favicon.svg',
    },
  ],
})
</script>

<template>
  <TheBar />
  <RouterView />
</template>
