import { ref } from 'vue'
import { useCameraStore } from '~~/store'

import { animate, canvashader } from './useShader'

const stream = ref(null)
const cameraOpen = ref(false)
const img = ref(null)

const cvsContainer = ref(null) // query selector and refs to fix

// Starting the camera
function startCamera (video) {
  if (!cameraOpen.value) {
    navigator.mediaDevices.getUserMedia({
      audio: false,
      video: {
        width: { min: 1280 },
        height: { min: 720 }
      }
    }).then(stream => {
      cameraOpen.value = true

      // we initialise the stream of the camera to the video
      video.srcObject = stream
      video.play()
      stream.value = stream
    })
      .catch(err => {
        console.log(err)
      })
  }
}

// Stopping the camera
function stopCamera (video) {
  if (cameraOpen.value) {
    const tracks = video.srcObject.getTracks()
    tracks.forEach(track => track.stop())
    video.srcObject = null
    cameraOpen.value = false
  }
}

function getCanvas (video) {
  animate() // to fix currently using a number to handle error of length
  if (cameraOpen.value) {
    const canvas = document.createElement('canvas')
    canvas.width = canvashader.width
    canvas.height = canvashader.height

    // flip the image
    canvas.getContext('2d').translate(canvas.width, 0)
    canvas.getContext('2d').scale(-1, 1)

    canvas.getContext('2d').drawImage(canvashader, 0, 0, canvas.width, canvas.height)

    // const canvas = document.createElement('canvas')
    // const ctx = canvas.getContext('2d')

    // const img = document.querySelector('.image')

    // canvas.width = img.width
    // canvas.height = img.height

    // // ctx.drawImage(img, 0, 0, img.width, img.height)
    // ctx.drawImage(img, 110, 80, img.width, img.height, 0, 0, img.width, img.height)

    // img.src = canvas.toDataURL('image/png')

    // camStore.imgStored = img.src

    return canvas
  }
}

function captureImg (video) {
  const camStore = useCameraStore()

  if (cameraOpen.value) {
    const canvas = getCanvas(video)

    const img = document.createElement('img')
    img.width = canvashader.width
    img.height = canvashader.height

    // set the image src to the canvas data url
    img.src = canvas.toDataURL('image/png')

    // store the image in the pinia store
    camStore.imgStored = img.src
  }
}

function goToVerif () {
  const camStore = useCameraStore()

  if (cameraOpen.value) {
    camStore.isStartCam = false
    camStore.isStartShoot = false
    camStore.isStartXp = false
    camStore.isStartVerif = true
    camStore.isStartShare = false
    camStore.isStartMail = false
  }
}

// export the functions and the ref
export {
  stream,
  cameraOpen,
  img,
  cvsContainer,

  startCamera,
  stopCamera,
  getCanvas,
  captureImg,
  goToVerif
}
