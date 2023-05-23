<template>
  <div class='h-5/6 w-full flex flex-col absolute bottom-0 layer-text'>
    <div class='h-full w-full flex flex-row justify-center space-x-7'>
    <div class='height-70 w-7/12 flex flex-col items-center space-y-7'>
      <div class='relative h-full w-full flex flex-col '>
        <img :src='img' class='h-full w-full bg-image image rounded-lg flex object-none' />
        <div class='relative h-full w-full flex justify-center items-center space-y-4'>
          <div class='space-y-4 w-4/6'>
          <button class='button drop-shadow-md' @click='goToShare'>
          <svg width='45' height='45' viewBox='0 0 45 45' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <path d='M35.3962 37.2937L22.4982 24.3956L9.60167 37.2937C9.47761 37.419 9.32969 37.5184 9.16679 37.586C9.00389 37.6537 8.82955 37.6881 8.65318 37.6874C8.4768 37.6882 8.30203 37.6538 8.13911 37.5862C7.9762 37.5186 7.82823 37.4191 7.70424 37.2937C7.57879 37.1697 7.47934 37.0219 7.41173 36.859C7.34411 36.6961 7.30977 36.5213 7.31056 36.3449C7.30988 36.1686 7.34412 35.9938 7.41173 35.8309C7.47933 35.668 7.57887 35.5202 7.70424 35.3962L20.6022 22.4981L7.70424 9.59994C7.57879 9.47595 7.47934 9.32816 7.41173 9.16525C7.34411 9.00234 7.30977 8.82756 7.31056 8.65118C7.30988 8.47481 7.34412 8.30008 7.41173 8.13718C7.47933 7.97428 7.57887 7.82649 7.70424 7.70244C7.82851 7.57749 7.97624 7.4785 8.13911 7.41123C8.30199 7.34395 8.47696 7.30974 8.65318 7.31056C8.82937 7.30994 9.00394 7.34426 9.16679 7.41153C9.32964 7.47879 9.47727 7.57766 9.60167 7.70244L22.4982 20.6006L35.3962 7.70244C35.5209 7.5776 35.6693 7.47871 35.8324 7.41146C35.9956 7.3442 36.1705 7.3099 36.347 7.31056C36.5232 7.30994 36.6977 7.34426 36.8606 7.41153C37.0234 7.47879 37.1711 7.57766 37.2955 7.70244C37.4202 7.82683 37.5193 7.97474 37.5866 8.13758C37.6539 8.30043 37.6879 8.47499 37.6873 8.65118C37.6881 8.8274 37.6539 9.00203 37.5866 9.1649C37.5193 9.32778 37.4204 9.47566 37.2955 9.59994L24.3975 22.4981L37.2955 35.3962C37.4202 35.5206 37.5193 35.6685 37.5866 35.8313C37.6539 35.9942 37.6879 36.1687 37.6873 36.3449C37.6881 36.5212 37.6539 36.6958 37.5866 36.8587C37.5193 37.0215 37.4204 37.1694 37.2955 37.2937C37.1714 37.419 37.0235 37.5184 36.8606 37.586C36.6977 37.6537 36.5233 37.6881 36.347 37.6874C36.1703 37.6882 35.9952 37.6537 35.832 37.5861C35.6688 37.5185 35.5206 37.4191 35.3962 37.2937Z' fill='white'/>
          </svg>
        </button>
        <form v-if="!camStore.emailSent" id='form' class='w-full flex flex-col form' @submit.prevent="sendEmail" method="POST">
          <div class='space-y-7'>
            <div class='flex flex-row space-x-4'>
            <div class='flex flex-col w-1/2 h-1/2'>
              <input type='text' id='firstName' name='firstName' placeholder='Prénom' class='rounded-xl p-2 bg-gray-800 drop-shadow-md text-lg'>
            </div>
            <div class='flex flex-col w-1/2'>
              <input type='text' id='lastName' name='lastName' placeholder='Nom' class='rounded-xl p-2 bg-gray-800 drop-shadow-md text-lg'>
            </div>
          </div>
          <div class='flex flex-col'>
            <input type='email' id='email' name='email' v-model="email" placeholder='Adresse mail' class='rounded-xl p-2 bg-gray-800 drop-shadow-md text-lg'>
          </div>
          <button id='sendEmailButton' type='submit' class='button button-color rounded-xl p-2 text-white text-lg drop-shadow-md w-1/3'>
          Envoyer
        </button>
          </div>
        </form>
        <div v-if="camStore.emailSent" class='flex flex-col items-center space-y-2 z-40 drop-shadow-2xl'>
          <div class='text-3xl font-semibold drop-shadow-2xl low-highlight'>
            Photo envoyée
          </div>
          <div class='text-xl font-semibold drop-shadow-2xl'>
            Vous allez la recevoir dans votre messagerie
          </div>
          <div class='text-xl font-semibold drop-shadow-2xl'>
            Ou scannez le <span class='low-highlight'> QR code</span> generé !
          </div>
          <div class="w-52 h-52 bg-white flex justify-center items-center rounded-xl">
            <qrcode-vue class="drop-shadow-2xl" :value='camStore.linkToImg' :size='200' foreground= '#1F2937' background='white' level="L" @scan="handleQRCodeScan" />
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
          <svg width='50' height='50' viewBox='0 0 50 50' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <rect width='50' height='50' rx='15' fill='#543BED'/>
            <g clip-path='url(#clip0_210_919)'>
            <path d='M35.6737 13H14.3342C11.9421 13 10 14.9779 10 17.4141V32.594C10 35.0301 11.9421 37.008 14.3342 37.008H35.6737C38.0658 37.008 40.0079 35.0301 40.0079 32.594V17.4141C40.0079 14.9779 38.0658 13 35.6737 13ZM35.6737 15.1065C35.8474 15.1065 36.0211 15.1307 36.1868 15.1709L27.1868 25.5749C26.6342 26.21 25.8368 26.5799 25.0079 26.5799C24.1789 26.5799 23.3816 26.2181 22.8289 25.5749L13.8211 15.1709C13.9868 15.1307 14.1605 15.1065 14.3342 15.1065H35.6737ZM37.9316 32.594C37.9316 33.8643 36.9211 34.8935 35.6737 34.8935H14.3342C13.0868 34.8935 12.0763 33.8643 12.0763 32.594V17.4141C12.0763 17.1085 12.1395 16.8111 12.2421 16.5377L21.2658 26.9658C22.2132 28.0593 23.5711 28.6864 25 28.6864C26.4289 28.6864 27.7868 28.0593 28.7342 26.9658L37.7579 16.5377C37.8684 16.803 37.9237 17.1005 37.9237 17.4141V32.594H37.9316Z' fill='white'/>
            </g>
            <defs>
            <clipPath id='clip0_210_919'>
            <rect width='30' height='24' fill='white' transform='translate(10 13)'/>
            </clipPath>
            </defs>
          </svg>
        </button>

        <button>
          <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="50" height="50" rx="15" fill="#543BED"/>
            <path d="M39.1841 10.8146L24.1306 25.8681" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M39.1837 10.8146L29.6041 38.184L24.1302 25.8681L11.8143 20.3942L39.1837 10.8146Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>

        <button @click='saveImage'>
          <svg width='50' height='50' viewBox='0 0 50 50' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <rect width='50' height='50' rx='15' fill='#543BED'/>
            <path d='M24.6 13C24.9846 13 25.3534 13.1264 25.6253 13.3515C25.8972 13.5765 26.05 13.8817 26.05 14.2V26.9032L29.3748 24.1516C29.6483 23.933 30.0146 23.8121 30.3948 23.8148C30.775 23.8175 31.1386 23.9437 31.4075 24.1662C31.6763 24.3887 31.8288 24.6897 31.8321 25.0043C31.8354 25.319 31.6893 25.6221 31.4252 25.8484L25.6251 30.6484C25.3532 30.8734 24.9845 30.9997 24.6 30.9997C24.2155 30.9997 23.8468 30.8734 23.5748 30.6484L17.7749 25.8484C17.6364 25.7377 17.5259 25.6053 17.4499 25.4589C17.3739 25.3125 17.3339 25.155 17.3322 24.9957C17.3306 24.8363 17.3673 24.6783 17.4402 24.5309C17.5131 24.3834 17.6207 24.2494 17.7569 24.1367C17.893 24.0241 18.0549 23.935 18.2331 23.8746C18.4113 23.8143 18.6023 23.7839 18.7948 23.7853C18.9873 23.7867 19.1776 23.8198 19.3545 23.8827C19.5314 23.9456 19.6914 24.037 19.8251 24.1516L23.15 26.9032V14.2C23.15 13.8817 23.3028 13.5765 23.5747 13.3515C23.8466 13.1264 24.2154 13 24.6 13ZM14.45 31C14.8346 31 15.2034 31.1264 15.4753 31.3515C15.7472 31.5765 15.9 31.8817 15.9 32.2V34.6H33.3V32.2C33.3 31.8817 33.4528 31.5765 33.7247 31.3515C33.9966 31.1264 34.3654 31 34.75 31C35.1346 31 35.5034 31.1264 35.7753 31.3515C36.0472 31.5765 36.2 31.8817 36.2 32.2V34.6C36.2 35.2365 35.8945 35.847 35.3506 36.2971C34.8068 36.7471 34.0691 37 33.3 37H15.9C15.1309 37 14.3932 36.7471 13.8494 36.2971C13.3055 35.847 13 35.2365 13 34.6V32.2C13 31.8817 13.1528 31.5765 13.4247 31.3515C13.6966 31.1264 14.0654 31 14.45 31Z' fill='white'/>
          </svg>
        </button>

      </div>
    </div>
  </div>
  </template>

