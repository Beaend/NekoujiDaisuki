<script setup lang="ts">
import Api from '~/services/ApiCall.js'

defineOptions({
  name: 'IndexPage',
})

const { t } = useI18n()

const anime = ref({})
const seasons = ref([])
const selectedSeason = ref(0)

async function getActualSeason() {
  let year = new Date().getFullYear()
  const mm = new Date().getMonth() + 1
  let season = mm < 4 ? 1 : mm < 7 ? 2 : mm < 10 ? 3 : 4
  let db: object = {}
  await Api.lastSeason().then((response) => {
    db = response.data
  })
  setTimeout(() => selectedSeason.value = season, 500)
  if (year > db.year || (year === db.year && season + 1 > db.season) || (year + 1 === db.year && db.season === 1)) {
    year = db.year
    season = db.season
  }
  // selectedSeason.value = season
  for (let i = 0; i < 4; i++) {
    seasons.value.push({ year, season })
    if (season > 1) {
      season--
    }
    else {
      year--
      season = 4
    }
  }
}
function getAnime() {
  for (const i in seasons.value) {
    Api.getAnimeSeason(seasons.value[i].year, seasons.value[i].season)
      .then((response) => {
        anime.value[seasons.value[i].season] = response.data
      })
  }
}
function takeSeasonYear(x) {
  return seasons.value.find(item => item.season === x).year
}

onBeforeMount(async () => {
  await getActualSeason()
  await getAnime()
})
</script>

<template>
  <main>
    <div v-if="seasons.length > 0" class="select-season">
      <div class="menu">
        <span
          v-for="(i, index) in ['winter', 'spring', 'summer', 'fall']" :key="index"
          class="season-button" :class="[{ active: selectedSeason === index + 1 }, i]"
          @click="selectedSeason = index + 1"
        >
          <span class="season">
            {{ t(`season.${index + 1}`) }}
          </span>
          <span class="active-line" />
          <span class="year">
            {{ takeSeasonYear(index + 1) }}
          </span>
        </span>
      </div>
    </div>
    <Sorting
      v-if="selectedSeason === 0" :hide-years="true"
    />
    <template v-for="i in [1, 2, 3, 4]">
      <Sorting
        v-if="selectedSeason === i && anime[selectedSeason]" :key="i"
        v-model="anime[i]" :raw-data="anime[i]"
        :hide-years="true"
      />
    </template>
    <div v-if="selectedSeason === 0 || !anime[1]" class="shelf">
      <CardBlank v-for="l in [1, 2, 3]" :key="l" />
    </div>
    <transition name="slide-fade">
      <div v-if="anime[selectedSeason]" class="shelf">
        <CardAnime v-for="item in anime[selectedSeason]" :key="item.id" :anime="item" />
      </div>
    </transition>
  </main>
</template>

<style>
.select-season {
  margin: 0 0 12px;
}
.menu {
  background: var(--bar_bg);
  display: flex;
  justify-content: center;
  height: 56px;
  border-radius: 5px;
  width: 300px;
  margin: auto;
  font-size: .8em;
  color: var(--bar_color);
  user-select: none;
}
.season-button {
  display: flex;
  flex-direction: column;
  cursor: pointer;
  width: 70px;
  margin: 0 2px;
}
.season-button:hover {
  color: white;
}
.season-button.active {
  color: var(--blue);
  cursor: default;
}
.season-button .active-line {
  width: 0;
  height: 1px;
  background: var(--blue);
  display: block;
  margin: -2px auto 0;
  transition: width ease 200ms;
}
.season-button.active .active-line {
  width: 90%;
}
.season-button .season {
  font-weight: bold;
}
.season-button .year {
  font-size: .6em;
}

.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to {
  transform: translateX(10px);
  opacity: 0;
}
.winter.active .season {
  color: rgb(223,255,255);
}
.spring.active .season {
  color: rgb(191,255,191);
}
.summer.active .season {
  color: rgb(255,255,191);
}
.fall.active .season {
  color: rgb(255, 223, 191);
}
.winter:hover .season {
  text-shadow: 0 0 10px rgba(127,191,191,.5);
}
.spring:hover .season {
  text-shadow: 0 0 10px rgba(127,223,127,.5);
}
.summer:hover .season {
  text-shadow: 0 0 10px rgba(223,223,127,.5);
}
.fall:hover .season {
  text-shadow: 0 0 10px rgba(223,191,127,.5);
}
.active:hover .season {
  text-shadow: none;
}
</style>

<route lang="yaml">
meta:
  layout: home
</route>
