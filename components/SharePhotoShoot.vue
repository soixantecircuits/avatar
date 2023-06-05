<template>
  <div class="h-5/6 w-full flex flex-col absolute bottom-0 layer-text">
    <div class="h-full w-full flex flex-row justify-center space-x-7">
    <div class="height-60 w-8/12 flex flex-col space-y-7">
      <img :src="img" class="h-full w-full image rounded-lg object-none object-left" />
      <div class="flex justify-center text-3xl font-semibold">
        Terminé
      </div>
    </div>

    <div class=" flex flex-col space-y-2">

        <button @click="camStore.goToMail()">
          <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="50" height="50" rx="15" fill="#543BED"/>
            <g clip-path="url(#clip0_210_919)">
            <path d="M35.6737 13H14.3342C11.9421 13 10 14.9779 10 17.4141V32.594C10 35.0301 11.9421 37.008 14.3342 37.008H35.6737C38.0658 37.008 40.0079 35.0301 40.0079 32.594V17.4141C40.0079 14.9779 38.0658 13 35.6737 13ZM35.6737 15.1065C35.8474 15.1065 36.0211 15.1307 36.1868 15.1709L27.1868 25.5749C26.6342 26.21 25.8368 26.5799 25.0079 26.5799C24.1789 26.5799 23.3816 26.2181 22.8289 25.5749L13.8211 15.1709C13.9868 15.1307 14.1605 15.1065 14.3342 15.1065H35.6737ZM37.9316 32.594C37.9316 33.8643 36.9211 34.8935 35.6737 34.8935H14.3342C13.0868 34.8935 12.0763 33.8643 12.0763 32.594V17.4141C12.0763 17.1085 12.1395 16.8111 12.2421 16.5377L21.2658 26.9658C22.2132 28.0593 23.5711 28.6864 25 28.6864C26.4289 28.6864 27.7868 28.0593 28.7342 26.9658L37.7579 16.5377C37.8684 16.803 37.9237 17.1005 37.9237 17.4141V32.594H37.9316Z" fill="white"/>
            </g>
            <defs>
            <clipPath id="clip0_210_919">
            <rect width="30" height="24" fill="white" transform="translate(10 13)"/>
            </clipPath>
            </defs>
          </svg>
        </button>

        <button @click="camStore.goToQR(), saveImagetoDataBase()">
          <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="50" height="50" rx="15" fill="#543BED"/>
            <path d="M14.7999 13.5333C13.5475 13.5333 12.5332 14.5477 12.5332 15.8V20.3333C12.5332 21.5857 13.5475 22.6 14.7999 22.6H19.3332C20.5855 22.6 21.5999 21.5857 21.5999 20.3333V15.8C21.5999 14.5477 20.5855 13.5333 19.3332 13.5333H14.7999ZM30.6665 13.5333C29.4142 13.5333 28.3999 14.5477 28.3999 15.8V20.3333C28.3999 21.5857 29.4142 22.6 30.6665 22.6H35.1999C36.4522 22.6 37.4665 21.5857 37.4665 20.3333V15.8C37.4665 14.5477 36.4522 13.5333 35.1999 13.5333H30.6665ZM14.7999 15.8H19.3332V20.3333H14.7999V15.8ZM23.8665 15.8V18.0667H26.1332V15.8H23.8665ZM30.6665 15.8H35.1999V20.3333H30.6665V15.8ZM15.9332 16.9333V19.2H18.1999V16.9333H15.9332ZM31.7999 16.9333V19.2H34.0665V16.9333H31.7999ZM23.8665 20.3333V22.6H26.1332V20.3333H23.8665ZM14.7999 24.8667V27.1333H17.0665V24.8667H14.7999ZM19.3332 24.8667V27.1333H21.5999V24.8667H19.3332ZM23.8665 24.8667V27.1333H26.1332V24.8667H23.8665ZM26.1332 27.1333V29.4H28.3999V27.1333H26.1332ZM28.3999 27.1333H30.6665V24.8667H28.3999V27.1333ZM30.6665 27.1333V29.4H32.9332V27.1333H30.6665ZM32.9332 27.1333H35.1999V24.8667H32.9332V27.1333ZM35.1999 27.1333V29.4H37.4665V27.1333H35.1999ZM35.1999 29.4H32.9332V31.6667H35.1999V29.4ZM35.1999 31.6667V33.9333H37.4665V31.6667H35.1999ZM35.1999 33.9333H32.9332V36.2H35.1999V33.9333ZM32.9332 36.2H30.6665V38.4667H32.9332V36.2ZM30.6665 36.2V33.9333H28.3999V36.2H30.6665ZM28.3999 36.2H26.1332V38.4667H28.3999V36.2ZM26.1332 36.2V33.9333H23.8665V36.2H26.1332ZM26.1332 33.9333H28.3999V31.6667H26.1332V33.9333ZM26.1332 31.6667V29.4H23.8665V31.6667H26.1332ZM28.3999 31.6667H30.6665V29.4H28.3999V31.6667ZM30.6665 31.6667V33.9333H32.9332V31.6667H30.6665ZM14.7999 29.4C13.5475 29.4 12.5332 30.4143 12.5332 31.6667V36.2C12.5332 37.4523 13.5475 38.4667 14.7999 38.4667H19.3332C20.5855 38.4667 21.5999 37.4523 21.5999 36.2V31.6667C21.5999 30.4143 20.5855 29.4 19.3332 29.4H14.7999ZM14.7999 31.6667H19.3332V36.2H14.7999V31.6667ZM15.9332 32.8V35.0667H18.1999V32.8H15.9332Z" fill="white"/>
          </svg>
        </button>

        <button @click="camStore.goToShareMedia(), saveImagetoDataBase()" >
          <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="50" height="50" rx="15" fill="#543BED"/>
            <path d="M39.1841 10.8146L24.1306 25.8681" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M39.1837 10.8146L29.6041 38.184L24.1302 25.8681L11.8143 20.3942L39.1837 10.8146Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>

        <button @click="saveImage">
          <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="50" height="50" rx="15" fill="#543BED"/>
            <path d="M24.6 13C24.9846 13 25.3534 13.1264 25.6253 13.3515C25.8972 13.5765 26.05 13.8817 26.05 14.2V26.9032L29.3748 24.1516C29.6483 23.933 30.0146 23.8121 30.3948 23.8148C30.775 23.8175 31.1386 23.9437 31.4075 24.1662C31.6763 24.3887 31.8288 24.6897 31.8321 25.0043C31.8354 25.319 31.6893 25.6221 31.4252 25.8484L25.6251 30.6484C25.3532 30.8734 24.9845 30.9997 24.6 30.9997C24.2155 30.9997 23.8468 30.8734 23.5748 30.6484L17.7749 25.8484C17.6364 25.7377 17.5259 25.6053 17.4499 25.4589C17.3739 25.3125 17.3339 25.155 17.3322 24.9957C17.3306 24.8363 17.3673 24.6783 17.4402 24.5309C17.5131 24.3834 17.6207 24.2494 17.7569 24.1367C17.893 24.0241 18.0549 23.935 18.2331 23.8746C18.4113 23.8143 18.6023 23.7839 18.7948 23.7853C18.9873 23.7867 19.1776 23.8198 19.3545 23.8827C19.5314 23.9456 19.6914 24.037 19.8251 24.1516L23.15 26.9032V14.2C23.15 13.8817 23.3028 13.5765 23.5747 13.3515C23.8466 13.1264 24.2154 13 24.6 13ZM14.45 31C14.8346 31 15.2034 31.1264 15.4753 31.3515C15.7472 31.5765 15.9 31.8817 15.9 32.2V34.6H33.3V32.2C33.3 31.8817 33.4528 31.5765 33.7247 31.3515C33.9966 31.1264 34.3654 31 34.75 31C35.1346 31 35.5034 31.1264 35.7753 31.3515C36.0472 31.5765 36.2 31.8817 36.2 32.2V34.6C36.2 35.2365 35.8945 35.847 35.3506 36.2971C34.8068 36.7471 34.0691 37 33.3 37H15.9C15.1309 37 14.3932 36.7471 13.8494 36.2971C13.3055 35.847 13 35.2365 13 34.6V32.2C13 31.8817 13.1528 31.5765 13.4247 31.3515C13.6966 31.1264 14.0654 31 14.45 31Z" fill="white"/>
          </svg>
        </button>

      </div>
    </div>
  </div>
  </template>

