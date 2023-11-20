<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { displayStore } from '~/stores/display'

interface booksData {
  [index: string]: any
}

const props = defineProps<{
  ranobe: booksData
}>()
const { t } = useI18n()
const display = displayStore()

const overQuality = ref(false)
const overMouseText = ref('')

const followBlock = reactive({
  display: 'block',
  left: '0px',
  top: '0px',
})

function copyTitle() {
  navigator.clipboard.writeText(props.ranobe.title)
  overMouseText.value = 'Название скопировано'
  followBlock.left = `${display.mousePosition[0] + (display.isTouch ? 0 : 30)}px`
  followBlock.top = `${display.mousePosition[1]}px`
  function removeOverMouseText() {
    overMouseText.value = ''
  }
  setTimeout(removeOverMouseText, 1500)
}
</script>

<template>
  <article class="card book ranobe" :class="ranobe.color">
    <div v-if="overMouseText" :style="followBlock" class="followBlock">
      {{ overMouseText }}
    </div>
    <div class="card-left">
      <div class="image" :style="`background-image: url(${ranobe.image})`">
        <div class="quality" :class="{ over: overQuality }" @mouseover="overQuality = true" @mouseleave="overQuality = false">
          <div class="quality-icon">
            <FontAwesomeIcon icon="fa-solid fa-calendar" class="quality-color" />
          </div>
          <div class="quality-description">
            <div class="quality-line quality-bg" />
            {{ t('quality.text') }}: {{ t(`quality.ranobe.${ranobe.color}`) }}
            <div v-if="ranobe.urls" class="urls">
              <a v-if="ranobe.urls.myanimelist" :href="ranobe.urls.myanimelist" title="MyAnimeList"><img src="/img/myanimelist.png" alt="MyAnimeList"></a>
            </div>
          </div>
        </div>
        <div class="texts">
          <span v-if="ranobe.tag">
            <router-link :to="`/tag/${ranobe.tag}`" class="tag"> {{ ranobe.tag }} </router-link>
          </span>
          <span @click="copyTitle()">{{ ranobe.title }}</span>
        </div>
      </div>
    </div>
    <div class="card-right">
      <div v-if="ranobe.title_ru" class="right-head">
        {{ ranobe.title_ru }}
      </div>
      <div class="right-body">
        <div class="description">
          <p v-for="line in ranobe.description" :key="line.length">
            {{ line }}
          </p>
        </div>
        <div v-if="ranobe.comment" class="comment">
          <p v-for="line in ranobe.comment" :key="line.length">
            {{ line }}
          </p>
        </div>
        <div class="space"/>
        <hr>
        <div class="eth">
          <div class="duration">
            {{ ranobe.volumes }}
            <div class="tooltip">Количество томов/глав</div>
          </div>
          <div class="isEnded">
            {{ ranobe.is_ended ? "Законченно" : "Продолжается" }}
            <div class="tooltip">Выпуск</div>
          </div>
        </div>
      </div>
      <div class="right-footer">
        <span v-for="genre in ranobe.genres[0]" :key="genre.id" class="genre" :class="`genre-${genre.id}`">
          <router-link :to="`/anime/genre/${genre.id}`">{{ genre[$i18n.locale] }}</router-link>
        </span>
        <span v-for="genre in ranobe.genres[1]" :key="genre.id" class="sub-genre" :class="`genre-${genre.id}`">
          <router-link :to="`/anime/genre/${genre.id}`">{{ genre[$i18n.locale] }}</router-link>
        </span>
      </div>
    </div>
  </article>
</template>
