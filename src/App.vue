<script setup lang="ts">
// https://github.com/vueuse/head
// you can use this to manipulate the document head in any components,
// they will be rendered correctly in the html results with vite-ssg
import { displayStore } from '~/stores/display'

const display = displayStore()

onMounted(() => {
  setWindowStoreSizeValue()
  window.addEventListener('resize', () => {
    setWindowStoreSizeValue()
  })
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0
  if (isTouchDevice) {
    display.isTouch = true
    document.addEventListener('touchstart', clickToShowBlock)
  }
  else {
    document.addEventListener('mousemove', moveBlock)
  }
})

function setWindowStoreSizeValue(): void {
  display.window.width = window.innerWidth
  display.window.height = window.innerHeight
}

function moveBlock(event) {
  display.mousePosition[0] = event.clientX
  display.mousePosition[1] = event.clientY
}
function clickToShowBlock(event) {
  display.mousePosition[0] = event.touches[0].clientX
  display.mousePosition[1] = event.touches[0].clientY
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
  <SettingsWindow />
</template>
