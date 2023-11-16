<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { barStore } from '~/stores/bar'
import { modalStore } from '~/stores/modals'

defineOptions({
  name: 'BarBottom',
})

const bar = barStore()
const modal = modalStore()
const barWrapper = ref(false)
const modalWindow = ref('')
const selected = ref(0)

const { t } = useI18n()
const router = useRouter()

function openMobile(window) {
  modalWindow.value = window
  barWrapper.value = true
}
function closeMobile() {
  modalWindow.value = ''
  barWrapper.value = false
}

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
  <div id="bar-bottom">
    <div v-show="barWrapper" id="up-wrapper" @click="closeMobile()" />
    <div id="bar-mobile">
      <section id="mobile-nav">
        <div class="dropup up anime">
          <span class="up-button hover mobile-button" @click="openMobile('AnimeList')">
            <FontAwesomeIcon icon="fa-solid fa-calendar-alt" />
            <span>{{ t('anime') }}</span>
          </span>
          <div v-if="modalWindow === 'AnimeList'" class="up-list">
            <router-link to="/" @click="closeMobile()">
              Актуальное
            </router-link>
            <router-link to="/anime/best" @click="closeMobile()">
              Только топ
            </router-link>
            <div class="custom-select">
              <select v-model="selected" @change="goTo(`/anime/year/${selected}`); closeMobile()">
                <option value="0" disabled>
                  {{ $t('sorting.byYear') }}
                </option>
                <option v-for="year in bar.years" :key="year" :value="year">
                  {{ year }}
                </option>
              </select>
              <div class="under-select" />
            </div>
            <div class="custom-select">
              <select v-model="selected" @change="goTo(`/anime/genre/${selected}`); closeMobile()">
                <option value="0" disabled>
                  {{ $t('sorting.byGenre') }}
                </option>
                <option v-for="genre in bar.genres" :key="genre.id" :value="genre.id">
                  {{ genre[$i18n.locale] }}
                </option>
              </select>
              <div class="under-select" />
            </div>
            <router-link to="/anime/movie" @click="closeMobile()">
              Фильмы
            </router-link>
          </div>
        </div>
        <router-link to="/manga" class="hover mobile-button" @click="closeMobile()">
          <FontAwesomeIcon icon="fa-solid fa-file-image" />
          <span>{{ t('comics.manga') }}</span>
        </router-link>
        <router-link to="/ranobe" class="hover mobile-button" @click="closeMobile()">
          <FontAwesomeIcon icon="fa-solid fa-book" />
          <span>{{ t('ranobe') }}</span>
        </router-link>
      </section>
      <section id="mobile-search">
        <div id="search" class="up">
          <div class="up-button hover" @click="openMobile('Search')">
            <FontAwesomeIcon icon="fa-solid fa-search" />
          </div>
          <div v-if="modalWindow === 'Search'" class="up-list">
            <span class="fixed-search-field">
              <TheInput
                v-model="bar.searchValue"
                :placeholder="t('search')"
                autocomplete="false"
                @keydown.enter="goTo('search')"
              />
              <label class="hidden" for="input">{{ t('search') }}</label>
              <router-link v-if="bar.searchValue" :to="`/search/${bar.searchValue}`"><FontAwesomeIcon icon="fa-solid fa-search" /></router-link>
            </span>
          </div>
        </div>
      </section>
      <section id="mobile-settings" @click="modal.openSettings()">
        <FontAwesomeIcon icon="fa-solid fa-cog" />
      </section>
    </div>
  </div>
</template>

