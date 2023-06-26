import { ref } from 'vue'
import { useCameraStore } from '~~/store'

import { animate, canvashader } from './useShader'

import supabase from '~/plugins/supabase'

const stream = ref(null)
const img = ref(null)

const cvsContainer = ref(null)

function startCamera (video) {
  const camStore = useCameraStore()
  if (!camStore.cameraOpen) {
    const getUserMedia =
      navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia ||
      navigator.msGetUserMedia

    if (getUserMedia) {
      getUserMedia.call(navigator, {
        audio: false,
        video: {
          width: { min: 1280 },
          height: { min: 720 }
        }
      }, (stream) => {
        camStore.cameraOpen = true
        video.srcObject = stream
        video.play();
        stream.value = stream
      }, (err) => {
        console.log(err)
      });
    } else {
      console.log('getUserMedia is not supported.')
    }
  }
}

function stopCamera (video) {
  const camStore = useCameraStore()
  if (camStore.cameraOpen) {
    const tracks = video.srcObject.getTracks()
    tracks.forEach(track => track.stop())
    video.srcObject = null
    camStore.cameraOpen = false
  }
}

function getCanvas (video) {
  const camStore = useCameraStore()
  animate(1)
  if (camStore.cameraOpen) {
    const canvas = document.createElement('canvas')
    canvas.width = canvashader.width
    canvas.height = canvashader.height

    canvas.getContext('2d').translate(canvas.width, 0)
    canvas.getContext('2d').scale(-1, 1)

    canvas.getContext('2d').drawImage(canvashader, 0, 0, canvas.width, canvas.height)

    return canvas
  }
}

async function captureImg (video) {
  const camStore = useCameraStore()

  if (camStore.cameraOpen) {
    const canvas = getCanvas(video)

    const img = document.createElement('img')
    img.width = canvashader.width
    img.height = canvashader.height

    img.src = canvas.toDataURL('image/png')

    camStore.imgStored = img.src

    const date = new Date()
    const day = date.getDate()
    const month = date.getMonth() + 1
    const year = date.getFullYear()
    const hour = date.getHours()
    const minutes = date.getMinutes()
    const seconds = date.getSeconds()
    const time = day + '-' + month + '-' + year + '-' + hour + '-' + minutes + '-' + seconds

    const image = camStore.imgStored
    const blob = await fetch(image).then(r => r.blob())

    if (camStore.displayInGallery) {
      const { data, error } = await supabase
        .storage
        .from('gallery')
        .upload('your-picture' + '-' + time + '.png', blob)

      if (error) {
        console.log(error)
      } else {
        console.log('success')
      }
    }
  }
}

export {
  stream,
  img,
  cvsContainer,

  startCamera,
  stopCamera,
  getCanvas,
  captureImg
}
