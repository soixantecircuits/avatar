import { defineStore } from 'pinia'

export const useCameraStore = defineStore('CameraStore', {

  // state it's the data i have on my component
  state: () => ({
    // state prop returns an object 
    // this object is a state object
    isStartCam: true,
    imgStored: null,

    isStartEdit: false,
  }),

  getters: {
  },

  actions: {
    initializeCamera () {
      this.isStartCam = true
    }
  }

})
