<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { displayStore } from '~/stores/display'
import { userCookies } from '~/stores/cookies'

interface animeData {
  [index: string]: any
}

const props = defineProps<{
  anime: animeData
}>()

const { t } = useI18n()
const display = displayStore()
const cookies = userCookies()

const titleUrl = ref(null)
const overQuality = ref(false)
const overMouseText = ref('')

function getTitleUrl() {
  if (cookies.baseAnimeUrlSite)
    titleUrl.value = props.anime.urls[cookies.baseAnimeUrlSite] || null
}

const followBlock = reactive({
  display: 'block',
  left: '0px',
  top: '0px',
})

function copyTitle() {
  navigator.clipboard.writeText(props.anime.title)
  overMouseText.value = 'Название скопировано'
  followBlock.left = `${display.mousePosition[0] + (display.isTouch ? 0 : 30)}px`
  followBlock.top = `${display.mousePosition[1]}px`
  function removeOverMouseText() {
    overMouseText.value = ''
  }
  setTimeout(removeOverMouseText, 1500)
}

onBeforeMount(() => {
  getTitleUrl()
})
</script>

<template>
  <article
    class="card anime" :class="[anime.color, anime.type, { hidden: !anime.show }]"
    :anime-id="anime.id"
    @mouseover="display.backgroundUrl = anime.image"
    @mouseleave="display.backgroundUrl = null"
  >
    <div v-if="overMouseText" :style="followBlock" class="followBlock">{{ overMouseText }}</div>
    <div class="card-left">
      <div class="image" :style="`background-image: url(${anime.image})`">
        <div class="quality" :class="{ over: overQuality }" @mouseover="overQuality = true" @mouseleave="overQuality = false">
          <div class="quality-icon">
            <FontAwesomeIcon icon="fa-solid fa-calendar" class="quality-color" />
          </div>
          <div class="quality-description">
            <div class="quality-line quality-bg" />
            {{ t('quality.text') }}: {{ t(`quality.anime.${anime.color}`) }}
            <br>
            {{ t('anime-type.text') }}: {{ t(`anime-type.${anime.type.toLowerCase()}`) }}
            <div v-if="anime.urls" class="urls">
              <a v-if="anime.urls.myanimelist" :href="anime.urls.myanimelist" title="MyAnimeList"><img src="/img/myanimelist.png" alt="MyAnimeList"></a>
            </div>
          </div>
        </div>
        <div class="texts">
          <span v-if="anime.tag">
            <router-link :to="`/tag/${anime.tag}`" class="tag"> {{ anime.tag }} </router-link>
          </span>
          <span>
            <a v-if="titleUrl" :href="anime.urls.myanimelist" target="_blank" class="title">{{ anime.title }}</a>
            <span v-else @click="copyTitle()">{{ anime.title }}</span>
          </span>
          <span class="studios">
            <template v-for="(studio, index) in anime.studios" :key="studio">
              <router-link :to="`/studio/${studio}`">{{ studio }}</router-link>
              <template v-if="index !== Object.keys(anime.studios).length - 1">, </template>
            </template>
          </span>
        </div>
      </div>
    </div>
    <div class="card-right">
      <div v-if="anime.title_ru" class="right-head">
        {{ anime.title_ru }}
      </div>
      <div class="right-body">
        <div class="description">
          <p v-for="line in anime.description" :key="line.length">
            {{ line }}
          </p>
        </div>
        <div v-if="anime.comment" class="comment">
          <p v-for="line in anime.comment" :key="line.length">
            {{ line }}
          </p>
        </div>
        <div class="space"/>
        <hr>
        <div class="eth">
          <div class="source">
            {{ anime.original }}
            <div class="tooltip">Оригинал</div>
          </div>
          <div class="duration">
            {{ anime.episodes }}
            <div class="tooltip">Количество серий</div>
          </div>
          <div class="season">
            <template v-if="anime.season > 0 && anime.season <= 4">
              {{ t(`season.${anime.season}`) }}
            </template>
            {{ anime.year }}
            <div class="tooltip">Год [и сезон] начала</div>
          </div>
        </div>
      </div>
      <hr>
      <div class="right-footer">
        <span v-for="genre in anime.genres[0]" :key="genre.id" class="genre" :class="`genre-${genre.id}`">
          <router-link :to="`/anime/genre/${genre.id}`">{{ genre[$i18n.locale] }}</router-link>
        </span>
        <span v-for="genre in anime.genres[1]" :key="genre.id" class="sub-genre" :class="`genre-${genre.id}`">
          <router-link :to="`/anime/genre/${genre.id}`">{{ genre[$i18n.locale] }}</router-link>
        </span>
      </div>
    </div>
  </article>
</template>

