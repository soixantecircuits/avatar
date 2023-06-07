<template>
  <div class='overflow-hidden'>
    <div class='absolute bottom-0 w-full h-5/6  flex flex-col justify-center items-center' v-if='!camStore.cameraOpen'>
    <div class=' flex flex-row  justify-center items-center space-x-4 layer-text'>
      <svg width='15' height='15'  class='lg:w-4 lg:h-4' viewBox='0 0 14 14' fill='none' xmlns='http://www.w3.org/2000/svg'>
        <circle cx='7' cy='7' r='7' fill='#D21E3E'/>
      </svg>
      <div class='text-lg'>Activez votre webcam</div>
    </div>
      <svg width='150' height='150' class='lg:w-80 lg:h-80 layer-text' viewBox='0 0 284 242' fill='none' xmlns='http://www.w3.org/2000/svg'>
        <path d='M49.0807 13.5294C30.3726 13.5294 15.0071 28.8722 15.0071 47.5526V189.831C15.0071 208.512 30.3726 223.854 49.0807 223.854H241.131C259.839 223.854 275.205 208.512 275.205 189.831V47.5526C275.205 28.8722 259.839 13.5294 241.131 13.5294H49.0807ZM49.0807 32.0875H241.131C249.794 32.0875 256.619 38.9031 256.619 47.5526V189.831C256.619 198.481 249.794 205.296 241.131 205.296H207.058V165.087C207.058 153.148 197.331 143.436 185.375 143.436H104.837C92.8806 143.436 83.1542 153.148 83.1542 165.087V205.296H49.0807C40.4184 205.296 33.5927 198.481 33.5927 189.831V47.5526C33.5927 38.9031 40.4184 32.0875 49.0807 32.0875ZM145.106 56.8316C135.248 56.8316 125.793 60.7421 118.822 67.7027C111.851 74.6633 107.935 84.104 107.935 93.9478C107.935 103.792 111.851 113.232 118.822 120.193C125.793 127.154 135.248 131.064 145.106 131.064C154.964 131.064 164.419 127.154 171.39 120.193C178.361 113.232 182.277 103.792 182.277 93.9478C182.277 84.104 178.361 74.6633 171.39 67.7027C164.419 60.7421 154.964 56.8316 145.106 56.8316Z' fill='white'/>
        <path fill-rule='evenodd' clip-rule='evenodd' d='M281.938 3.10161C285.053 6.78796 284.586 12.2978 280.894 15.4081L14.3865 239.941C10.6947 243.052 5.17669 242.585 2.06173 238.898C-1.05323 235.212 -0.585601 229.702 3.1062 226.592L269.614 2.05868C273.305 -1.05167 278.823 -0.584738 281.938 3.10161Z' fill='white'/>
      </svg>
    </div>

    <div v-if='camStore.cameraOpen' class='h-5/6 layer-text'>

      <div class='w-full absolute top-40 layer-text' ref='cvsContainer'> </div>

      <div class='w-full h-1/5 absolute bottom-0 flex justify-center filter-bar layer-text'>
        <!-- <div class='flex flex-row flex-grow justify-end space-x-5'>
        <div class='filter-names'>RGB</div>
        <div class='filter-names'>Pixelight</div>
        <div class='filter-names'>Solar</div>
        <div class='filter-names'>Mirror</div>
        <div class='filter-names'>Glitch</div>
        </div> -->

        <button  @click='captureImg(video), camStore.goToVerif()' class='layer-text'>
          <svg width='90' height='90' class='lg:w-28 lg:h-28' viewBox='0 0 127 127' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <g filter='url(#filter0_d_210_796)'>
            <path d='M63.4998 113.018C93.0569 113.018 117.018 89.0571 117.018 59.5C117.018 29.9429 93.0569 5.98218 63.4998 5.98218C33.9427 5.98218 9.98193 29.9429 9.98193 59.5C9.98193 89.0571 33.9427 113.018 63.4998 113.018Z' stroke='white' stroke-width='2.5'/>
            <path opacity='0.63' d='M63.4998 102.314C87.1455 102.314 106.314 83.1458 106.314 59.5001C106.314 35.8544 87.1455 16.6858 63.4998 16.6858C39.8542 16.6858 20.6855 35.8544 20.6855 59.5001C20.6855 83.1458 39.8542 102.314 63.4998 102.314Z' fill='white'/>
            </g>
            <defs>
            <filter id='filter0_d_210_796' x='0' y='0' width='127' height='127' filterUnits='userSpaceOnUse' color-interpolation-filters='sRGB'>
            <feFlood flood-opacity='0' result='BackgroundImageFix'/>
            <feColorMatrix in='SourceAlpha' type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0' result='hardAlpha'/>
            <feOffset dy='4'/>
            <feGaussianBlur stdDeviation='4'/>
            <feComposite in2='hardAlpha' operator='out'/>
            <feColorMatrix type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0'/>
            <feBlend mode='normal' in2='BackgroundImageFix' result='effect1_dropShadow_210_796'/>
            <feBlend mode='normal' in='SourceGraphic' in2='effect1_dropShadow_210_796' result='shape'/>
            </filter>
            </defs>
          </svg>
        </button>

        <!-- <div class='flex-grow'>
        </div> -->
      </div>
    </div>
    </div>
  </template>

<script>

import { useCameraStore } from '~~/store'
import { onBeforeMount, onMounted, onBeforeUnmount } from 'vue'

import { stream, img, cvsContainer, startCamera, stopCamera, getCanvas, captureImg } from '../use/useMedia.js'

import { init, animate, onWindowResize, videoSprite, scene, cameraShader, renderer } from '../use/useShader.js'

export default {
  name: 'CameraStream',
  setup () {
    const camStore = useCameraStore()

    const video = document.createElement('video')

    const getBackgroundClasses = () => {
      if (camStore.darkMode === true) {
        return 'h-screen bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#4c1d95] to-[#FFFFFF] '
      } else if (camStore.darkMode === false) {
        return 'h-screen bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#4c1d95] to-[#000000]'
      }
    }
    async function startShader () {
      init(video)
      animate()
      window.addEventListener('resize', onWindowResize, false)
    }

    onBeforeMount(() => {
      startCamera(video)
    })

    onMounted(() => {
      video.addEventListener('loadeddata', async () => {
        startShader()
      })
    })

    onBeforeUnmount(() => {
      stopCamera(video)
      window.removeEventListener('resize', onWindowResize, false)
      video.removeEventListener('loadeddata', async () => {
        startShader()
      })
    })

    return {
      camStore,
      video,
      stream,
      img,
      startCamera,
      stopCamera,
      getCanvas,
      captureImg,
      getBackgroundClasses,

      init,
      animate,
      scene,
      cameraShader,
      renderer,
      videoSprite,
      cvsContainer,
      startShader
    }
  }
}
</script>
