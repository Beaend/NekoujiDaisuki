import { defineStore } from 'pinia'

export const barStore = defineStore({
  id: 'bar',
  state: () => ({
    searchFocused: false,
    searchValue: '',
    years: [2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013, 2012, 2011, 2010, 2009],
    genres: [[1, 'Приключения'], [2, 'Повседневность'], [3, 'Комедия'], [4, 'Фантастика'], [5, 'Экшен'],
      [6, 'Драма'], [13, 'Романтика']],
  }),
  actions: {
    switchSearch() {
      this.searchFocused = !this.searchFocused
    },
  },
})
