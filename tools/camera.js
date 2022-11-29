import { ref } from 'vue'
import { useCameraStore } from '~~/store'

const stream = ref(null)
const cameraOpen = ref(false)
const img = ref(null)
const video = null

const cvsContainer = ref(null) // query selector and refs to fix

const camStore = useCameraStore()
// Starting the camera

function startCamera () {
  if (!cameraOpen.value) {
    navigator.mediaDevices.getUserMedia({
      audio: false,
      video: true
    }).then(stream => {
      cameraOpen.value = true

      // we initialise the stream of the camera to the video
      video.srcObject = stream

      // since we're not using autoplay, we need to manually play the video
      video.play()
      stream.value = stream
    })
      .catch(err => {
        console.log(err)
      })
  }
}

// Stopping the camera
function stopCamera () {
  if (cameraOpen.value) {
    const tracks = video.srcObject.getTracks()
    tracks.forEach(track => track.stop())
    video.srcObject = null
    cameraOpen.value = false
  }
}

function getCanvas () {
  if (cameraOpen.value) {
    // animate()
    const canvas = document.createElement('canvas')
    canvas.width = video.videoWidth
    canvas.height = video.videoHeight

    const canvashader = document.getElementById('canvashader')
    canvas.getContext('2d').drawImage(canvashader, 0, 0, canvas.width, canvas.height)

    // flip the image
    const ctx = canvas.getContext('2d')
    ctx.translate(canvas.width, 0)
    ctx.scale(-1, 1)
    ctx.drawImage(canvas, 0, 0, canvas.width, canvas.height)

    return canvas
  }
}

function captureImg () {
  if (cameraOpen.value) {
    const canvas = getCanvas()

    const img = document.createElement('img')

    img.width = canvas.width
    img.height = canvas.height

    // set the image src to the canvas data url

    img.src = canvas.toDataURL('image/png')

    // store the image in the pinia store
    camStore.imgStored = img.src
  }
}

// export the functions and the ref
export default function useCamera () {
  return {
    startCamera,
    stopCamera,
    captureImg,
    cameraOpen,
    img,
    video,
    cvsContainer
  }
}