<script>
import { useCameraStore } from '~~/store'
import { onMounted } from 'vue'

export default {
  name: 'CameraCapture',
  setup () {
    const camStore = useCameraStore()
    const img = camStore.imgStored

    function saveImage () {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')

      const img = document.querySelector('.image')

      canvas.width = img.width
      canvas.height = img.height

      ctx.drawImage(img, 0, 65, img.width, img.height, 0, 0, img.width, img.height)
      // ctx.drawImage(img, 0, 0, img.width, img.height)

      const data = canvas.toDataURL('image/png')

      const link = document.createElement('a')
      link.download = 'your-picture.png'
      link.href = data
      link.click()
    }

    async function saveImagetoDataBase () {
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

      const imageurl = 'https://piuidgbfculczkpeswnb.supabase.co/storage/v1/object/public/images/' + 'your-picture' + '-' + time + '.png'
      camStore.linkToImg = imageurl

      const image = camStore.imgEmailed
      const formData = new FormData()

      // convert image to blob
      const blob = await fetch(image).then(r => r.blob())
      formData.append('image', blob, 'your-picture' + '-' + time + '.png')

      await fetch('https://hook.eu1.make.com/a1iwhthnhtp1mwwuy4qh92iseh6nm7r8', {
        method: 'POST',
        body: formData
      })
    }

    onMounted(() => {
      document.querySelector('.image').src = camStore.imgStored
    })

    return {
      camStore,
      img,
      saveImage,
      saveImagetoDataBase
    }
  }

}
</script>
