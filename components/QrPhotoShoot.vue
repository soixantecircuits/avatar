<template>
  <div class='h-5/6 w-full flex flex-col absolute bottom-0 layer-text'>
    <div class='h-full w-full flex flex-row justify-center space-x-7'>
    <div class='height-70 w-8/12 flex flex-col items-center space-y-7'>
      <div class='relative lg:height-60 height-55  w-full flex flex-col '>
        <img :src='img' class='h-full w-full bg-image image rounded-lg flex object-none object-left' />
        <div class='relative h-full w-full flex justify-center items-center space-y-4'>
          <div class='space-y-4 w-4/6'>
          <button class='button drop-shadow-md' @click='camStore.goToShare()'>
            <img :src=crossIcon alt='cross' class='w-12 h-12'/>
          </button>
        <div class='flex flex-col lg:items-center space-y-2 z-40 drop-shadow-2xl'>
          <div class='text:xl lg:text-3xl font-semibold drop-shadow-2xl'>
            Scannez le <span class='low-highlight'> QR code </span> generé !
          </div>
          <div class='w-28 h-28 lg:w-52 lg:h-52 bg-white flex justify-center items-center rounded-xl space-y-10'>
            <qrcode-vue class='drop-shadow-2xl' :value='camStore.linkToImg' :size='changeQRCodeSize()' foreground= '#1F2937' background='white' level='L' @scan='handleQRCodeScan' />
          </div>
        </div>
      </div>
        </div>
        </div>
      <div class='text-3xl font-semibold'>
        Terminé
      </div>
    </div>

    <div class='flex flex-col space-y-2'>

        <button @click='camStore.goToMail()'>
          <img :src=emailIcon alt='email'>
        </button>

        <button @click='camStore.goToQR(), saveImagetoDataBase()'>
          <img :src=qrIcon alt='qrcode'>
        </button>

        <button @click='camStore.goToShareMedia(), saveImagetoDataBase()' >
          <img :src=sendIcon alt='send'>
        </button>

        <button @click='downloadImage()'>
          <img :src=downloadIcon alt='download'>
        </button>

      </div>
    </div>
  </div>
  </template>

<script>
import { useCameraStore } from '~~/store'
import { onBeforeUnmount } from 'vue'
import QrcodeVue from 'qrcode.vue'

import crossIcon from '~/assets/svg/cross.svg'

import emailIcon from '~/assets/svg/email.svg'
import qrIcon from '~/assets/svg/qr-code.svg'
import sendIcon from '~/assets/svg/send.svg'
import downloadIcon from '~/assets/svg/download.svg'

import { downloadImage, saveImagetoDataBase } from '../use/usePhoto.js'

export default {
  name: 'CameraCapture',
  components: {
    QrcodeVue
  },
  setup () {
    const camStore = useCameraStore()
    const img = camStore.imgStored
    const emailSent = camStore.emailSent

    function handleQRCodeScan (result) {
      window.open(result, '_blank')
    }

    const changeQRCodeSize = () => {
      if (window.innerWidth > 1024) {
        return 200
      } else {
        return 100
      }
    }

    onBeforeUnmount(() => {
      camStore.emailSent = false
    })

    return {
      camStore,
      img,
      handleQRCodeScan,
      changeQRCodeSize,
      emailIcon,
      qrIcon,
      sendIcon,
      downloadIcon,
      crossIcon,
      saveImagetoDataBase,
      downloadImage
    }
  }
}
</script>
