<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { windowStore } from '~/stores/window'
import { modalStore } from '~/stores/modals'

const props = defineProps({
  window: null,
  text: null,
})
const window = windowStore()
const modal = modalStore()
</script>

<template>
  <div class="wrapper" :class="{ hidden: !modal.windows[props.window] }" @click.self="modal.close()">
    <div class="modal" :class="window.getDeviceType" @click.self="modal.close()">
      <div v-if="text" class="above">
        <div class="text">
          {{ text }}
        </div>
        <div v-if="window.getDeviceType === 'tiny' || window.getDeviceType === 'smartphone'" class="close">
          <FontAwesomeIcon
            icon="fa-solid fa-xmark"
            @click="modal.close()"
          />
        </div>
      </div>
      <div class="window">
        <slot />
      </div>
    </div>
  </div>
</template>

<style>
.wrapper {
  width: 100%;
  height: 100%;
  position: absolute;
  /*z-index: 100;*/
  top: 0;
  left: 0;
  background: rgba(0,0,0,0.2);
  backdrop-filter: blur(4px);
  cursor: pointer;
  user-select: none;
}
.modal {
  margin: auto;
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: center;
  height: 100%;
  /*z-index: 101;*/
}
.modal.tiny,
.modal.smartphone {
  width: 100%;
  .above {
    background: rgb(63,71,79);
    color: var(--bar_color);
    font-weight: normal;
    .text {
      text-shadow: none;
    }
  }
  .window {
    flex-grow: 1;
  }
}
.modal.tablet {
  width: 80%;
}
.modal.pc {
  width: 800px;
}
.above {
  font-size: 2rem;
  height: 50px;
  line-height: 50px;
  cursor: default;
  position: relative;
  display: flex;
  color: var(--blue);
  font-weight: bold;
  .text {
    flex-grow: 1;
    text-shadow:  2px 1px 3px rgb(31,31,31);
  }
  .close {
    position: absolute;
    right: 0;
    width: 50px;
  }
}
svg {
  height: 32px;
  width: 32px;
  cursor: pointer;
}
.window {
  width: 100%;
  background: rgb(47,55,63);
  padding: 10px;
  cursor: default;
  color: var(--bar_color);
}
.modal.tablet .window,
.modal.pc .window {
  border-radius: 10px;
}

.window hr {
  border-color: var(--window-button-bg);
  margin: 5px 0;
}
</style>
