import { defineStore } from 'pinia'

export const useCameraStore = defineStore('CameraStore', {

  state: () => ({
    // this object is a state object state prop returns an object
    isStartPage: true,

    isStartXp: false,

    isStartShoot: false,

    isStartVerif: false,

    isStartShare: false,

    isStartMail: false,

    isStartQR: false,

    emailSent: false,

    imgStored: null,

    imgEmailed: null,

    linkToImg: null

  }),

  getters: {
  },

  actions: {

    initializeMediaUI () {
      this.isStartShoot = false
      this.isStartXp = false
      this.isStartVerif = false
      this.isStartPage = true
      this.isStartShare = false
      this.isStartMail = false
    },

    initializeStartPage () {
      this.isStartShoot = false
      this.isStartPage = false
      this.isStartVerif = false
      this.isStartXp = true
      this.isStartShare = false
      this.isStartMail = false
    },

    initializeCamera () {
      this.isStartPage = false
      this.isStartXp = false
      this.isStartVerif = false
      this.isStartShoot = true
      this.isStartShare = false
      this.isStartMail = false
    }
  }

})
