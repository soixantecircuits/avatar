import * as THREE from 'three'

import fragmentShader from '../shaders/frag.glsl'
import vertexShader from '../shaders/vert.glsl'

import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js'
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader.js'

// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

import { cvsContainer } from '../use/useMedia.js'

let scene = null
let cameraShader = null

let renderer = null

let canvashader = null

let videoSprite = null
let videoMaterial = null
let tex = null

let raf = null

let bloomComposer = null
let bloomPass = null
let finalPass = null
let finalComposer = null

let darkMaterial = null

let isMouseDown = false

let group = null

function init (video) {
  // render
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
  renderer.autoClear = false
  renderer.toneMapping = THREE.ReinhardToneMapping
  renderer.toneMappingExposure = 1
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

  // const width = 1
  // const height = 1

  // scene
  scene = new THREE.Scene()

  cameraShader = new THREE.PerspectiveCamera(15, window.innerWidth / window.innerHeight, 0.1, 1000)
  scene.add(cameraShader)

  // const controls = new OrbitControls(cameraShader, renderer.domElement)
  // controls.screenSpacePanning = true

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

  videoSprite.scale.set(2, 1.05, 1)

  scene.add(videoSprite)

  const spotLight = new THREE.SpotLight(0xffffbb, 1)
  spotLight.position.set(0.5, 0.5, 1)
  spotLight.position.multiplyScalar(400)
  scene.add(spotLight)

  bloomComposer = new EffectComposer(renderer)

  const renderScene = new RenderPass(scene, cameraShader)
  bloomComposer.addPass(renderScene)

  bloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 1.5, 0.4, 0.85)
  bloomPass.threshold = 0
  bloomPass.strength = 3
  bloomPass.radius = 1
  bloomPass.exposure = 2
  bloomComposer.addPass(bloomPass)
  bloomComposer.renderToScreen = false

  finalPass = new ShaderPass(
    new THREE.ShaderMaterial({
      uniforms: {
        baseTexture: { value: null },
        bloomTexture: { value: bloomComposer.renderTarget2.texture }
      },
      vertexShader:
      `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
      }
      `,
      fragmentShader:
      `
      uniform sampler2D baseTexture;
      uniform sampler2D bloomTexture;

      varying vec2 vUv;

      void main() {
        gl_FragColor = ( texture2D( baseTexture, vUv ) + vec4( 1.0 ) * texture2D( bloomTexture, vUv ) );
      }
      `,
      defines: {}
    }),
    'baseTexture'
  )
  finalPass.needsSwap = true

  finalComposer = new EffectComposer(renderer)
  finalComposer.addPass(renderScene)
  finalComposer.addPass(finalPass)

  darkMaterial = new THREE.MeshBasicMaterial({ color: 'black' })

  cameraShader.position.z = 1

  const svgSlash = ` <svg width="96" height="172" viewBox="0 0 96 172" fill="none" xmlns="http://www.w3.org/2000/svg">
  <g style="mix-blend-mode:difference">
  <path d="M48.0756 67.0187H38.6574V85.9355H29.2391V104.852H38.6574V85.9355H48.0756V67.0187H57.4939V48.102H48.0756V67.0187ZM19.8209 133.227H10.4026V152.144H0.984375V171.061H10.4026V152.144H19.8209V133.227H29.2391V114.311H19.8209V133.227Z" fill="white"/>
  <path d="M76.5444 47.9325H67.1261V66.8493H57.7079V85.766H67.1261V66.8493H76.5444V47.9325H85.9626V29.0158H76.5444V47.9325ZM48.2896 114.141H38.8714V133.058H29.4531V151.975H38.8714V133.058H48.2896V114.141H57.7079V95.2244H48.2896V114.141Z" fill="white"/>
  </g>
  </svg>
  `
  const svgSlashURI = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgSlash)

  const loader = new SVGLoader()
  loader.load(svgSlashURI, function (data) {
    const paths = data.paths
    group = new THREE.Group()
    group.scale.multiplyScalar(0.001)
    group.position.x = -0.1
    group.position.y = -0.1
    group.position.z = -1
    // group.scale.y *= -1

    const colorRed = new THREE.Color(0xFF6443)

    for (let i = 0; i < paths.length; i++) {
      const path = paths[i]
      const material = new THREE.MeshBasicMaterial({
        color: colorRed,
        side: THREE.DoubleSide,
        depthWrite: true
      })
      const shapes = SVGLoader.createShapes(path)
      for (let j = 0; j < shapes.length; j++) {
        const shape = shapes[j]
        const geometry = new THREE.ShapeGeometry(shape)
        const mesh = new THREE.Mesh(geometry, material)
        group.add(mesh)
      }
      scene.add(group)
    }
  })
  window.addEventListener('mousedown', onMouseDown)
  window.addEventListener('mouseup', onMouseUp)
  window.addEventListener('mousemove', onMouseMove)
}

function onMouseDown () {
  isMouseDown = true
}

function onMouseUp () {
  isMouseDown = false
}

function onMouseMove (event) {
  if (isMouseDown) {
    const mouseX = event.clientX
    const mouseY = event.clientY

    const width = window.innerWidth
    const height = window.innerHeight

    const x = ((mouseX / width) * 2 - 1) * -1
    const y = -(mouseY / height) * 2 + 1

    const vector = new THREE.Vector3(x, y, 0.01)
    vector.unproject(cameraShader)

    const dir = vector.sub(cameraShader.position).normalize()
    const distance = -cameraShader.position.z / dir.z
    const pos = cameraShader.position.clone().add(dir.multiplyScalar(distance))
    group.scale.set(0.0005, 0.0005, 0.0005)
    group.position.copy(pos)
  }
}

async function animate () {
  raf = requestAnimationFrame(animate)
  // group.rotation.x += 0.05
  // group.rotation.y += 0.05

  // renderer.render(scene, cameraShader)
  videoSprite.material = darkMaterial
  bloomComposer.render()
  videoSprite.material = videoMaterial
  finalComposer.render()
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
