<template>
  <div class='h-5/6 w-full flex flex-col absolute bottom-0 layer-text'>
    <div class='h-full w-full flex flex-row justify-center space-x-7'>
    <div class='height-70 w-8/12 flex flex-col space-y-7'>
      <div class='relative lg:height-60 height-55 w-full flex flex-col'>
        <img :src='img' class='h-full w-full image rounded-lg flex lg:object-none lg:object-left object-center object-cover' />
      </div>
      <div class='flex justify-center text-3xl font-semibold'>
        Terminé
      </div>
    </div>

    <div class=' flex flex-col space-y-2'>

        <button @click='camStore.goToMail()'>
          <img :src=emailIcone alt='email'>
        </button>

        <button @click='camStore.goToQR(), saveImagetoDataBase()'>
          <img :src=qrIcone alt='qrcode'>
        </button>

        <button @click='camStore.goToShareMedia(), saveImagetoDataBase()' >
          <img :src=sendIcone alt='send'>
        </button>

        <button @click='downloadImage()'>
          <img :src=downloadIcone alt='download'>
        </button>

      </div>
    </div>
  </div>
  </template>

<script>
import { useCameraStore } from '~~/store'
import { onMounted } from 'vue'

import { downloadImage, saveImagetoDataBase } from '../use/usePhoto.js'

import emailIcone from '~/assets/svg/email.svg'
import qrIcone from '~/assets/svg/qr-code.svg'
import sendIcone from '~/assets/svg/send.svg'
import downloadIcone from '~/assets/svg/download.svg'

export default {
  name: 'CameraCapture',
  setup () {
    const camStore = useCameraStore()
    const img = camStore.imgStored

    onMounted(() => {
      document.querySelector('.image').src = camStore.imgStored
    })

    return {
      camStore,
      img,
      emailIcone,
      qrIcone,
      sendIcone,
      downloadIcone,
      saveImagetoDataBase,
      downloadImage
    }
  }

}
</script>
