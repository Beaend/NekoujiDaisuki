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

  getYear(year) {
    return http.get(`/anime/${year}`)
  }

  getAnimeGenre(genre) {
    return http.get(`/anime-genres/id=${genre}`)
  }

  get(id) {
    return http.get(`/anime/id-${id}`)
  }

  tag(text) {
    return http.get(`/tag/${text}`)
  }

  studio(name) {
    return http.get(`/studio/${name}`)
  }

  search(text) {
    return http.get(`/search/${text}`)
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