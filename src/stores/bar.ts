import { defineStore } from 'pinia'

export const barStore = defineStore({
  id: 'bar',
  state: () => ({
    searchFocused: false,
    searchValue: '',
    years: [2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013, 2012, 2011, 2010, 2009],
    genres: [
      { id: 1, ru: 'Приключения', en: 'Adventure' },
      { id: 2, ru: 'Повседневность', en: 'Slice of life' },
      { id: 3, ru: 'Комедия', en: 'Comedy' },
      { id: 4, ru: 'Фэнтези', en: 'Fantasy' },
      { id: 12, ru: 'Науч. фантастика', en: 'Sci-Fi' },
      { id: 5, ru: 'Экшен', en: 'Action' },
      { id: 6, ru: 'Драма', en: 'Drama' },
      { id: 13, ru: 'Романтика', en: 'Romance' },
    ],
  }),
  actions: {
    switchSearch() {
      this.searchFocused = !this.searchFocused
    },
  },
})
