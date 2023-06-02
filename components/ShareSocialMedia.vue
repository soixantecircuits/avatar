<template>
  <div class='h-5/6 w-full flex flex-col absolute bottom-0 layer-text'>
    <div class='h-full w-full flex flex-row justify-center space-x-7'>
    <div class='height-70 w-8/12 flex flex-col items-center space-y-7'>
      <div class='relative height-60  w-full flex flex-col '>
        <img :src='img' class='h-full w-full bg-image image rounded-lg flex object-none object-left' />
        <div class='relative h-full w-full flex justify-center items-center space-y-4'>
          <div class='space-y-4 w-4/6'>
          <button class='button drop-shadow-md' @click='goToShare'>
          <svg width='30' height='30' class="lg:w-10 lg:h-10" viewBox='0 0 45 45' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <path d='M35.3962 37.2937L22.4982 24.3956L9.60167 37.2937C9.47761 37.419 9.32969 37.5184 9.16679 37.586C9.00389 37.6537 8.82955 37.6881 8.65318 37.6874C8.4768 37.6882 8.30203 37.6538 8.13911 37.5862C7.9762 37.5186 7.82823 37.4191 7.70424 37.2937C7.57879 37.1697 7.47934 37.0219 7.41173 36.859C7.34411 36.6961 7.30977 36.5213 7.31056 36.3449C7.30988 36.1686 7.34412 35.9938 7.41173 35.8309C7.47933 35.668 7.57887 35.5202 7.70424 35.3962L20.6022 22.4981L7.70424 9.59994C7.57879 9.47595 7.47934 9.32816 7.41173 9.16525C7.34411 9.00234 7.30977 8.82756 7.31056 8.65118C7.30988 8.47481 7.34412 8.30008 7.41173 8.13718C7.47933 7.97428 7.57887 7.82649 7.70424 7.70244C7.82851 7.57749 7.97624 7.4785 8.13911 7.41123C8.30199 7.34395 8.47696 7.30974 8.65318 7.31056C8.82937 7.30994 9.00394 7.34426 9.16679 7.41153C9.32964 7.47879 9.47727 7.57766 9.60167 7.70244L22.4982 20.6006L35.3962 7.70244C35.5209 7.5776 35.6693 7.47871 35.8324 7.41146C35.9956 7.3442 36.1705 7.3099 36.347 7.31056C36.5232 7.30994 36.6977 7.34426 36.8606 7.41153C37.0234 7.47879 37.1711 7.57766 37.2955 7.70244C37.4202 7.82683 37.5193 7.97474 37.5866 8.13758C37.6539 8.30043 37.6879 8.47499 37.6873 8.65118C37.6881 8.8274 37.6539 9.00203 37.5866 9.1649C37.5193 9.32778 37.4204 9.47566 37.2955 9.59994L24.3975 22.4981L37.2955 35.3962C37.4202 35.5206 37.5193 35.6685 37.5866 35.8313C37.6539 35.9942 37.6879 36.1687 37.6873 36.3449C37.6881 36.5212 37.6539 36.6958 37.5866 36.8587C37.5193 37.0215 37.4204 37.1694 37.2955 37.2937C37.1714 37.419 37.0235 37.5184 36.8606 37.586C36.6977 37.6537 36.5233 37.6881 36.347 37.6874C36.1703 37.6882 35.9952 37.6537 35.832 37.5861C35.6688 37.5185 35.5206 37.4191 35.3962 37.2937Z' fill='white'/>
          </svg>
        </button>
        <div class='flex flex-col lg:items-center space-y-5 z-40 drop-shadow-2xl'>
          <div class='text-xl lg:text-3xl font-semibold drop-shadow-2xl low-highlight'>
            Partagez la photo sur vos réseaux sociaux
          </div>
          <ShareNetwork
              network="twitter"
              :url="camStore.linkToImg"
              title="Hello Wonderful people! Check out my picture with Avatar by Soixante Circuits ."
              description=""
              quote=""
              hashtags="soixanteciruits,frenchtech,avatar,memorablemoment"
              class="flex flex-row space-x-5"
            >
            <span>
              <svg width="62" height="62" viewBox="0 0 62 62" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_20_332)">
                <path d="M62 31C62 13.879 48.121 0 31 0C13.879 0 0 13.879 0 31C0 46.4737 11.338 59.3013 26.1634 61.632V39.9723H18.2951V31.0175H26.1634V24.1832C26.1634 16.42 30.7897 12.1266 37.8694 12.1266C41.2691 12.1266 44.8089 12.74 44.8089 12.74V20.3629H40.9011C37.0458 20.3629 35.8542 22.7462 35.8542 25.1995V31.0175H44.4585L43.0916 39.9723H35.8717V61.632C50.697 59.3013 62.035 46.4737 62.035 31H62Z" fill="#597EFF"/>
                <path d="M43.0741 39.9548L44.441 31H35.8367V25.182C35.8367 22.7287 37.0458 20.3454 40.8836 20.3454H44.7914V12.7224C44.7914 12.7224 41.2516 12.1091 37.8519 12.1091C30.7722 12.1091 26.1459 16.4025 26.1459 24.1656V31H18.2776V39.9548H26.1459V61.6145C27.723 61.8598 29.3352 62 30.9825 62C32.6298 62 34.242 61.8773 35.8191 61.6145V39.9548H43.039H43.0741Z" fill="white"/>
                </g>
                <defs>
                <clipPath id="clip0_20_332">
                <rect width="62" height="62" fill="white"/>
                </clipPath>
                </defs>
              </svg>
            </span>
            <span>
              <svg width="62" height="62" viewBox="0 0 62 62" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_20_333)">
                <path d="M31 62C48.1208 62 62 48.1208 62 31C62 13.8792 48.1208 0 31 0C13.8792 0 0 13.8792 0 31C0 48.1208 13.8792 62 31 62Z" fill="#597EFF"/>
                <path d="M40.6207 19.2764C39.4466 19.2764 38.4828 20.2227 38.4828 21.4144C38.4828 22.606 39.4291 23.5523 40.6207 23.5523C41.8124 23.5523 42.7587 22.606 42.7587 21.4144C42.7587 20.2227 41.8124 19.2764 40.6207 19.2764Z" fill="white"/>
                <path d="M31.1578 22.0102C26.216 22.0102 22.203 26.0232 22.203 30.965C22.203 35.9067 26.216 39.9197 31.1578 39.9197C36.0996 39.9197 40.1126 35.9067 40.1126 30.965C40.1126 26.0232 36.0996 22.0102 31.1578 22.0102V22.0102ZM31.1578 36.6953C28.0035 36.6953 25.4274 34.1193 25.4274 30.965C25.4274 27.8106 28.0035 25.2346 31.1578 25.2346C34.3121 25.2346 36.8881 27.8106 36.8881 30.965C36.8881 34.1193 34.3121 36.6953 31.1578 36.6953Z" fill="white"/>
                <path d="M38.255 49.1374H23.7451C17.7168 49.1374 12.8276 44.2306 12.8276 38.2199V23.71C12.8276 17.6817 17.7168 12.7925 23.7451 12.7925H38.255C44.2833 12.7925 49.1725 17.6817 49.1725 23.71V38.2199C49.1725 44.2482 44.2657 49.1374 38.255 49.1374ZM23.7451 16.2097C19.6094 16.2097 16.2448 19.5743 16.2448 23.71V38.2199C16.2448 42.3556 19.6094 45.7202 23.7451 45.7202H38.255C42.3907 45.7202 45.7553 42.3556 45.7553 38.2199V23.71C45.7553 19.5743 42.3907 16.2097 38.255 16.2097H23.7451Z" fill="white"/>
                </g>
                <defs>
                <clipPath id="clip0_20_333">
                <rect width="62" height="62" fill="white"/>
                </clipPath>
                </defs>
              </svg>
            </span>
            <span>
              <svg width="62" height="62" viewBox="0 0 62 62" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_20_334)">
                <path d="M31 62C48.1208 62 62 48.1208 62 31C62 13.8792 48.1208 0 31 0C13.8792 0 0 13.8792 0 31C0 48.1208 13.8792 62 31 62Z" fill="#597EFF"/>
                <path d="M48.1385 20.3804C47.0695 20.8711 45.8779 21.169 44.7213 21.3618C45.2645 21.2742 46.0706 20.2753 46.4036 19.8722C46.8943 19.2589 47.3148 18.5579 47.5426 17.8044C47.5777 17.7518 47.5952 17.6642 47.5426 17.6292C47.4725 17.5941 47.42 17.6292 47.3674 17.6292C46.0706 18.3301 44.7388 18.8208 43.3194 19.1888C43.1967 19.2238 43.1091 19.1888 43.039 19.1187C42.9163 18.9785 42.8112 18.8558 42.6885 18.7507C42.0927 18.2425 41.4443 17.8395 40.7258 17.5415C39.7795 17.156 38.7456 16.9983 37.7117 17.0509C36.7128 17.121 35.7315 17.4013 34.8552 17.857C33.9615 18.3126 33.1729 18.961 32.5421 19.732C31.8937 20.5382 31.403 21.4844 31.1577 22.4833C30.9123 23.4471 30.9474 24.411 31.0876 25.3923C31.1051 25.55 31.0876 25.5851 30.9474 25.55C25.3748 24.7264 20.7659 22.7287 17.0158 18.4528C16.8581 18.26 16.7705 18.26 16.6303 18.4528C14.983 20.9062 15.7891 24.8666 17.8394 26.7942C18.1198 27.0571 18.4002 27.3199 18.6981 27.5478C18.593 27.5653 17.2261 27.4251 16.0169 26.7942C15.8592 26.6891 15.7716 26.7417 15.7541 26.9344C15.7541 27.1973 15.7541 27.4426 15.8066 27.7405C16.1221 30.2289 17.8394 32.5421 20.2052 33.4358C20.4856 33.5585 20.801 33.6636 21.0989 33.7162C20.5556 33.8389 20.0124 33.9265 18.4703 33.8038C18.2775 33.7688 18.2074 33.8564 18.2775 34.0492C19.4341 37.2035 21.94 38.1498 23.8151 38.693C24.0605 38.7281 24.3233 38.7281 24.5686 38.7982C24.5686 38.8157 24.5336 38.8157 24.5161 38.8508C23.9027 39.7971 21.7298 40.498 20.7309 40.8485C18.9084 41.4794 16.9106 41.7773 14.983 41.5845C14.6676 41.5319 14.615 41.5495 14.5274 41.5845C14.4398 41.6371 14.5274 41.7072 14.615 41.7948C15.0005 42.0577 15.4036 42.2855 15.8066 42.4958C17.0333 43.1441 18.3126 43.6699 19.6444 44.0379C26.5489 45.948 34.3295 44.5461 39.4991 39.394C43.5647 35.346 45.0017 29.7733 45.0017 24.1831C45.0017 23.9729 45.2645 23.8502 45.4047 23.7275C46.4562 22.9389 47.3148 21.9751 48.1034 20.9237C48.2787 20.6783 48.2787 20.4681 48.2787 20.3804V20.3454C48.2787 20.2578 48.2787 20.2753 48.1385 20.3454V20.3804Z" fill="white"/>
                </g>
                <defs>
                <clipPath id="clip0_20_334">
                <rect width="62" height="62" fill="white"/>
                </clipPath>
                </defs>
              </svg>
            </span>
          </ShareNetwork>
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
import { ShareNetwork } from 'vue-social-sharing'

export default {
  name: 'CameraCapture',
  components: {
    ShareNetwork
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

      ctx.drawImage(img, 0, 65, img.width, img.height, 0, 0, img.width, img.height)
      // ctx.drawImage(img, 0, 0, canvas.width, canvas.height)

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
      camStore.isStartShareMedia = false
    }

    function shareOnSocial () {
      const shareData = {
        title: 'MDN',
        text: 'Learn web development on MDN!',
        url: camStore.linkToImg
      }
      const btn = document.getElementById('shareBtn')
      btn.addEventListener('click', async () => {
        try {
          await navigator.share(shareData)
          console.log('MDN shared successfully')
        } catch (err) {
          console.log('Error: ' + err)
        }
      })
    }

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
      saveImage,
      sendEmail,
      goToShare,
      changeInputColor,
      shareOnSocial
    }
  }
}
</script>
