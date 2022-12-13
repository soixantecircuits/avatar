<template>
<div class="h-screen flex flex-col items-center space-y-10">
    <MediaUI v-if="camStore.isTakeorPick && !camStore.isStartCam "/>
    <MediaFilter v-if="camStore.isStartCam && !camStore.isTakeorPick " />
    <MediaShot v-if="!camStore.isStartCam && !camStore.isTakeorPick " />
</div>
</template>

<script>
import { useCameraStore } from '~~/store'
import { onBeforeUnmount } from 'vue'

export default {
  name: 'IndexPage',
  setup () {
    const camStore = useCameraStore()

    onBeforeUnmount(() => {
      camStore.initializeMediaUI()
    })

    return {
      camStore
    }
  }
}
</script>
