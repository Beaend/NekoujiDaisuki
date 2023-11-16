<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

const props = defineProps({
  tags: Array,
  activeTags: Array,
})
const { t } = useI18n()

const newTag = ref<string>('')
const listOfTags = ref({})
const showDropdown = ref<boolean>(false)

onBeforeMount(() => {
  listOfTags.value = props.tags
})

const filteredOptions = computed(() => {
  return props.tags.filter((tag) => {
    const idNotIn = !props.activeTags.some(activeId => activeId[1] === tag.id)
    const containtsInput = tag.ru.includes(newTag.value) || tag.en.includes(newTag.value) || tag.id === Number(newTag.value)
    return idNotIn && containtsInput
  }).slice(0, 5)
})

function removeTag(index) {
  props.activeTags.splice(index, 1)
}
function addTag(tag) {
  props.activeTags.push([tag.ru, tag.id])
  newTag.value = ''
}
function showTagsList() {
  newTag.value = ''
  showDropdown.value = true
}
function hideTagsList() {
  showDropdown.value = false
}
</script>

<template>
  <div class="tags-input">
    <div class="ti-input">
      <ul v-if="tags" class="ti-tags">
        <li
          v-for="(tag, index) in activeTags"
          :key="index"
          class="ti-tag"
        >
          <div class="ti-tag-content">
            {{ tag[0] }}
          </div>
          <div class="ti-tag-action">
            <FontAwesomeIcon
              icon="fa-solid fa-xmark"
              @click="removeTag(index)"
            />
          </div>
        </li>
        <li class="ti-input-wrapper">
          <input
            v-model="newTag"
            :placeholder="t('add-tag')"
            @focus="showTagsList()"
            @blur="hideTagsList()"
          >
          <div
            v-show="showDropdown"
            class="input-dropdown"
          >
            <span
              class="dropdown-item"
              @mousedown="addTag(tag)"
              v-for="(tag, index) in filteredOptions"
              :key="index"
            >
              {{ tag.ru || tag.id }} / {{ tag.en }}
            </span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.tags-input {
  position: relative;
  background: rgb(31,35,39);
  min-width: 320px;
  max-width: 1280px;
  flex-grow: 1;
}
.ti-input {
  padding: 4px 12px;
}
.ti-tags {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  line-height: 1em;
}
.ti-tag {
  margin: 2px;
  padding: 4px 8px;
  background-color: rgb(63,94,127);
  color: white;
  border-radius: 4px;
  display: flex;
  font-size: .8em;
}
.ti-tag-action {
  cursor: pointer;
  color: rgb(191,191,191);
  transition: color .2s ease-out;
}
.ti-tag-action:hover {
  color: rgb(223,223,255);
}
.ti-tag-action svg {
  height: 20px;
  width: 20px;
}
.ti-input-wrapper {
  padding: 3px 5px;
  margin: 2px;
  font-size: .85em;
  position: relative;
  display: block;
}
.tags-input input {
  flex: 1 0 auto;
  padding: 2px 4px;
  background: none;
  min-width: 200px;
  max-width: 350px;
  border: none;
}
.tags-input input:focus {
  outline: none;
}
.input-dropdown {
  position: absolute;
  background: rgb(31,35,39);
  z-index: 1;
  max-width: 350px;
}
.dropdown-item {
  font-size: .7em;
  line-height: 1em;
  padding: 5px 12px;
  text-decoration: none;
  display: block;
  cursor: pointer;
  min-width: 200px;
  &:hover {
    background-color: rgb(31,47,63);
  }
}
</style>
