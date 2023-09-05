import { defineStore } from 'pinia'

export const windowStore = defineStore({
  id: 'window',
  state: () => ({
    screenSize: {
      width: 0,
      height: 0,
    },
  }),
  getters: {
    getBarType(): string {
      if (this.screenSize.width > 800)
        return 'top'
      else
        return 'bottom'
    },
    getDeviceType(): string {
      const screenWidth: number = this.screenSize.width
      let deviceType: string = 'unknown'
      if (screenWidth <= 380)
        deviceType = 'tiny'
      else if (screenWidth <= 480)
        deviceType = 'smartphone'
      else if (screenWidth <= 800)
        deviceType = 'tablet'
      else if (screenWidth > 800)
        return 'pc'
      return deviceType
    },
  },
})
