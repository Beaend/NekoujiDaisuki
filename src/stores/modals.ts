import { defineStore } from 'pinia'

export const modalStore = defineStore({
  id: 'modal',
  state: () => ({
    window: '',
  }),
  actions: {
    close() {
      this.window = ''
    },
    openSettings() {
      this.window = 'Settings'
    },
  },
})
