<template>
  <div class='w-full h-full flex flex-col justify-center space-y-10'>
    <div class="w-full h-5/6 bg-[#0C0C0C] flex flex-col justify-center items-center" v-if="!cameraOpen">
    <div class=" flex flex-row  justify-center items-center space-x-4">
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="7" cy="7" r="7" fill="#D21E3E"/>
      </svg>
      <div class="text-lg">Activez votre webcam</div>
    </div>
      <svg width="284" height="242" viewBox="0 0 284 242" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M49.0807 13.5294C30.3726 13.5294 15.0071 28.8722 15.0071 47.5526V189.831C15.0071 208.512 30.3726 223.854 49.0807 223.854H241.131C259.839 223.854 275.205 208.512 275.205 189.831V47.5526C275.205 28.8722 259.839 13.5294 241.131 13.5294H49.0807ZM49.0807 32.0875H241.131C249.794 32.0875 256.619 38.9031 256.619 47.5526V189.831C256.619 198.481 249.794 205.296 241.131 205.296H207.058V165.087C207.058 153.148 197.331 143.436 185.375 143.436H104.837C92.8806 143.436 83.1542 153.148 83.1542 165.087V205.296H49.0807C40.4184 205.296 33.5927 198.481 33.5927 189.831V47.5526C33.5927 38.9031 40.4184 32.0875 49.0807 32.0875ZM145.106 56.8316C135.248 56.8316 125.793 60.7421 118.822 67.7027C111.851 74.6633 107.935 84.104 107.935 93.9478C107.935 103.792 111.851 113.232 118.822 120.193C125.793 127.154 135.248 131.064 145.106 131.064C154.964 131.064 164.419 127.154 171.39 120.193C178.361 113.232 182.277 103.792 182.277 93.9478C182.277 84.104 178.361 74.6633 171.39 67.7027C164.419 60.7421 154.964 56.8316 145.106 56.8316Z" fill="white"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M281.938 3.10161C285.053 6.78796 284.586 12.2978 280.894 15.4081L14.3865 239.941C10.6947 243.052 5.17669 242.585 2.06173 238.898C-1.05323 235.212 -0.585601 229.702 3.1062 226.592L269.614 2.05868C273.305 -1.05167 278.823 -0.584738 281.938 3.10161Z" fill="white"/>
      </svg>
    </div>
    <div v-if="cameraOpen">
      <button @click='camStore.initializeMediaUI()'>
        <outline-chevron-double-left-icon class='w-10 h-10' />
    </button>
      <div class='h-5/6 w-full flex flex-row justify-center items-center' ref='cvsContainer'>
    </div>
      <div class='w-2/4 flex flex-row items-center justify-around'>
        <button @click='captureImg(video), goToPicture()'>
          <outline-camera-icon class='w-10 h-10' />
        </button>
      </div>
    </div>
    </div>
  </template>

<script>

import { useCameraStore } from '~~/store'
import { onBeforeMount, onMounted, onBeforeUnmount, ref } from 'vue'

import * as tf from '@tensorflow/tfjs'
import * as facemesh from '@tensorflow-models/facemesh'

import { stream, cameraOpen, img, cvsContainer, startCamera, stopCamera, getCanvas, captureImg, goToPicture } from '../use/useMedia.js'

import { init, animate, onWindowResize, videoMaterial, videoSprite, mask, nose, noseMaterial, scene, cameraShader, renderer } from '../use/useShader.js'

export default {
  name: 'CameraStream',
  setup () {
    const camStore = useCameraStore()

    const video = document.createElement('video')

    let faces = []

    async function startShader () {
      init(video)
      animate(faces)
      window.addEventListener('resize', onWindowResize, false)
    }

    // Load the face mesh model
    async function loadModel () {
      const model = await facemesh.load({
        inputResolution: { width: video.videoWidth, height: video.videoHeight },
        scale: 0.8
      })
      detectFaces(model)
    }

    // Detect the faces
    async function detectFaces (model) {
      if (cameraOpen.value && video.readyState === video.HAVE_ENOUGH_DATA) {
        faces = await model.estimateFaces(video)
        requestAnimationFrame(() => detectFaces(model))
        return faces
      }
    }

    onBeforeMount(() => {
      startCamera(video)
    })

    onMounted(() => {
      video.addEventListener('loadeddata', async () => {
        // loadModel()
        startShader()
      })
    })

    onBeforeUnmount(() => {
      stopCamera(video)
    })

    return {
      camStore,
      video,
      stream,
      img,
      cameraOpen,
      startCamera,
      stopCamera,
      getCanvas,
      captureImg,
      goToPicture,

      init,
      animate,
      scene,
      cameraShader,
      renderer,
      videoSprite,
      cvsContainer,
      startShader,

      faces,
      detectFaces,
      loadModel
    }
  }
}
</script>
