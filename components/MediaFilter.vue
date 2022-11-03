<template>
<div class="h-screen w-full flex flex-col items-center justify-center space-y-10">
  <button @click="camStore.initializeMediaUI()">
      <outline-chevron-double-left-icon class='w-10 h-10' />
  </button>
  <div class="h-5/6 containerMedia">
    <div class="h-full flex items-center justify-center" ref="cvsContainer">

    </div>
    <!-- <video ref="video" class="h-full"/> -->
  </div>

    <div class="w-2/4 flex flex-row items-center justify-around">
      <button class="btn hover-gray" @click="startCamera">
        Start Camera
      </button>
      <button @click="captureImg(); goToPicture()">
        <outline-camera-icon class="w-10 h-10" />
      </button>
      <button class="btn-cancel btn-white hover-gray" @click="stopCamera">
        Stop Camera
      </button>
    </div>
</div>
</template>

<script>

import { useCameraStore } from '~~/store'    

import fragmentShader from '../shaders/frag.glsl'
import vertexShader from '../shaders/vert.glsl'

import * as THREE from 'three'

import * as tf from '@tensorflow/tfjs'
import * as facemesh from '@tensorflow-models/facemesh'

export default {
  name: 'CameraStream',
  setup () {
    const stream = ref(null)
    const cameraOpen = ref(false)
    const img = ref(null)
    const video = document.createElement('video')
    let canvashader = document.createElement('canvashader')

    const cvsContainer = ref(null) // query selector and refs to fix 

    const camStore = useCameraStore()

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

    function stopCamera () {
      if (cameraOpen.value) {
        const tracks = video.srcObject.getTracks()
        tracks.forEach(track => track.stop())
        video.srcObject = null
        cameraOpen.value = false
      }
    }

    function getCanvas () {
      const canvas = document.createElement('canvas')

      canvas.width = video.videoWidth
      canvas.height = video.videoHeight

      const canvashader = document.getElementById('canvashader')
      // canvas.getContext('2d').drawImage(canvashader, 0, 0, canvas.width, canvas.height)
      const canvashaderpixels = canvashader.getContext('2d')
      // I was here
      // console.log(canvas.getContext('2d'))
      //console.log(canvashader.getContext('2d'))
      return canvas
    }

    function captureImg () {
      if (cameraOpen.value) {
        const canvas = getCanvas()

        img.width = canvas.width
        img.height = canvas.height

        // set the image src to the canvas data url
        img.src = canvas.toDataURL('image/png')

        // display the image in img div
        camStore.imgStored = img.src
      }
    }

    function goToPicture () {
      if (cameraOpen.value) {
        camStore.isStartCam = false
      }
    }
    
    // THE SHADER //

    let scene = null
    let cameraShader = null
    let renderer = null
    let raf = null
    let tex = null

    let plane = null

    function init () {
      // const video = document.getElementById('video')

      // initislise the video texture
      tex = new THREE.VideoTexture(video)

      // scene
      scene = new THREE.Scene()

      cameraShader = new THREE.PerspectiveCamera(75, 480/640, 0.1, 1000)
      // renderer
      renderer = new THREE.WebGLRenderer()
      renderer.setSize(640, 480)
      cvsContainer.value.appendChild(renderer.domElement)
      
      renderer.domElement.setAttribute('id', 'canvashader')

      // video plane using texture
      const geometry = new THREE.PlaneGeometry(30, 40) // fix the size
      // const geometry = new THREE.PlaneGeometry(2, 2)
      // const material = new THREE.MeshBasicMaterial({map: tex })
      
      const material = new THREE.ShaderMaterial({
        uniforms: {
          time: { value: 1.0 },
          // color: { value: new THREE.Color(0x00FF00) },
          resolution: { value: new THREE.Vector2() },
          tex : { value: tex }
        },
        vertexShader,
        fragmentShader
      });

      plane = new THREE.Mesh(geometry, material)

      plane.position.z = -1

      // flip the plane
      plane.scale.x = -1

      scene.add(plane)

      cameraShader.position.z = 20

    }

    function animate () {
      raf = requestAnimationFrame(animate)
      renderer.render(scene, cameraShader)
    }

    function onWindowResize () {
      cameraShader.aspect = video.videoWidth / video.videoHeight
      cameraShader.updateProjectionMatrix()
      renderer.setSize(video.videoWidth, video.videoHeight)
    }

    function startShader () {
      init()
      animate()
      window.addEventListener('resize', onWindowResize, false)
    }

    //Load the face mesh model
    async function loadModel () {
      const model = await facemesh.load({
        inputResolution: { width: 640, height: 480 },
        scale: 0.8
      })
      setTimeout(() => {
        detectFaces(model)
      }, 100)
    }

    // Detect the faces
    async function detectFaces (model) {
      const faces = await model.estimateFaces(video)
      const canvas = getCanvas().getContext('2d')

      requestAnimationFrame(() => detectFaces(model))

      // Draw the mesh by calling the drawMesh function
      requestAnimationFrame(() => drawMesh(faces, canvas))
    }

    // Draw the mesh
    async function drawMesh (predictions, ctx) {
      if (predictions.length > 0) {

       predictions.forEach(prediction => {

         const keypoints = prediction.scaledMesh
         
         for (let i = 0; i < keypoints.length; i++) {
           const x = keypoints[i][0]
           const y = keypoints[i][1]
           ctx.beginPath()
           ctx.arc(x, y, 1, 0, 3 * Math.PI)
           ctx.fillStyle = 'aqua'
           ctx.fill()
           // log the keypoints x and y
           // console.log(x, y)
           // console.log(ctx)
        }
       })
      }
    }

    // doesnt work with onbeforemount (the element doesnet existe )
    onBeforeMount(() => {
      startCamera()
    })

    onMounted(() => {
      video.addEventListener('loadeddata', async () => {
        startShader()
        loadModel()
      })
    })


    onBeforeUnmount(() => {
      stopCamera()
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
      raf,
      plane,
      cvsContainer,
      startShader,
      detectFaces,
      loadModel,
      drawMesh
      
    }
  }
}
</script>