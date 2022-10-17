import { defineStore } from 'pinia'

export const useCameraStore = defineStore('CameraStore', {

  // state it's the data i have on my component
  state: () => ({
    // state prop returns an object 
    // this object is a state object
    isTakeorPick: true,

    isStartCam: false,

    imgStored: null,

  }),

  getters: {
  },

  actions: {

    initializeMediaUI () {
      this.isStartCam = false
      this.isTakeorPick = true
    },

    initializeCamera () {
      this.isStartCam = true
      this.isTakeorPick = false
    }
  }

})