<style lang="scss">
  $item_bg: linear-gradient(45deg, #1f2327, #2f3337);
  $item_border: #1f2123;
  $item_hr: rgb(39,41,43);
  $item_color: rgb(143,161,179);
  $item_color_sub: rgb(122,138,153);
  $item_color_strong: rgb(163,184,204);
  $height: 265px;
  $image_width: 185px;

  .quality-color {color: rgb(143,161,179);}
  .green .quality-color {color: #1dff1d;}
  .lblue .quality-color{color: rgb(63,191,256);}
  .gold .quality-color {color: #FFD700;}

  .green .quality-bg {background: #1dff1d;}
  .lblue .quality-bg {background: rgb(63,191,256);}
  .gold .quality-bg {background: #FFD700;}

  .card {
    font-size: 1.2rem;
    height: $height;
    margin: 15px 10px 10px 15px;
    width: 465px;
    flex: 0 0 auto;
    display: flex;
    box-shadow: 0 4px 6px rgba(49,54,68,.05), 0 5px 20px rgba(49,54,68,.08);
    border-radius: 4px;
  }
  .card:hover {
    box-shadow: 0 4px 6px rgba(49,54,68,.09),0 10px 40px rgba(49,54,68,.3);
  }
  @media screen and (min-width: 801px) {
    .card{
      flex-grow: 1;
      max-width: 740px;
    }
    .card-right {
      flex-grow: 1;
    }
  }
  @media screen and (min-width: 1280px) {
    .card{
      flex-grow: 1;
      max-width: 555px;
    }
  }

  .card-left {
    display: inline-block;
    height: 100%;
    width: 185px;
    position: relative;
    flex-shrink: 0;
  }

  .card-left .image {
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
    display: inline-block;
    height: 100%;
    width: 100%;
    position: relative;
    border-radius: 4px 0 0 4px;
  }
  .card-left .quality {
    position: absolute;
    left: 5px;
    top: 5px;
    background: $item_bg;
    width: 30px;
    height: 30px;
    border-radius: 5px;
    padding: 5px;
    color: $item_color;
    transition: width 50ms;
    cursor: default;
    svg {
      width: 20px;
      height: 20px;
      vertical-align: .125em;
    }
    .quality-description {
      display: none;
      min-height: 20px;
      .quality-line {
        width: 30px;
        transition: width 50ms;
      }
      .urls {
        margin: 5px auto;
        img {
          margin: 0 5px;
          height: 20px;
        }
      }
    }
  }
  .card-left .quality.over {
    width: 175px;
    height: auto;
    .quality-icon {
      display: none;
    }
    .quality-description {
      display: flex;
      flex-direction: column;
      font-size: .9rem;
      .quality-line {
        width: 175px;
        height: 5px;
        margin: -5px -5px 0;
        border-radius: 5px 5px 0 0;
      }
    }
  }
  .card-left .texts {
    background: rgba(0,0,0,0.6);
    bottom: 0;
    color: white;
    font-size: 1rem;
    font-weight: 600;
    height: auto;
    overflow: hidden;
    padding: 8px 12px;
    position: absolute;
    text-align: left;
    width: 100%;
    display: flex;
    flex-direction: column;
    line-height: 1.2rem;
    cursor: default;
    .tag {
      color: rgb(255, 255, 159);
      transition: color .2s;
    }
    .tag:hover {
      color: rgb(255,223,0);
    }
    .title {
      transition: color .2s;
      font-size: 1.1rem;
    }
    .title:hover {
      color: var(--blue);
    }
    .studios {
      font-size: .8rem;
      a {
        transition: color .2s;
        color: #62bfff;
      }
      a:hover {
        color: var(--blue-active)
      }
    }
  }
  .card-right {
    display: flex;
    flex-direction: column;
    font-size: 0.9rem;
    height: 100%;
    overflow: hidden;
    position: relative;
    width: 280px;
    color: $item_color;
    background: linear-gradient(45deg, rgb(31,35,39), rgb(47,51,55));
    border-radius: 0 4px 4px 0;
  }
  .card-right hr {
    border: none;
    background: $item_hr;
    height: 1px;
  }
  .card-right .right-head {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    font-size: 1rem;
    padding: 2px 5px;
    font-weight: bold;
    border-bottom: 1px solid $item_hr;
    color: $item_color_strong;
    cursor: default;
  }
  .card-right .right-body {
    padding: 3px 5px;
    text-align: left;
    width: 100%;
    box-sizing: border-box;
    overflow-x: hidden;
    overflow-y: auto;
    flex: 1;
    font-size: 0.9rem;
    color: $item_color_sub;
    cursor: default;
    user-select: none;
    display: flex;
    flex-direction: column;
    .space {
      flex-grow: 1;
    }
    .description {
      transition: color 0.1s;
    }
    .comment {
      margin-left: -4px;
      border-left: 3px var(--bar_color_hide) solid;
      padding-left: 3px;
      transition: color 0.1s;
    }
    .description:hover,
    .comment:hover {
      color: $item_color;
    }
    .eth {
      display: flex;
      justify-content: space-evenly;
      .source, .duration, .author, .season, .isEnded {
        position: relative;
        padding: 4px;
        text-align: center;
        cursor: help;
        font-weight: bold;
      }
    }
  }
  .card .tooltip {
    width: 100px;
    background-color: black;
    color: #fff;
    text-align: center;
    border-radius: 6px;
    padding: 5px 0;

    position: absolute;
    z-index: 1;
    bottom: 100%;
    left: 50%;
    margin-left: -50px;
    display: none;
  }
  .eth *:hover .tooltip{
    display: block;
  }
  .card-right .right-footer {
    bottom: 0;
    padding: 0 5px;
    width: 100%;
    color: rgb(191,191,191);
    border-top: solid 1px rgb(31,33,35);
    background: rgb(31,35,39);
    font-size: 0.8rem;
    cursor: default;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    max-height: 29px;
    transition: max-height ease 500ms;
  }
  .card-right .right-footer:hover {
    max-height: $height;
  }
  .card-right .right-footer span {
    margin: 2px 4px;
    padding: 2px 8px;
    border-radius: 4px;
    height: 24px;
    line-height: 20px;
  }
  // for tiny mobile
  @media only screen and (max-width: 380px) {
    .card {
      width: 100%;
      height: 230px;
      margin: 10px 0;
    }
    .card-left {
      width: 150px;
    }
  }
  // for mobile
  @media only screen and (min-width: 381px) and (max-width: 480px) {
    .card {
      width: 100%;
      max-width: 480px;
      height: 230px;
      margin: 10px 5px;
    }
    .card-left {
      width: 150px;
    }
    .card-right {
      flex-grow: 1;
    }
  }
  // for tablet
  @media screen and (min-width: 481px) and (max-width: 800px) {
    .card {
      width: 100%;
      max-width: 750px;
      margin: 15px;
    }
    .card-right {
      flex-grow: 1;
    }
  }
  .genre {
    background: rgb(31,48,63);
  }
  .genre:hover, .sub-genre:hover {
    box-shadow: 1px 1px 4px 0 rgba(127,159,191,.5);
  }
  .sub-genre {
    background: rgb(24,27,31);
  }
  .genre.genre-1 {
    background: rgb(191,255,191);
    color: black;
  }
  .genre.genre-2 {
    background: rgb(191, 223, 223);
    color: black;
  }
  .genre.genre-3 {
    background: rgb(223, 223, 63);
    color: black;
  }
  .genre.genre-4 {
    background: rgb(63, 223, 63);
    color: black;
  }
  .genre.genre-5 {
    background: rgb(223, 223, 223);
    color: black;
  }
  .genre.genre-6 {
    background: rgb(64, 0, 31);
  }
  .genre.genre-7 {
    background: rgb(191,223,191);
    color: black;
  }
  .genre.genre-9 {
    background: rgb(47, 0, 47);
  }
  .genre.genre-12 {
    background: rgb(223, 223, 191);
    color: black;
  }
  .genre.genre-13 {
    background: rgb(223, 191, 191);
    color: black;
  }
  .genre.genre-14 {
    background: rgb(223, 63, 63);
    color: white;
  }

  .card ::-webkit-scrollbar {
    width: 4px;
    height: 10px;
    background: transparent;
  }

  .card ::-webkit-scrollbar-button {
    width: 0;
    height: 0;
  }

  .card ::-webkit-scrollbar-thumb {
    background: rgb(61,69,77);
    border: 0;
    border-radius: 2px;
  }

  .card ::-webkit-scrollbar-thumb:hover {
    background: rgb(102,115,128);
  }

  .card ::-webkit-scrollbar-thumb:active {
    background: rgb(102,115,128);
  }

  .card ::-webkit-scrollbar {
    width: 4px;
    height: 10px;
    background: transparent;
  }

  .card ::-webkit-scrollbar-button {
    width: 0;
    height: 0;
  }

  .card ::-webkit-scrollbar-thumb {
    background: rgb(61,69,77);
    border: 0;
    border-radius: 2px;
  }

  .card ::-webkit-scrollbar-thumb:hover {
    background: rgb(102,115,128);
  }

  .card ::-webkit-scrollbar-thumb:active {
    background: rgb(102,115,128);
  }
  .followBlock {
    position: absolute;
    max-width: 320px;
    padding: 6px 12px;
    background-color: var(--bar_bg_3);
    display: none;
    z-index: 1;
    border-radius: 6px;
    border: 1px solid rgba(191,223,255,.2);
  }
</style>
