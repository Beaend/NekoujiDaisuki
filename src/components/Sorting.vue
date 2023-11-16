<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { Sorting as SortingTs } from '~/services/Sorting.ts'

defineOptions({
  name: 'Sort',
})

const props = defineProps({
  rawData: Array,
  hideYears: Boolean,
})

const emit = defineEmits(['update:rawData'])
const settings = ref({
  sort: 'name',
  param: 'title',
  reverse: false,
  show: {
    1: true,
    2: true,
    3: true,
    4: true,
  },
})
const sorting = new SortingTs(props.rawData)

function sort(key, param = null) {
  const local: object[string] = settings.value
  if (local.sort === key) {
    if (param === null || local.param === param) {
      sorting.reverse()
      local.reverse = !local.reverse
      return
    }
  }
  if (key === 'name') {
    sorting.byName(param)
    local.param = param
  }
  else if (key === 'quality') {
    sorting.byQuality()
    local.param = null
  }
  else if (key === 'year') {
    sorting.byYear()
    local.param = null
  }
  local.sort = key
  local.reverse = key === 'reverse'
}
function switchShowQuality(number) {
  sorting.switchShowQuality(number)
  const local: object[number] = settings.value
  local.show[number] = !local.show[number]
}
</script>

<template>
  <div id="sort">
    <div class="dropdown">
      <span>
        {{ $t('sorting.text') }}
        <FontAwesomeIcon icon="fa-solid fa-angle-down" />
      </span>
      <div class="dropdown-content" :class="{ reverse: settings.reverse }">
        <button :class="{ active: settings.param === 'title' }" @click="sort('name', 'title')">
          <span>Title</span>
          <FontAwesomeIcon icon="fa-solid fa-angle-down" class="list-down" />
          <FontAwesomeIcon icon="fa-solid fa-angle-up" class="list-up" />
        </button>
        <button :class="{ active: settings.param === 'title_ru' }" @click="sort('name', 'title_ru')">
          <span>Title RU</span>
          <FontAwesomeIcon icon="fa-solid fa-angle-down" class="list-down" />
          <FontAwesomeIcon icon="fa-solid fa-angle-up" class="list-up" />
        </button>
        <button :class="{ active: settings.sort === 'quality' }" @click="sort('quality')">
          <span>Quality</span>
          <FontAwesomeIcon icon="fa-solid fa-angle-down" class="list-down" />
          <FontAwesomeIcon icon="fa-solid fa-angle-up" class="list-up" />
        </button>
        <button v-if="!hideYears" :class="{ active: settings.sort === 'year' }" @click="sort('year')">
          <span>Year</span>
          <FontAwesomeIcon icon="fa-solid fa-angle-down" class="list-down" />
          <FontAwesomeIcon icon="fa-solid fa-angle-up" class="list-up" />
        </button>
      </div>
    </div>
    <div class="dropdown">
      {{ $t('show') }}
      <FontAwesomeIcon icon="fa-solid fa-angle-down" />
      <div class="dropdown-content">
        <button :class="{ inActive: settings.show[1] }" @click="switchShowQuality(1)">
          <FontAwesomeIcon v-if="!(settings.show[1])" icon="fa-solid fa-square" class="disabled" />
          <FontAwesomeIcon v-if="settings.show[1]" icon="fa-solid fa-square-check" class="enabled" />
          Gold
        </button>
        <button :class="{ inActive: settings.show[2] }" @click="switchShowQuality(2)">
          <FontAwesomeIcon v-if="!(settings.show[2])" icon="fa-solid fa-square" class="disabled" />
          <FontAwesomeIcon v-if="settings.show[2]" icon="fa-solid fa-square-check" class="enabled" />
          Blue
        </button>
        <button :class="{ inActive: settings.show[3] }" @click="switchShowQuality(3)">
          <FontAwesomeIcon v-if="!(settings.show[3])" icon="fa-solid fa-square" class="disabled" />
          <FontAwesomeIcon v-if="settings.show[3]" icon="fa-solid fa-square-check" class="enabled" />
          Green
        </button>
        <button :class="{ inActive: settings.show[4] }" @click="switchShowQuality(4)">
          <FontAwesomeIcon v-if="!(settings.show[4])" icon="fa-solid fa-square" class="disabled" />
          <FontAwesomeIcon v-if="settings.show[4]" icon="fa-solid fa-square-check" class="enabled" />
          Base
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
#sort {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  font-size: 1rem;
}
.dropdown {
  position: relative;
  display: inline-block;
  margin: 2px 5px;
  background: rgb(31,33,35);
  padding: 4px 12px;
  line-height: 24px;
  min-width: 120px;
}
.dropdown-content {
  display: none;
  position: absolute;
  width: 100%;
  z-index: 1;
  flex-direction: column;
  background: rgb(33,35,37);
  left: 0;
}
.dropdown:hover .dropdown-content{
  display: flex;
}
.dropdown-content button {
  padding: 4px 12px;
  display: flex;
}
.list-down, .list-up {
  transition: ease 300ms;
}
.dropdown-content button:hover .list-down {
  color: var(--blue-active);
  filter: drop-shadow(0 0 2px var(--blue-active));
}
.dropdown-content button.active {
  color: var(--blue);
}
.dropdown-content button.active .list-up {
    color: white;
}
.dropdown-content button.active:hover .list-down {
  color: var(--blue-passive);
  filter: drop-shadow(0 0 0 black);
}
.dropdown-content button.active:hover .list-up {
  color: var(--blue-active);
  filter: drop-shadow(0 0 2px var(--blue-active));
}
.dropdown-content.reverse button.active .list-down {
  filter: drop-shadow(0 0 0 black);
  color: white;
}
.dropdown-content.reverse button.active .list-up {
  color: var(--blue);
  filter: drop-shadow(0 0 0 black);
}
.dropdown-content.reverse button.active:hover .list-up {
  color: var(--blue-passive);
}
.dropdown-content.reverse button.active:hover .list-down {
  color: var(--blue-active);
  filter: drop-shadow(0 0 2px var(--blue-active));
}
.dropdown-content button span {
  flex-grow: 1;
}
.dropdown-content .list-down, .dropdown-content .list-up {
  width: 20px;
  margin: 4px 0;
}
.dropdown-content .disabled, .dropdown-content .enabled {
  margin: 4px 0;
}
</style>
