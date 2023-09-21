const qualityNums: { [index: string]: number } = { gold: 1, lblue: 2, green: 3, base: 4, red: 5 }

class Sorting {
  private data: any
  constructor(data: any) {
    this.data = data
  }

  byName(key: string) {
    this.data = this.data.sort((a: any, b: any) => {
      const titleA = a[key].toLowerCase()
      const titleB = b[key].toLowerCase()
      if (titleA < titleB)
        return -1
      else if (titleA > titleB)
        return 1
      return 0
    })
    return this.data
  }

  byQuality() {
    this.data = this.data.sort((a: any, b: any) => {
      let qualityA = null
      let qualityB = null
      if (a.color == null || a.color === '')
        qualityA = 4
      else
        qualityA = qualityNums[a.color]
      if (b.color == null || b.color === '')
        qualityB = 4
      else
        qualityB = qualityNums[b.color]
      if (qualityA < qualityB)
        return -1
      else if (qualityB < qualityA)
        return 1
      return 0
    })
    return this.data
  }

  reverse() {
    this.data = this.data.reverse()
    return this.data
  }

  byYear() {
    this.data = this.data.sort((a: any, b: any) => {
      if (a.year > b.year)
        return 1
      else if (a.year < b.year)
        return -1
      if (a.season > b.season)
        return 1
      else if (a.season < b.season)
        return -1
      return 0
    })
    return this.data
  }

  switchShowQuality(name: number) {
    let nowNum = 0
    for (const el in this.data) {
      let elQuality = null
      if (this.data[el].color === '' || this.data[el].color == null)
        elQuality = 4
      else
        elQuality = qualityNums[this.data[el].color]
      if (elQuality === name)
        this.data[nowNum].show = !this.data[el].show
      nowNum++
    }
  }
}

export default Sorting
