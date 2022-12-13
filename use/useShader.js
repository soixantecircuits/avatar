import * as THREE from 'three'

import fragmentShader from '../shaders/frag.glsl'
import vertexShader from '../shaders/vert.glsl'

import { cvsContainer } from '../use/useMedia.js'

import { FaceMeshFaceGeometry } from '../tools/face.js'

let renderer = null
let tex = null
let scene = null
let cameraShader = null

let videoSprite = null
let nose = null
let mask = null

let videoMaterial = null
let material = null
let noseMaterial = null

let raf = null

let canvashader = null

const faceGeometry = new FaceMeshFaceGeometry()

function init (video) {
  // render
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
  renderer.setSize(video.videoWidth, video.videoHeight)
  cvsContainer.value.appendChild(renderer.domElement)
  renderer.domElement.setAttribute('id', 'canvashader')

  // flip the image
  renderer.domElement.style.transform = 'scaleX(-1)'

  canvashader = document.getElementById('canvashader')

  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.shadowMap.enabled = true
  renderer.shadowMap.type = THREE.PCFSoftShadowMap
  renderer.outputEncoding = THREE.sRGBEncoding

  let width = 1
  let height = 1

  // scene
  scene = new THREE.Scene()
  cameraShader = new THREE.OrthographicCamera((width / -2), (width / 2), (height / 2), (height / -2), 1, 1000)

  renderer.render(scene, cameraShader)

  // the video texture
  tex = new THREE.VideoTexture(video)
  tex.minFilter = THREE.LinearFilter

  videoMaterial = new THREE.ShaderMaterial({
    uniforms: {
      time: { value: 1.0 },
      resolution: { value: new THREE.Vector2() },
      face: { value: new Array(468 * 3) },
      tex: { value: tex }
    },
    vertexShader,
    fragmentShader
  })
  videoSprite = new THREE.Sprite(videoMaterial)
  videoSprite.position.z = -25
  videoSprite.scale.set(1, 1, 1)
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

  // Load textures for mask material.
  const colorTexture = new THREE.TextureLoader().load('../assets/mesh_map.jpg')
  const aoTexture = new THREE.TextureLoader().load('../assets/ao.jpg')
  const alphaTexture = new THREE.TextureLoader().load('../assets/mask.png')

  // Create material for mask.
  material = new THREE.MeshStandardMaterial({
    color: 0x808080,
    roughness: 0.8,
    metalness: 0.1,
    alphaMap: alphaTexture,
    aoMap: aoTexture,
    map: colorTexture,
    roughnessMap: colorTexture,
    transparent: false,
    side: THREE.DoubleSide
  })

  // Create mask mesh.
  mask = new THREE.Mesh(faceGeometry, material)
  scene.add(mask)
  mask.position.z = 5
  mask.receiveShadow = mask.castShadow = true

  // Create a red material for the nose.
  noseMaterial = new THREE.MeshStandardMaterial({
    color: 0xff2010,
    roughness: 0.4,
    metalness: 0.1,
    transparent: true
  })
  nose = new THREE.Mesh(new THREE.SphereGeometry(0.002, 32, 32), noseMaterial)
  nose.castShadow = nose.receiveShadow = true
  // scene.add(nose)
  nose.scale.set(40, 40, 40)

  cameraShader.position.z = 20
}

async function animate (faces) {
  // set the size facegeometry to the video sprite
  faceGeometry.setSize(1, 1)

  if (faces.length > 0) {
    faceGeometry.update(faces[0], true)
    const track = faceGeometry.track(5, 45, 275)
    nose.position.copy(track.position)
    nose.rotation.setFromRotationMatrix(track.rotation)

    // size width and height of the video sprite
    // console.log(videoSprite.scale.x, videoSprite.scale.y)

    // testing the position of the nose
    // nose.position.set(0, 0.5, 0)
  }

  // if (wireframe) {
  //   renderer.render(scene, cameraShader)
  //   renderer.autoClear = false
  //   renderer.clear(false, true, false)
  //   renderer.render(scene, cameraShader)
  //   mask.material = wireframeMaterial
  //   renderer.render(scene, cameraShader)
  //   mask.material = material
  //   renderer.autoClear = true
  // } else {
  //   renderer.render(scene, cameraShader)
  // }

  renderer.render(scene, cameraShader)
  raf = requestAnimationFrame(animate)
}

function onWindowResize () {
  cameraShader.aspect = window.innerWidth / window.innerHeight
  cameraShader.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)

  videoMaterial.uniforms.resolution.value.x = renderer.domElement.width
  videoMaterial.uniforms.resolution.value.y = renderer.domElement.height
}

export {
  init,
  animate,
  onWindowResize,

  videoMaterial,
  videoSprite,
  mask,
  nose,
  noseMaterial,
  scene,
  cameraShader,
  renderer,
  canvashader
}
