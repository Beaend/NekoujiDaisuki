import { defineStore } from 'pinia'

export const modalStore = defineStore({
  id: 'modal',
  state: () => ({
    isOpened: false,
    windows: {
      settings: false,
    },
  }),
  actions: {
    close() {
      this.isOpened = false
      for (const window in this.windows)
        this.windows[window] = false
    },
    openSettings() {
      this.isOpened = true
      this.windows.settings = true
    },
  },
})
