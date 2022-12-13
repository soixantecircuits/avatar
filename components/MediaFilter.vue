<template>
  <div class='h-fit w-full flex flex-col items-center justify-center space-y-10'>
    <button @click='camStore.initializeMediaUI()'>
        <outline-chevron-double-left-icon class='w-10 h-10' />
    </button>
      <div class='h-fit w-full flex items-center justify-center' ref='cvsContainer'>
    </div>
      <div class='w-2/4 flex flex-row items-center justify-around'>
        <button @click='captureImg(video), goToPicture()'>
          <outline-camera-icon class='w-10 h-10' />
        </button>
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
