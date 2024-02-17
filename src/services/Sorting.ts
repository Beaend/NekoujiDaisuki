const qualityNums: { [index: string]: number } = { gold: 1, lblue: 2, green: 3, base: 4, red: 5 }

export class Sorting {
  private data: { [index: string]: any }
  constructor(data: any) {
    this.data = data
  }

  text(key: string, param?: any, reverse: boolean = false) {
    switch (key) {
      case 'name':
        this.byName(param)
        break
      case 'quality':
        this.byQuality()
        break
      case 'year':
        this.byYear(reverse)
        break
    }
  }

  byName(key: string) {
    this.data = this.data.sort((a: { [index: string]: any }, b: { [index: string]: any }) => {
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
    this.data = this.data.sort((a: { [index: string]: any }, b: { [index: string]: any }) => {
      return qualityNums[a.color] - qualityNums[b.color]
    })
    return this.data
  }

  byYear(reverse: boolean = false) {
    this.data = this.data.sort((a: { [index: string]: any }, b: { [index: string]: any }) => {
      if (a.year !== b.year)
        return (a.year - b.year) * (reverse ? -1 : 1)
      if (a.season !== b.season)
        return (a.season - b.season) * (reverse ? -1 : 1)
      return 0
    })
    return this.data
  }

  switchShowQuality(num: number) {
    let nowNum = 0
    for (const el in this.data) {
      const elQuality = qualityNums[this.data[el].color]
      if (elQuality === num)
        this.data[nowNum].show = !this.data[el].show
      nowNum++
    }
  }
}
