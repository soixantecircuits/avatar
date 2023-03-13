<template>
<div class="flex flex-col">
    <MediaUI v-if="camStore.isTakeorPick && !camStore.isStartPage && !camStore.isStartCam" />
    <MediaStart v-if="!camStore.isTakeorPick && camStore.isStartPage && !camStore.isStartCam" />
    <MediaFilter v-if="!camStore.isTakeorPick && !camStore.isStartPage && camStore.isStartCam " />
    <MediaShot v-if="!camStore.isTakeorPick && !camStore.isStartPage && !camStore.isStartCam " />
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
