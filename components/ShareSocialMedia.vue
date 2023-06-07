<template>
  <div class='h-5/6 w-full flex flex-col absolute bottom-0 layer-text'>
    <div class='h-full w-full flex flex-row justify-center space-x-7'>
    <div class='height-70 w-8/12 flex flex-col items-center space-y-7'>
      <div class='relative lg:height-60 height-55  w-full flex flex-col '>
        <img :src='img' class='h-full w-full bg-image image rounded-lg flex g:object-none lg:object-left object-center object-cover' />
        <div class='relative h-full w-full flex justify-center items-center space-y-4'>
          <div class='space-y-4 w-4/6'>
          <button class='button drop-shadow-md' @click='camStore.goToShare()'>
            <img :src=crossIcon alt='cross' class='w-12 h-12'/>
          </button>
        <div class='flex flex-col lg:items-center space-y-5 z-40 drop-shadow-2xl'>
          <div class='text-xl lg:text-3xl font-semibold drop-shadow-2xl low-highlight'>
            Partagez la photo sur vos réseaux sociaux
          </div>
          <div class='flex flex-row items-center space-x-4'>
            <ShareNetwork
              v-for='network in networks'
              :key='network.network'
              :network='network.network'
              :url='sharing.url'
              :title='sharing.title'
              :description='sharing.description'
              :quote='sharing.quote'
              :hashtags='sharing.hashtags'
              :twitter-user='sharing.twitterUser'
              >
              <img :src='network.icon' class='w-12 h-12'/>
            </ShareNetwork>
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

import facebookIcon from '~/assets/svg/facebook.svg'
import twitterIcon from '~/assets/svg/twitter.svg'
import pinterestIcon from '~/assets/svg/pinterest.svg'

import emailIcon from '~/assets/svg/email.svg'
import qrIcon from '~/assets/svg/qr-code.svg'
import sendIcon from '~/assets/svg/send.svg'
import downloadIcon from '~/assets/svg/download.svg'

import crossIcon from '~/assets/svg/cross.svg'

import { downloadImage, saveImagetoDataBase } from '../use/usePhoto.js'

export default {
  name: 'CameraCapture',
  components: {
  },
  setup () {
    const camStore = useCameraStore()
    const img = camStore.imgStored
    const emailSent = camStore.emailSent

    const sharing = {
      url: camStore.linkToImg,
      title: 'Hello Wonderful people! Check out my picture with Avatar by Soixante Circuits.',
      description: 'Hello Wonderful people! Check out my picture with Avatar by Soixante Circuits.',
      quote: 'Hello Wonderful people! Check out my picture with Avatar by Soixante Circuits.',
      hashtags: 'soixanteciruits,frenchtech,avatar,memorablemoment',
      twitterUser: ''
    }

    const networks = [
      { network: 'facebook', name: 'Facebook', icon: facebookIcon },
      { network: 'twitter', name: 'Twitter', icon: twitterIcon },
      { network: 'pinterest', name: 'Pinterest', icon: pinterestIcon }
    ]

    const changeInputColor = () => {
      if (camStore.darkMode === true) {
        return 'bg-white'
      } else if (camStore.darkMode === false) {
        return 'bg-gray-800'
      }
    }

    onBeforeUnmount(() => {
      camStore.emailSent = false
    })

    return {
      camStore,
      img,
      changeInputColor,
      sharing,
      networks,
      emailSent,
      emailIcon,
      qrIcon,
      sendIcon,
      downloadIcon,
      crossIcon,
      downloadImage,
      saveImagetoDataBase
    }
  }
}
</script>
