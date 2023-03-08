import { defineStore } from 'pinia'

export const useCameraStore = defineStore('CameraStore', {

  // state it's the data i have on my component
  state: () => ({
    // state prop returns an object
    // this object is a state object
    isTakeorPick: true,

    isStartPage : false,

    isStartCam: false,

    imgStored: null

  }),

  getters: {
  },

  actions: {

    initializeMediaUI () {
      this.isStartCam = false
      this.isStartPage = false
      this.isTakeorPick = true
    },

    initializeStartPage () {
      this.isStartCam = false
      this.isTakeorPick = false
      this.isStartPage = true
    },

    initializeCamera () {
      this.isStartCam = true
      this.isTakeorPick = false
      this.isStartPage = false
    }
  }

})
