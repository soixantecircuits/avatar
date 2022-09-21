<template>
  <div>
    <div class=" h-screen grid place-items-center p-60 container mx-auto">
      <div class="p-10">
        <p class="text-6xl text-center">
          Create your own avatar character to express yourself
        </p>
      </div>
      <div class="grid place-items-center w-full">
        <router-link class="text-xl bg-emerald-500 hover:bg-gray-900 text-white p-4 rounded-md text-sm font-medium" to="takeorpick">
          Create Your Avatar
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  layout: 'defaultLayout'
}
</script>
