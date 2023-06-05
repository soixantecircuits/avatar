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

    isStartShareMedia: false,

    emailSent: false,

    imgStored: null,

    imgEmailed: null,

    linkToImg: null,

    darkMode: false

  }),

  getters: {
    getDarkMode: (state) => state.darkMode
  },

  actions: {

    initializeMediaUI () {
      this.isStartShoot = false
      this.isStartXp = false
      this.isStartVerif = false
      this.isStartPage = true
      this.isStartShare = false
      this.isStartMail = false
      this.isStartQR = false
      this.emailSent = false
      this.isStartShareMedia = false
    },

    initializeStartPage () {
      this.isStartShoot = false
      this.isStartPage = false
      this.isStartVerif = false
      this.isStartXp = true
      this.isStartShare = false
      this.isStartMail = false
      this.isStartQR = false
      this.emailSent = false
      this.isStartShareMedia = false
    },

    initializeCamera () {
      this.isStartPage = false
      this.isStartXp = false
      this.isStartVerif = false
      this.isStartShoot = true
      this.isStartShare = false
      this.isStartMail = false
      this.isStartQR = false
      this.emailSent = false
      this.isStartShareMedia = false
    },

    goToShareMedia () {
      this.isStartPage = false
      this.isStartXp = false
      this.isStartVerif = false
      this.isStartShoot = false
      this.isStartShare = false
      this.isStartMail = false
      this.isStartQR = false
      this.isStartShareMedia = true
    },

    goToQR () {
      this.isStartMail = false
      this.isStartShoot = false
      this.isStartXp = false
      this.isStartVerif = false
      this.isStartPage = false
      this.isStartShare = false
      this.isStartQR = true
      this.isStartShareMedia = false
    },

    goToMail () {
      this.isStartMail = true
      this.isStartShoot = false
      this.isStartXp = false
      this.isStartVerif = false
      this.isStartPage = false
      this.isStartShare = false
      this.isStartQR = false
      this.isStartShareMedia = false
    },

    goToShare () {
      this.isStartMail = false
      this.isStartShoot = false
      this.isStartXp = false
      this.isStartVerif = false
      this.isStartPage = false
      this.isStartShare = true
      this.isStartQR = false
      this.isStartShareMedia = false
    },

    toggleDarkMode () {
      this.darkMode = !this.darkMode
      document.body.classList.toggle('dark', this.darkMode)
    }
  }

})
