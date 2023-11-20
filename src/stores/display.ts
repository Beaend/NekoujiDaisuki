import { defineStore } from 'pinia'

export const displayStore = defineStore({
  id: 'display',
  state: () => ({
    window: {
      width: 0,
      height: 0,
    },
    backgroundUrl: null,
    isTouch: false,
    mousePosition: [],
  }),
  getters: {
    getBarType(): string {
      if (this.window.width > 800)
        return 'top'
      else
        return 'bottom'
    },
    getDeviceType(): string {
      const screenWidth: number = this.window.width
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
