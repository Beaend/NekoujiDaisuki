<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import TheLogo from '~/components/bar/TheLogo.vue'
import { barStore } from '~/stores/bar'

defineOptions({
  name: 'BarTop',
})

const bar = barStore()

const router = useRouter()

function goTo(url) {
  if (url === 'search')
    router.push(`/search/${encodeURIComponent(bar.searchValue)}`)
  else
    router.push(url)
}

const { t } = useI18n()
</script>

<template>
  <div id="bar-top" :class="{ focusSearch: bar.searchFocused }">
    <div id="first">
      <TheLogo />
      <div id="bar-nav" class="first">
        <span style="display: flex;"><router-link to="/airing" title="Airing">
          <FontAwesomeIcon v-if="bar.searchFocused" icon="fa-solid fa-calendar-alt" />
          <template v-if="!bar.searchFocused">Аниме</template>
        </router-link></span>
        <span style="display: flex;"><router-link to="/manga" title="Manga">
          <FontAwesomeIcon v-if="bar.searchFocused" icon="fa-solid fa-file-image" />
          <template v-if="!bar.searchFocused">Манга</template>
        </router-link></span>
        <span style="display: flex;"><router-link to="/ranobe" title="Ranobe">
          <FontAwesomeIcon v-if="bar.searchFocused" icon="fa-solid fa-book" />
          <template v-if="!bar.searchFocused">Книги</template>
        </router-link></span>
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
    <div id="second">
      <div id="second-other">
        <a href="https://myanimelist.net/profile/nekouji" title="MyAnimeList" target="_blank">
          <img src="/img/myanimelist.png" alt="MyAnimeList">
        </a>
        <a href="https://anichart.net" title="AniChart" target="_blank">
          <img src="/img/anichart.png" alt="AniChart">
        </a>
      </div>
      <div id="second-settings" class="second">
        <FontAwesomeIcon icon="fa-solid fa-cog" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
$bar_bg: rgb(31,35,39);
$bar_bg_2: rgb(25, 28, 31);
$bar_bg_3: rgb(39,43,47);
$bar_color: rgb(223,223,223);
$bar_color_hide: rgb(191,199,207);
$bar_color_2: #becde2;
$bar_active: rgb(63,127,191);

#bar-top {
  width: 100%;
  height: 130px;
  padding: 20px;
  color: $bar_color;
  font-size: 1.1rem;
  line-height: 30px;
}
#first {
  display: flex;
  justify-content: center;
}
#first > div,
#second > div {
  margin: 0 10px;
}
#second {
  display: flex;
  justify-content: right;
  margin: 10px 0px;
}
.first {
  height: 50px;
  min-width: 50px;
  background: $bar_bg;
  border-radius: 5px;
  transition: 1s;
}
.first:hover,
button:hover {
  cursor: pointer;
  > svg {
    color: $bar_active;
  }
}
.first > svg,
button > svg {
  transition: .4s;
  width: 30px;
  height: 30px;
  margin: 10px;
}
#bar-nav {
  display: flex;
  svg {
    transition: .2s;
    height: 30px;
    margin: 0 5px;
  }
  span {
    padding: 10px;
    cursor: pointer;
    transition: background-color 400ms, color 200ms;
  }
  span:hover {
    color: $bar_active;
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
      background: $bar_bg_2;
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
  background: $bar_bg;
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
</style>
