import { defineStore } from 'pinia'

export const useCameraStore = defineStore('CameraStore', {

  // state it's the data i have on my component
  state: () => ({
    // state prop returns an object
    // this object is a state object
    isStartPage: true,

    isStartXp: false,

    isStartShoot: false,

    isStartVerif: false,

    isStartShare: false,

    imgStored: null

  }),

  getters: {
  },

  actions: {

    initializeMediaUI () {
      this.isStartShoot = false
      this.isStartXp = false
      this.isStartVerif = false
      this.isStartPage = true
    },

    initializeStartPage () {
      this.isStartShoot = false
      this.isStartPage = false
      this.isStartVerif = false
      this.isStartXp = true
    },

    initializeCamera () {
      this.isStartPage = false
      this.isStartXp = false
      this.isStartVerif = false
      this.isStartShoot = true
    }
  }

})
