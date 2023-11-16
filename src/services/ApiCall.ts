import http from './http-common.js'

class DataService {
  getGenres() {
    return http.get('/genres/')
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

  getAnimeBest() {
    return http.get('/anime/best')
  }

  getAnimeByType(animeType: string) {
    return http.get(`/anime/type=${animeType}`)
  }

  getAnimeSeason(year: number, season: number) {
    return http.get(`/anime/${year}/${season}`)
  }

  getAnimeGenre(genre: string) {
    return http.get(`/anime-genres/id=${genre}`)
  }

  getAnime(id: number) {
    return http.get(`/anime/id-${id}`)
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
  //
  // create(data) {
  //     return http.post("/anime", data);
  // }
  //
  // update(id, data) {
  //     return http.put(`/anime/${id}`, data);
  // }
  //
  // delete(id) {
  //     return http.delete(`/anime/${id}`);
  // }
  //
  // deleteAll() {
  //     return http.delete(`/anime`);
  // }
  //
  // findByTitle(title) {
  //     return http.get(`/anime?title=${title}`);
  // }
}

export default new DataService()
