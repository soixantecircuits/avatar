<template>
  <div>
    <div class=" h-screen flex flex-col justify-center items-center space-y-20">
      <div class="p-10">
        <p class="text-6xl text-center">
          Remember to take a frontal selfie with a good light
        </p>
      </div>
      <div class="flex flex-col justify-center items-center space-y-5">
        <router-link class="btn hover-gray" to="webcam">
          Take a photo !
        </router-link>
        <router-link class="btn-white hover-gray" to="takeorpick">
          Or pick a file
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'TakePickPage',
  layout: 'defaultLayout'
}
</script>
