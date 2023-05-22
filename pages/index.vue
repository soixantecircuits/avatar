<template>
<div class="overflow-hidden">
    <start-page v-if="camStore.isStartPage && !camStore.isStartXp && !camStore.isStartShoot && !camStore.isStartVerif && !camStore.isStartShare && !camStore.isStartMail & !camStore.isStartQR" />
    <start-x-p v-if="!camStore.isStartPage && camStore.isStartXp && !camStore.isStartShoot && !camStore.isStartVerif && !camStore.isStartShare && !camStore.isStartMail & !camStore.isStartQR" />
    <photo-shoot v-if="!camStore.isStartPage && !camStore.isStartXp && camStore.isStartShoot && !camStore.isStartVerif && !camStore.isStartShare && !camStore.isStartMail & !camStore.isStartQR" />
    <verif-photo-shoot v-if="!camStore.isStartPage && !camStore.isStartXp && !camStore.isStartShoot && camStore.isStartVerif && !camStore.isStartShare && !camStore.isStartMail & !camStore.isStartQR" />
    <share-photo-shoot v-if="!camStore.isStartPage && !camStore.isStartXp && !camStore.isStartShoot && !camStore.isStartVerif&& camStore.isStartShare && !camStore.isStartMail & !camStore.isStartQR" />
    <email-photo-shoot v-if="!camStore.isStartPage && !camStore.isStartXp && !camStore.isStartShoot && !camStore.isStartVerif&& !camStore.isStartShare && camStore.isStartMail & !camStore.isStartQR" />
    <qr-photo-shoot v-if="!camStore.isStartPage && !camStore.isStartXp && !camStore.isStartShoot && !camStore.isStartVerif&& !camStore.isStartShare && !camStore.isStartMail & camStore.isStartQR" />
    <div class="absolute bg-violet bottom-0 rounded-full blur-3xl"
    :style="{
      left: `${x}px`,
      top: `${y}px`,
      width: `150px`,
      height: `150px`,
    }">
    </div>
</div>
</template>

<script>
import { useCameraStore } from '~~/store'
import { onBeforeUnmount } from 'vue'
import StartPage from '~~/components/StartPage.vue'
import StartXP from '~~/components/StartXP.vue'
import PhotoShoot from '~~/components/PhotoShoot.vue'
import VerifPhotoShoot from '~~/components/VerifPhotoShoot.vue'
import SharePhotoShoot from '~~/components/SharePhotoShoot.vue'

import { useMouse } from '@vueuse/core'

export default {
  components: { StartPage, StartXP, PhotoShoot, VerifPhotoShoot, SharePhotoShoot },
  name: 'IndexPage',
  setup () {
    const camStore = useCameraStore()
    const { x, y } = useMouse()

    onBeforeUnmount(() => {
      camStore.initializeMediaUI()
    })

    return {
      camStore,
      x,
      y
    }
  }
}
</script>
