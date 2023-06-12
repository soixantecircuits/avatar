import { useCameraStore } from '~~/store'

async function sendEmail () {
  const camStore = useCameraStore()

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

  const image = camStore.imgStored
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

export default sendEmail
