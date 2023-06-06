import { useCameraStore } from '~~/store'

function downloadImage () {
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
  const camStore = useCameraStore()

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

export {
  downloadImage,
  saveImagetoDataBase
}
