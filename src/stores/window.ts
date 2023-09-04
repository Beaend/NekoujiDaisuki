import { defineStore } from 'pinia'

export const windowStore = defineStore({
  id: 'window',
  state: () => ({
    screenSize: {
      width: 0,
      height: 0,
    },
  }),
})
