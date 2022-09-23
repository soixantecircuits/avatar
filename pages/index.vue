<template>
  <div>
    <div class="h-screen flex flex-col justify-center items-center space-y-20">
        <p class="text-6xl text-center">
          Create your own avatar character to express yourself
        </p>
        <router-link class="btn hover-gray" to="takeorpick">
          Create Your Avatar
        </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  layout: 'defaultLayout'
}
</script>
