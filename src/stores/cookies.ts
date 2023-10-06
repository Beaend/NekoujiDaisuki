import { defineStore } from 'pinia'

export const userCookies = defineStore({
  id: 'cookies',
  state: () => ({
    cookieVersion: 0.1,
    theme: 'dark',
    sorting: {
      index: {
        sort: 'name',
        param: 'title',
        reverse: false,
        show: {
          1: true,
          2: true,
          3: true,
          4: true,
        },
      },
    },
  }),
})
