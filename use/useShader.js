import * as THREE from 'three'

import fragmentShader from '../shaders/frag.glsl'
import vertexShader from '../shaders/vert.glsl'

import { cvsContainer } from '../use/useMedia.js'

let renderer = null
let tex = null
let scene = null
let cameraShader = null

let videoSprite = null

let videoMaterial = null

let raf = null

let canvashader = null

let cube = null

function init (video) {
  // render
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
  renderer.autoClear = false
  renderer.setSize(video.videoWidth, video.videoHeight)
  cvsContainer.value.appendChild(renderer.domElement)
  renderer.domElement.setAttribute('id', 'canvashader')

  // flip the image
  renderer.domElement.style.transform = 'scaleX(-1)'

  canvashader = document.getElementById('canvashader')

  const canvasWidth = window.innerWidth
  const canvasHeight = window.innerHeight * 0.85

  // object fit
  canvashader.style.objectFit = 'cover'

  canvashader.style.width = canvasWidth + 'px'
  canvashader.style.height = canvasHeight + 'px'

  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.shadowMap.enabled = true
  renderer.shadowMap.type = THREE.PCFSoftShadowMap
  renderer.outputEncoding = THREE.sRGBEncoding

  const width = 1
  const height = 1

  // scene
  scene = new THREE.Scene()
  // cameraShader = new THREE.OrthographicCamera(-width / 2, width / 2, height / 2, -height / 2, 0.1, 1000)
  cameraShader = new THREE.PerspectiveCamera(15, window.innerWidth / window.innerHeight, 1, 1000)
  scene.add(cameraShader)

  // the video texture
  tex = new THREE.VideoTexture(video)
  tex.minFilter = THREE.LinearFilter

  videoMaterial = new THREE.ShaderMaterial({
    uniforms: {
      time: { value: 1.0 },
      resolution: { value: new THREE.Vector2() },
      tex: { value: tex }
    },
    vertexShader,
    fragmentShader
  })
  videoSprite = new THREE.Sprite(videoMaterial)
  videoSprite.position.z = -3
  videoSprite.renderOrder = 1

  videoSprite.scale.set(canvasWidth / 900, canvasHeight / 800, 1)

  scene.add(videoSprite)

  // Add lights.
  const spotLight = new THREE.SpotLight(0xffffbb, 1)
  spotLight.position.set(0.5, 0.5, 1)
  spotLight.position.multiplyScalar(400)
  scene.add(spotLight)

  spotLight.castShadow = true

  spotLight.shadow.mapSize.width = 1024
  spotLight.shadow.mapSize.height = 1024

  spotLight.shadow.camera.near = 200
  spotLight.shadow.camera.far = 800

  spotLight.shadow.camera.fov = 40

  spotLight.shadow.bias = -0.001125

  scene.add(spotLight)

  const hemiLight = new THREE.HemisphereLight(0xffffbb, 0x080820, 0.25)
  scene.add(hemiLight)

  const ambientLight = new THREE.AmbientLight(0x404040, 0.25)
  scene.add(ambientLight)

  // Create a red material for the sphere.
  // const sphereMaterial = new THREE.MeshStandardMaterial({
  //   color: 0xffff00,
  //   roughness: 0.4,
  //   metalness: 0.1,
  //   transparent: true,
  //   emmisive: 0x000000
  // })

  // const sphere = new THREE.Mesh(new THREE.IcosahedronGeometry(1, 5), sphereMaterial)
  // sphere.castShadow = sphere.receiveShadow = true
  // sphere.position.z = -1
  // sphere.scale.setScalar(0.1)
  // scene.add(sphere)

  const geometry = new THREE.BoxGeometry(0.1, 0.1, 0.1)
  const texture = new THREE.TextureLoader().load('../assets/textures/chess.jpg')
  const materialCube = new THREE.MeshBasicMaterial({ map: texture })
  cube = new THREE.Mesh(geometry, materialCube)
  scene.add(cube)
  cube.position.z = -1
  cube.position.x = -0.1
  cube.position.y = -0.1

  cameraShader.position.z = 1
}

async function animate () {
  raf = requestAnimationFrame(animate)
  cube.rotation.x += 0.01
  cube.rotation.y += 0.01

  renderer.render(scene, cameraShader)
}

function onWindowResize () {
  // calculate the canvas size based on the current window size
  const width = window.innerWidth
  const height = window.innerHeight * 0.85

  canvashader.style.width = width + 'px'
  canvashader.style.height = height + 'px'
}

export {
  init,
  animate,
  onWindowResize,

  videoMaterial,
  videoSprite,
  scene,
  cameraShader,
  renderer,
  canvashader
}
