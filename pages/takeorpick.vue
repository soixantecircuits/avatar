<template>
  <div>
    <div class=" h-screen grid place-items-center p-60 container mx-auto">
      <div class="p-10">
        <p class="text-6xl text-center">
          Remember to take a frontal selfie with a good light
        </p>
      </div>
      <div class="grid place-items-center gap-4 w-full">
        <router-link class="btn-large bg-emerald-500 text-white hover-gray" to="webcam">
          Take a photo !
        </router-link>
        <router-link class="btn-large hover-gray hover:text-white" to="takeorpick">
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
