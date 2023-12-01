import http from './http-common.js'

class DataService {
  getGenres() {
    return http.get('/genres')
  }

  getAllAnime() {
    return http.get('/anime')
  }

  getAllManga() {
    return http.get('/manga')
  }

  getAllBooks() {
    return http.get('/books')
  }

  getAnimeByYear(year: number) {
    return http.get(`/anime/${year}`)
  }

  getAnimeSeason(year: number, season: number) {
    return http.get(`/anime/${year}/${season}`)
  }

  getAnimeBest() {
    return http.get('/anime/best')
  }

  getAnimeByType(animeType: string) {
    return http.get(`/anime/type=${animeType}`)
  }

  getAnimeGenre(genre: string) {
    return http.get(`/anime/genre-id=${genre}`)
  }

  getAnime(id: number) {
    return http.get(`/anime/id=${id}`)
  }

  tag(text: string) {
    return http.get(`/tag/${text}`)
  }

  studio(name: string) {
    return http.get(`/studio/${name}`)
  }

  search(text: string) {
    return http.get(`/search/${text}`)
  }

  lastSeason() {
    return http.get('/anime/last-season')
  }
  info() {
    return http.get('info')
  }
}

export default new DataService()
