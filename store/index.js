import { defineStore } from 'pinia'

export const useCameraStore = defineStore('camera', {
  state: () => ({ captureImg: false }),
  actions: {
    toggleCapture () {
      this.captureImg = !this.captureImg
    }
  }
})
