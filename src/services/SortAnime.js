import SortObject from '~/services/SortObject.js'

class SortAnime {
  constructor() {
    this.animeData = {}
  }

  sortAnimeObject(object, key, order = 'asc') {
    this.animeData = new SortObject().sort(object, key, order)
    return this.animeData
  }

  sortAnimeWithGroup(object, key, key2 = '') {
    const sortObject = new SortObject()
    let sortedObject = {}
    if (key === 'color') {
      this.changeColorsToNumbersInAnimeList()
      sortedObject = this.changeNumbersToColorsInObject(sortObject.sortObjectInGroupsByNumbers(object, key))
    }
    else {
      sortedObject = sortObject.sortObjectInGroupsByNumbers(object, key)
    }
    if (key2)
      return this.sortAnimeWithDoubleGroup(sortedObject, key2)

    return sortedObject
  }

  sortAnimeWithDoubleGroup(object, key) {
    const sortObject = new SortObject()
    for (const el in object)
      object[el] = sortObject.sortObjectInGroupsByNumbers(object[el], key)

    return object
  }

  changeColorsToNumbersInAnimeList() {
    const colorMapping = {
      'red': 1,
      'none': 2,
      '': 2,
      'null': 2,
      'green': 3,
      'lblue': 4,
      'gold': 5,
    }

    for (const el of this.animeData) {
      const mappedColor = colorMapping[el.color]
      if (mappedColor !== undefined)
        el.color = mappedColor
    }
  }

  changeNumbersToColorsInObject(object) {
    const colorMapping = {
      1: 'red',
      2: 'none',
      3: 'green',
      4: 'lblue',
      5: 'gold',
    }

    const updatedObject = {}
    for (const key in object) {
      const color = colorMapping[key]
      if (color !== undefined)
        updatedObject[color] = object[key]

      for (const el of updatedObject[color])
        el.color = color
    }

    return updatedObject
  }
}

export default SortAnime
