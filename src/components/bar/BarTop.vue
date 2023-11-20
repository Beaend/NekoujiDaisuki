<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import TheLogo from '~/components/bar/TheLogo.vue'
import { barStore } from '~/stores/bar'
import { displayStore } from '~/stores/display'
import { modalStore } from '~/stores/modals'

defineOptions({
  name: 'BarTop',
})

const bar = barStore()
const display = displayStore()
const modal = modalStore()
const selected = ref(0)

const { t } = useI18n()
const router = useRouter()

function goTo(url) {
  if (url === 'search')
    router.push(`/search/${encodeURIComponent(bar.searchValue)}`)
  else
    router.push(url)
}

watch(selected, async () => {
  await new Promise(resolve => setTimeout(resolve, 200))
  reset()
})
function reset() {
  selected.value = 0
}
</script>

<template>
  <div id="bar-top" :class="{ focusSearch: bar.searchFocused, mobile: display.getBarType === 'bottom', [display.getDeviceType]: display.getDeviceType }">
    <div id="bar-top-first">
      <TheLogo />
      <div id="bar-nav" class="first">
        <span class="dropdown">
          <span class="like-button flex">
            <FontAwesomeIcon icon="fa-solid fa-calendar-alt" />
            <span class="like-button-title"> {{ t('anime') }} </span>
          </span>
          <span class="dropdown-content">
            <span>
              <router-link to="/" @click="reset">Актуальное</router-link>
            </span>
            <span>
              <router-link to="/anime/best" @click="reset">Только топ</router-link>
            </span>
            <span class="custom-select">
              <select v-model="selected" @change="goTo(`/anime/year/${selected}`)">
                <option value="0" disabled>{{ $t('sorting.byYear') }}</option>
                <option v-for="year in bar.years" :key="year" :value="year">{{ year }}</option>
              </select>
            </span>
            <span class="custom-select">
              <select v-model="selected" @change="goTo(`/anime/genre/${selected}`)">
                <option value="0" disabled>{{ $t('sorting.byGenre') }}</option>
                <option v-for="genre in bar.genres" :key="genre.id" :value="genre.id">{{ genre[$i18n.locale] }}</option>
              </select>
            </span>
            <span>
              <router-link to="/anime/movie" @click="reset">Фильмы</router-link>
            </span>
          </span>
        </span>
        <router-link class="like-button flex" to="/manga" title="Manga">
          <FontAwesomeIcon icon="fa-solid fa-file-image" />
          <span class="like-button-title">{{ t('comics.manga') }}</span>
        </router-link>
        <router-link class="like-button flex" to="/ranobe" title="Ranobe">
          <FontAwesomeIcon icon="fa-solid fa-book" />
          <span class="like-button-title">{{ t('ranobe') }}</span>
        </router-link>
      </div>
      <div id="bar-search" class="first">
        <span v-if="bar.searchFocused" class="search-field">
          <TheInput
            v-model="bar.searchValue"
            :placeholder="t('search')"
            autocomplete="false"
            @keydown.enter="goTo('search')"
          />
          <label class="hidden" for="input">{{ t('search') }}</label>
          <router-link v-if="bar.searchValue" :to="`/search/${bar.searchValue}`"><FontAwesomeIcon icon="fa-solid fa-search" /></router-link>
        </span>
        <button v-if="!bar.searchFocused" @click="bar.switchSearch">
          <FontAwesomeIcon icon="fa-solid fa-search" />
        </button>
        <button v-if="bar.searchFocused" @click="bar.switchSearch">
          <FontAwesomeIcon icon="fa-solid fa-xmark" />
        </button>
      </div>
    </div>
    <div id="bar-top-second">
      <div id="second-other">
        <a href="https://myanimelist.net/profile/nekouji" title="MyAnimeList" target="_blank">
          <img src="/img/myanimelist.png" alt="MyAnimeList">
        </a>
        <a href="https://anichart.net" title="AniChart" target="_blank">
          <img src="/img/anichart.png" alt="AniChart">
        </a>
      </div>
      <div id="second-settings" class="second" @click="modal.openSettings()">
        <FontAwesomeIcon icon="fa-solid fa-cog" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
$bar_color_hide: rgb(191,199,207);
$bar_active: rgb(63,127,191);

