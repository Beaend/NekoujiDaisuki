<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

const props = defineProps({
  anime: Object,
})

const { t } = useI18n()

const overQuality = ref(false)

function qualityJoin() {
  overQuality.value = true
}
function qualityLeave() {
  overQuality.value = false
}
</script>

<template>
  <article class="card anime" :class="[anime.color, anime.type]"> <!-- , { hidden: !anime.show } -->
    <div class="left">
      <div class="image" :style="`background-image: url(${anime.image})`">
        <div class="quality" :class="{ over: overQuality }" @mouseover="qualityJoin()" @mouseleave="qualityLeave()">
          <div class="quality-icon">
            <FontAwesomeIcon icon="fa-solid fa-calendar" class="quality-color" />
          </div>
          <div class="quality-about">
            <div class="quality-line quality-bg" />
            {{t('quality.text')}}: {{t(`quality.anime.${anime.color}`)}}
          </div>
        </div>
        <div class="texts">
          <span v-if="anime.tag">
            <router-link :to="`/tag/${anime.tag}`" class="tag">{{anime.tag}}</router-link>
          </span>
          <span>
            <a :href="anime.urls.myanimelist" target="_blank" class="title">{{ anime.title }}</a>
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
    <div class="right">
      <div class="right-head">
        {{ anime.title_ru }}
      </div>
      <hr>
      <div class="right-body">
        <div class="description">
          <p v-for="line in anime.description" :key="line.length">{{line}}</p>
        </div>
        <div class="comment" v-if="anime.comment">
          <p v-for="line in anime.comment" :key="line.length">{{line}}</p>
        </div>
      </div>
      <hr>
      <div class="right-footer">
        <span v-for="genre in anime.genres" :key="genre[0]">
          <router-link :to="`/anime/genre/${genre[1]}`">{{ genre[0] }}</router-link>
        </span>
        <span v-for="genre in anime.genres2" :key="genre[0]">
          <router-link :to="`/anime/genre/${genre[1]}`">{{ genre[0] }}</router-link>
        </span>
      </div>
    </div>
  </article>
</template>

<style lang="scss">
  $item_bg: linear-gradient(45deg, #1f2327, #2f3337);
  $item_border: #1f2123;
  $item_color: rgb(143,161,179);
  $item_color_sub: rgb(122,138,153);
  $item_color_strong: rgb(163,184,204);
  $height: 265px;

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
  }
  @media screen and (min-width: 801px) {
    .card{
      flex-grow: 1;
      max-width: 740px;
    }
    .card .right {
      flex-grow: 1;
    }
  }
  @media screen and (min-width: 1280px) {
    .card{
      flex-grow: 1;
      max-width: 555px;
    }
    .card .right {
      flex-grow: 1;
    }
  }

  .card .left {
    display: inline-block;
    height: 100%;
    width: 185px;
    position: relative;
  }

  .card .left .image {
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
    display: inline-block;
    height: $height;
    width: 185px;
    position: relative;
    border-radius: 4px 0 0 4px;
  }
  .card .left .quality {
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
    .quality-about {
      display: none;
      min-height: 20px;
      .quality-line {
        width: 30px;
        transition: width 50ms;
      }
    }
  }
  .card .left .quality.over {
    width: 175px;
    height: auto;
    .quality-icon {
      display: none;
    }
    .quality-about {
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
  .card .left .texts {
    background: rgba(0,0,0,0.6);
    bottom: 0;
    color: white;
    font-size: 1rem;
    font-weight: 600;
    height: auto;
    overflow: hidden;
    padding: 8px 12px 10px;
    position: absolute;
    text-align: left;
    width: 100%;
    display: flex;
    flex-direction: column;
  }
  .card .left .tag {
    color: rgb(255, 255, 159);
    font-size: 1.1rem;
  }
  .card .left .studios {
    color: #62bdff;
    display: block;
    font-size: .8rem;
    padding-top: 3px;
  }

  .card .right {
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
  .card .right hr {
    border: none;
    color:$item_border;
    background-color: $item_border;
    height: 1px;
  }
  .card .right .right-head {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    font-size: 1rem;
    padding: 2px 5px;
  }
  .card .right .right-body {
    padding: 3px 5px;
    text-align: left;
    width: 100%;
    box-sizing: border-box;
    overflow-x: hidden;
    overflow-y: auto;
    flex: 1;
    font-size: 0.9rem;
    color: $item_color_sub;
    transition: 0.3s;
    cursor: default;
  }
  .card .right .right-footer {
    bottom: 0;
    padding: 0 5px;
    width: 100%;
    color: rgb(191,191,191);
    border-top: solid 1px rgb(31,33,35);
    background: rgb(31,35,39);
    font-size: 0.8rem;
    transition: 0.5s;
    cursor: default;
  }
  .card .right .right-footer span {
    margin: 2px 4px;
    padding: 4px 8px;
    background: rgb(31,33,35);
    border-radius: 4px;
  }
</style>
