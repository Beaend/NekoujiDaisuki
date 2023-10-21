import { defineStore } from 'pinia'

export const windowStore = defineStore({
  id: 'window',
  state: () => ({
    width: 0,
    height: 0,
  }),
  getters: {
    getBarType(): string {
      if (this.width > 800)
        return 'top'
      else
        return 'bottom'
    },
    getDeviceType(): string {
      const screenWidth: number = this.width
      let deviceType: string = 'unknown'
      if (screenWidth <= 380)
        deviceType = 'tiny'
      else if (screenWidth <= 480)
        deviceType = 'smartphone'
      else if (screenWidth <= 800)
        deviceType = 'tablet'
      else if (screenWidth <= 1280)
        return 'notebook'
      else if (screenWidth > 1280)
        return 'pc'
      return deviceType
    },
  },
})
