import { ref } from 'vue'
import { useCameraStore } from '~~/store'

import { animate, canvashader } from './useShader'

const stream = ref(null)
const cameraOpen = ref(false)
const img = ref(null)

const cvsContainer = ref(null)

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

      video.srcObject = stream
      video.play()
      stream.value = stream
    })
      .catch(err => {
        console.log(err)
      })
  }
}

function stopCamera (video) {
  if (cameraOpen.value) {
    const tracks = video.srcObject.getTracks()
    tracks.forEach(track => track.stop())
    video.srcObject = null
    cameraOpen.value = false
  }
}

function getCanvas (video) {
  animate()
  if (cameraOpen.value) {
    const canvas = document.createElement('canvas')
    canvas.width = canvashader.width
    canvas.height = canvashader.height

    canvas.getContext('2d').translate(canvas.width, 0)
    canvas.getContext('2d').scale(-1, 1)

    canvas.getContext('2d').drawImage(canvashader, 0, 0, canvas.width, canvas.height)

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

    img.src = canvas.toDataURL('image/png')

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