<style>
@media only screen and (max-width: 800px) {
  #bar-mobile {
    display: block;
  }
}
@media only screen and (min-width: 801px) {
  #bar-mobile {
    display: none;
  }
}
@media only screen and (min-width: 481px) and (max-width: 800px) {
  #bar-mobile {
    padding: 30px 25px 10px;
    font-size: 1.5rem;
    line-height: 40px;
  }
  #bar-mobile #mobile-search, #bar-mobile #mobile-settings {
    margin-left: 25px;
    width: 60px;
  }
  #bar-mobile #mobile-search svg,  #bar-mobile  #mobile-settings svg {
    height: 30px;
    width: 30px;
    margin: 5px;
  }
  #bar-mobile section {
    height: 60px;
  }
  #bar-mobile #mobile-nav {
    padding: 5px 15px;
  }
  #bar-mobile #mobile-nav > a {
    margin-left: 10px;
  }
}
@media only screen and (min-width: 381px) and (max-width: 480px) {
  #bar-mobile {
    padding: 10px;
    font-size: 1.3rem;
    line-height: 35px;
  }
  #bar-mobile #mobile-search, #bar-mobile #mobile-settings {
    margin-left: 10px;
    width: 55px;
  }
  #bar-mobile #mobile-search svg,  #bar-mobile  #mobile-settings svg {
    height: 25px;
    width: 25px;
    margin: 5px;
  }
  #bar-mobile section {
    height: 55px;
  }
  #bar-mobile #mobile-nav {
    padding: 5px 5px;
  }
  #bar-mobile #mobile-nav > a {
    margin-left: 5px;
  }
}
@media only screen and (max-width: 380px) {
  #bar-mobile {
    padding: 10px;
    font-size: 1.2rem;
    line-height: 30px;
  }
  #bar-mobile #mobile-search, #bar-mobile #mobile-settings {
    width: 50px;
    margin-left: 5px;
  }
  #bar-mobile #mobile-nav svg {
    height: 15px;
    width: 15px;
    margin: 3px;
  }
  #bar-mobile #mobile-search svg, #bar-mobile #mobile-settings svg {
    height: 20px;
    width: 20px;
    margin: 5px;
  }
  #bar-mobile section {
    height: 50px;
  }
  #bar-mobile #mobile-nav {
    padding: 5px 5px;
  }
}
#up-wrapper {
  width: 100%;
  height: 100%;
  left: 0;
  bottom: 0;
  z-index: 3;
  position: fixed;
  background: rgba(0,0,0,0.5);
}
#bar-mobile {
  position: fixed;
  width: 100%;
  bottom: 0;
  margin: 0 auto;
  display: flex;
  background: linear-gradient(0deg, var(--bar_bg_2), 70%, rgb(0,0,0,0));
  z-index: 5;
  justify-content: space-evenly;
}
#bar-mobile section {
  background: var(--bar_bg);
  border-radius: 5px;
  color: var(--bar_color);
}

#bar-mobile #mobile-nav {
  display: flex;
  flex-grow: 1;
  justify-content: space-evenly;
}

#bar-mobile #mobile-search,
#bar-mobile #mobile-settings {
  padding: 10px;
}

#bar-mobile .hover:hover svg{
  color: var(--blue);
}
#bar-mobile .mobile-button {
  display: flex;
  flex-direction: column;
  align-items: center;
}
#bar-mobile .mobile-button svg {
  height: 20px;
  width: 20px;
  margin: 5px;
}
#bar-mobile .mobile-button span {
  font-size: 0.8rem;
  line-height: normal;
}
#bar-mobile .mobile-button.router-link-active {
  cursor: default;
  color: var(--blue);
}

/* Style The Dropdown Button */

.up-button {
  color: var(--bar_color);
  cursor: pointer;
  background: var(--bar_bg);
}

.up-list {
  position: absolute;
  background: var(--bar_bg);
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
  z-index: 5;
  border-radius: 5px;
  text-align: center;
}

#mobile-nav .up-list {
  width: 80%;
  left: 10%;
}

#mobile-search .up-list {
  width: 90%;
  left: 5%;
}

.fixed-search-field {
  position: relative;
  padding: 5px;
  display: flex;
}

.fixed-search-field a {
  position: absolute;
  right: 5px;
  top: 10px;
  margin: auto 5px;
}
.fixed-search-field a svg {
  margin: 10px;
  width: 20px;
  height: 20px;
}
.up-list .fixed-search-field > a:hover {
  background: none;
  svg {
    color: var(--blue-active);
  }
}

.fixed-search-field .input {
  background: var(--bar_bg_2);
  color: var(--bar_color_2);
  height: 50px;
  border: none;
  padding: 8px 50px 9px 15px;
  border-radius: 4px;
  outline: none;
  box-shadow: inset 0 0 5px rgba(0,0,0,0.1), inset 0 1px 2px rgba(0,0,0,0.3);
  font: 1.1rem Tahoma, Arial, sans-serif;
  width: 100%;
}
.fixed-search-field .input:focus {
  box-shadow: inset 0 0 5px rgba(0,0,0,0.2), inset 0 1px 2px rgba(0,0,0,0.4);
  background: var(--bar_bg_3);
  color: var(--bar_color);
}
@media only screen and (min-width: 481px) {
  .anime .up-list, #mobile-search .up-list {
    bottom: 80%;
  }

  #question .up-list {
    bottom: 80%;
    right: 30px;
  }
}
@media only screen and (max-width: 480px) {
  .anime .up-list, #mobile-search .up-list {
    bottom: 100%;
  }

  #question .up-list {
    bottom: 100%;
    right: 10px;
  }
}

.up-list > a, .up-list > div {
  padding: 6px 8px;
  text-decoration: none;
  display: block;
  color: var(--bar_color_2);
}

.up-list hr {
  background: var(--bar_bg_2);
  height: 1px;
  border: none;
}

.up-list a:hover {
  color: var(--blue);
}
.under-select {
  height: 1px;
  width: 0;
  background: var(--blue);
  transition: width ease 200ms;
  margin: auto;
}
.up-list > div:hover .under-select {
  width: 50%;
}
select {
  appearance: none;
  -webkit-appearance: none;
  background-color: var(--bar_bg);
  border: none;
  outline: none;
  cursor: pointer;
  text-align: center;
  padding: 4px 8px;
}
.custom-select {
  position: relative;
}
</style>
