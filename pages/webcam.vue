<template>
  <div class='screen'>
    <router-link to='takeorpick'>
      <outline-chevron-double-left-icon class='w-8 h-8' />
    </router-link>
    <vue-web-cam autoplay />
    <button type="button" class="btn bg-emerald-500 text-white hover-gray" >
      Start Camera
    </button>
    <button class="btn bg-emerald-500 text-white hover-gray">
      Stop Camera
    </button>
    </div>
</template>

<script>

export default {
  name: 'WebcamPage',
  layout: 'defaultLayout'
}
</script>
