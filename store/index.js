import { defineStore } from 'pinia'

export const useCameraStore = defineStore('camera', {

  // state it's the data i have on my component
  state: () => ({
    isStartCam: true,
    imgStored: null
  }),

  getters: {
  },

  actions: {
    initializeCamera () {
      this.isStartCam = true
    }
  }

})
