<template>
  <div class='h-5/6 w-full flex flex-col absolute bottom-0 layer-text'>
    <div class='h-full w-full flex flex-row justify-center space-x-7'>
    <div class='height-70 w-8/12 flex flex-col items-center space-y-7'>
      <div class='relative height-60  w-full flex flex-col '>
        <img :src='img' class='h-full w-full bg-image image rounded-lg flex object-none object-left' />
        <div class='relative h-full w-full flex justify-center items-center space-y-4'>
          <div class='space-y-4 w-4/6'>
          <button class='button drop-shadow-md' @click='camStore.goToShare()'>
            <img :src=crossIcon alt='cross' class='w-12 h-12'/>
        </button>
        <form v-if='!camStore.emailSent' id='form' class='w-full flex flex-col form' @submit.prevent='sendEmail' method='POST'>
          <div class='space-y-7'>
            <div class='flex flex-row space-x-4'>
            <div class='flex flex-col w-1/2 h-1/2'>
              <input type='text' id='firstName' name='firstName' placeholder='Prénom' :class='changeInputColor()' class='rounded-xl p-2 drop-shadow-md text-sm lg:text-lg'>
            </div>
            <div class='flex flex-col w-1/2'>
              <input type='text' id='lastName' name='lastName' placeholder='Nom' :class='changeInputColor()'  class='rounded-xl p-2 drop-shadow-md text-sm lg:text-lg'>
            </div>
          </div>
          <div class='flex flex-col'>
            <input type='email' id='email' name='email' v-model='email' placeholder='Adresse mail' :class='changeInputColor()' class='rounded-xl p-2 drop-shadow-md text-sm lg:text-lg'>
          </div>
          <button id='sendEmailButton' type='submit' class='button button-color rounded-xl p-2 text-white text-sm lg:text-lg drop-shadow-md w-fit lg:w-1/3 '>
          Envoyer
        </button>
          </div>
        </form>
        <div v-if='camStore.emailSent' class='flex flex-col lg:items-center space-y-2 z-40 drop-shadow-2xl'>
          <div class='text-xl lg:text-3xl font-semibold drop-shadow-2xl low-highlight'>
            Photo envoyée
          </div>
          <div class='text:sm lg:text-xl font-semibold drop-shadow-2xl'>
            Vous allez la recevoir dans votre messagerie
          </div>
          <div class='text:sm lg:text-xl font-semibold drop-shadow-2xl'>
            Ou scannez le <span class='low-highlight'> QR code</span> generé !
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

        <button>
          <img :src=emailIcone alt='email'>
        </button>

        <button @click='camStore.goToQR(), saveImagetoDataBase()'>
          <img :src=qrIcone alt='qrcode'>
        </button>

        <button @click='camStore.goToShareMedia(), saveImagetoDataBase()' >
          <img :src=sendIcone alt='send'>
        </button>

        <button @click='saveImage'>
          <img :src=downloadIcone alt='download'>
        </button>

      </div>
    </div>
  </div>
  </template>

<script>
import { useCameraStore } from '~~/store'
import { onBeforeUnmount } from 'vue'
import QrcodeVue from 'qrcode.vue'

import { downloadImage, saveImagetoDataBase } from '../use/usePhoto.js'

import emailIcone from '~/assets/svg/email.svg'
import qrIcone from '~/assets/svg/qr-code.svg'
import sendIcone from '~/assets/svg/send.svg'
import downloadIcone from '~/assets/svg/download.svg'

import crossIcon from '~/assets/svg/cross.svg'

export default {
  name: 'CameraCapture',
  components: {
    QrcodeVue
  },
  setup () {
    const camStore = useCameraStore()
    const img = camStore.imgStored
    const emailSent = camStore.emailSent

    async function sendEmail () {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')

      const img = document.querySelector('.image')

      canvas.width = img.width
      canvas.height = img.height

      ctx.drawImage(img, 0, 65, img.width, img.height, 0, 0, img.width, img.height)
      // ctx.drawImage(img, 0, 0, canvas.width, canvas.height)

      const imgEmailedData = canvas.toDataURL('image/png')

      camStore.imgEmailed = imgEmailedData

      const date = new Date()
      const day = date.getDate()
      const month = date.getMonth() + 1
      const year = date.getFullYear()
      const hour = date.getHours()
      const minutes = date.getMinutes()
      const seconds = date.getSeconds()
      const time = day + '-' + month + '-' + year + '-' + hour + '-' + minutes + '-' + seconds

      const email = document.getElementById('email').value
      const firstname = document.getElementById('firstName').value
      const lastname = document.getElementById('lastName').value
      const imageurl = 'https://piuidgbfculczkpeswnb.supabase.co/storage/v1/object/public/images/' + firstname + '-' + lastname + '-' + time + '.png'
      camStore.linkToImg = imageurl

      const image = camStore.imgEmailed
      const formData = new FormData()

      // converting image to blob
      const blob = await fetch(image).then(r => r.blob())
      formData.append('image', blob, firstname + '-' + lastname + '-' + time + '.png')

      await fetch('https://hook.eu1.make.com/a1iwhthnhtp1mwwuy4qh92iseh6nm7r8', {
        method: 'POST',
        body: formData
      })

      const data = {
        firstname,
        lastname,
        email,
        imageurl,
        time
      }

      await fetch('https://hook.eu1.make.com/hy6rt8azipju4nv5b7r4qt6di3css4sv', {
        method: 'POST',
        body: JSON.stringify(data)
      })

      camStore.emailSent = true
    }

    function handleQRCodeScan (result) {
      window.open(result, '_blank')
    }

    const changeInputColor = () => {
      if (camStore.darkMode === true) {
        return 'bg-white'
      } else if (camStore.darkMode === false) {
        return 'bg-gray-800'
      }
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
      sendEmail,
      handleQRCodeScan,
      changeInputColor,
      changeQRCodeSize,
      emailSent,
      emailIcone,
      qrIcone,
      sendIcone,
      downloadIcone,
      crossIcon,
      saveImagetoDataBase,
      downloadImage
    }
  }
}
</script>