#bar-top {
  width: 100%;
  height: 130px;
  padding: 20px;
  color: var(--bar_color);
  font-size: 1.1rem;
}
#bar-top.mobile {
  height: 90px;
  .first {
    display: none;
  }
  #bar-top-second {
    display: none;
  }
}
#bar-top-first {
  display: flex;
  justify-content: center;
}
#bar-top-first > div,
#bar-top-second > div {
  margin: 0 10px;
}
#bar-top-second {
  display: flex;
  justify-content: right;
  margin: 10px 0px;
}
.first {
  height: 50px;
  min-width: 50px;
  background: var(--bar_bg);
  border-radius: 5px;
  transition: 1s;
}
button:hover,
.like-button:hover {
  cursor: pointer;
  color: $bar_active;
  > svg {
    color: $bar_active;
  }
}
#bar-nav .like-button.router-link-active {
  cursor: default;
  color: var(--blue-passive);
  * {
    cursor: default;
  }
  > svg {
    color: var(--blue-passive);
  }
}
.first > svg,
button > svg {
  transition: .2s;
  width: 30px;
  height: 30px;
  margin: 10px;
}
#bar-nav {
  display: flex;
  margin-left: 30px !important;
  user-select: none;
  svg {
    transition: color 200ms;
    height: 30px;
    margin: 0 5px 0 0;
  }
  .like-button {
    padding: 10px;
    line-height: 30px;
    display: flex;
    cursor: pointer;
    transition: color 200ms;
  }
}
.focusSearch.notebook #bar-nav {
  .like-button {
    width: 50px;
  }
  .like-button-title {
    display: none;
  }
}
#bar-search {
  display: flex;
  justify-content: center;
  width: 50px;
  transition: width 400ms;
  button {
    right: 0;
    position: relative;
  }
  .search-field {
    flex-grow: 1;
    padding: 5px;
    position: relative;
    input {
      width: 100%;
      height: 40px;
      border: none;
      outline: none;
      padding: 8px 40px 9px 15px;
      border-radius: 4px;
      background: var(--bar_bg_2);
      color: $bar_color_hide;
      font: 1.1rem Tahoma, sans-serif;
    }
    a {
      position: absolute;
      right: 10px;
      svg {
        margin: 10px 5px;
        height: 20px;
      }
    }
    a:hover {
      color: $bar_active;
    }
  }
}
.focusSearch #bar-search {
  width: 400px;
}
.second {
  height: 40px;
  min-width: 40px;
  background: var(--bar_bg);
  border-radius: 5px;
  transition: 1s;
}
.second:hover {
  cursor: pointer;
  > svg {
    color: $bar_active;
  }
}
.second > svg {
  transition: .4s;
  width: 24px;
  height: 24px;
  margin: 8px;
}
#second-other {
  display: flex;
  img {
    height: 24px;
    margin: 8px 5px;
    transition: filter 400ms;
  }
  img:hover {
    filter: drop-shadow(2px -1px 0 rgb(0, 127, 255));
  }
}
.dropdown {
  text-align: center;
  display: flex;
  flex-direction: column;
  position: relative;
}
.dropdown-content {
  display: none;
  flex-direction: column;
  position: absolute;
  left: 0;
  top:50px;
  background: var(--bar_bg_3);
  border-radius: 5px;
  z-index: 1;
}
.dropdown:hover .dropdown-content {
  display: flex;
}
.dropdown-content span {
  min-width: 160px;
  padding: 4px 12px;
}
.dropdown-content a:hover {
  color: var(--blue);
}
.dropdown-content .router-link-active {
  color: var(--blue-passive);
}
.dropdown-content .router-link-active:hover {
  color: var(--blue-passive);
  cursor: default;
}
select {
  appearance: none;
  -webkit-appearance: none;
  background-color: var(--bar_bg);
  border: none;
  width: 150px;
  outline: none;
  cursor: pointer;
  text-align: center;
  padding: 4px 3px 4px 7px;
}
.custom-select {
  position: relative;
}

.custom-select::before,
.custom-select::after {
  --size: 4px;
  content: "";
  position: absolute;
  right: 1rem;
  pointer-events: none;
}

.custom-select::before {
  border-left: var(--size) solid transparent;
  border-right: var(--size) solid transparent;
  border-bottom: var(--size) solid rgb(223,223,223);
  top: 40%;
}

.custom-select::after {
  border-left: var(--size) solid transparent;
  border-right: var(--size) solid transparent;
  border-top: var(--size) solid rgb(223,223,223);
  top: 55%;
}
.custom-select:hover::before {
  border-bottom: var(--size) solid var(--blue);
}
.custom-select:hover::after {
  border-top: var(--size) solid var(--blue);
}
</style>
