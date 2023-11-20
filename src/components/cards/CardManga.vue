<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { displayStore } from '~/stores/display'

interface mangaData {
  [index: string]: any
}

const props = defineProps<{
  manga: mangaData
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
  navigator.clipboard.writeText(props.manga.title)
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
  <article class="card manga" :class="[manga.color, manga.type]">
    <div v-if="overMouseText" :style="followBlock" class="followBlock">
      {{ overMouseText }}
    </div>
    <div class="card-left">
      <div class="image" :style="`background-image: url(${manga.image})`">
        <div class="quality" :class="{ over: overQuality }" @mouseover="overQuality = true" @mouseleave="overQuality = false">
          <div class="quality-icon">
            <FontAwesomeIcon icon="fa-solid fa-calendar" class="quality-color" />
          </div>
          <div class="quality-description">
            <div class="quality-line quality-bg" />
            {{ t('quality.text') }}: {{ t(`quality.anime.${manga.color}`) }}
            <br>
            {{ t('anime-type.text') }}: {{ t(`comics.${manga.type.toLowerCase()}`) }}
            <div v-if="manga.urls" class="urls">
              <a v-if="manga.urls.myanimelist" :href="manga.urls.myanimelist" title="MyAnimeList">
                <img src="/img/myanimelist.png" alt="MyAnimeList">
              </a>
            </div>
          </div>
        </div>
        <div class="texts">
          <span v-if="manga.tag">
            <router-link :to="`/tag/${manga.tag}`" class="tag"> {{ manga.tag }} </router-link>
          </span>
          <span @click="copyTitle()">{{ manga.title }}</span>
        </div>
      </div>
    </div>
    <div class="card-right">
      <div v-if="manga.title_ru" class="right-head">
        {{ manga.title_ru }}
      </div>
      <div class="right-body">
        <div class="description">
          <p v-for="line in manga.description" :key="line.length">
            {{ line }}
          </p>
        </div>
        <div v-if="manga.comment" class="comment">
          <p v-for="line in manga.comment" :key="line.length">
            {{ line }}
          </p>
        </div>
        <div class="space"/>
        <hr>
        <div class="eth">
          <div class="duration">
            {{ manga.chapters }}
            <div class="tooltip">Количество глав</div>
          </div>
          <div class="isEnded">
            {{ manga.is_ended ? "Законченно" : "Продолжается" }}
            <div class="tooltip">Выпуск</div>
          </div>
        </div>
      </div>
      <div class="right-footer">
        <span v-for="genre in manga.genres[0]" :key="genre.id" class="genre" :class="`genre-${genre.id}`">
          <router-link :to="`/anime/genre/${genre.id}`">{{ genre[$i18n.locale] }}</router-link>
        </span>
        <span v-for="genre in manga.genres[1]" :key="genre.id" class="sub-genre" :class="`genre-${genre.id}`">
          <router-link :to="`/anime/genre/${genre.id}`">{{ genre[$i18n.locale] }}</router-link>
        </span>
      </div>
    </div>
  </article>
</template>
