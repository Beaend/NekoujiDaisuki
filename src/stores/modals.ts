import { defineStore } from 'pinia'

export const modalStore = defineStore({
  id: 'modal',
  state: () => ({
    isOpened: false,
  }),
  actions: {
    close() {
      this.isOpened = false
    },
    open() {
      this.isOpened = true
    },
  },
})