<script>
import { useCameraStore } from '~~/store'
import { onBeforeUnmount } from 'vue'
import QrcodeVue from 'qrcode.vue'

export default {
  name: 'CameraCapture',
  components: {
    QrcodeVue
  },
  setup () {
    const camStore = useCameraStore()
    const img = camStore.imgStored
    const emailSent = camStore.emailSent

    function saveImage () {
      // save the image to the device and flip it
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')

      const img = document.querySelector('.image')

      canvas.width = img.width
      canvas.height = img.height

      ctx.drawImage(img, 110, 55, img.width, img.height, 0, 0, img.width, img.height)

      const imgdata = canvas.toDataURL('image/png')

      const link = document.createElement('a')
      link.download = 'your-picture.png'
      link.href = imgdata
      link.click()
    }

    async function sendEmail () {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')

      const img = document.querySelector('.image')

      canvas.width = img.width
      canvas.height = img.height

      ctx.drawImage(img, 110, 55, img.width, img.height, 0, 0, img.width, img.height)

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

      // convert image to blob
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

    function goToShare () {
      camStore.isStartMail = false
      camStore.isStartShoot = false
      camStore.isStartXp = false
      camStore.isStartVerif = false
      camStore.isStartPage = false
      camStore.isStartShare = true
    }

    function handleQRCodeScan (result) {
      window.open(result, '_blank')
    }

    onBeforeUnmount(() => {
      camStore.emailSent = false
    })

    return {
      camStore,
      img,
      saveImage,
      sendEmail,
      goToShare,
      handleQRCodeScan
    }
  }
}
</script>
