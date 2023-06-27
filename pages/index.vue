<template>
<div class='overflow-hidden'>
    <start-page v-if='camStore.isStartPage && !camStore.isStartXp && !camStore.isStartShoot && !camStore.isStartVerif && !camStore.isStartShare && !camStore.isStartMail & !camStore.isStartQR & !camStore.isStartShareMedia' />
    <start-x-p v-if='!camStore.isStartPage && camStore.isStartXp && !camStore.isStartShoot && !camStore.isStartVerif && !camStore.isStartShare && !camStore.isStartMail & !camStore.isStartQR & !camStore.isStartShareMedia' />
    <photo-shoot v-if='!camStore.isStartPage && !camStore.isStartXp && camStore.isStartShoot && !camStore.isStartVerif && !camStore.isStartShare && !camStore.isStartMail & !camStore.isStartQR & !camStore.isStartShareMedia' />
    <verif-photo-shoot v-if='!camStore.isStartPage && !camStore.isStartXp && !camStore.isStartShoot && camStore.isStartVerif && !camStore.isStartShare && !camStore.isStartMail & !camStore.isStartQR & !camStore.isStartShareMedia' />
    <share-photo-shoot v-if='!camStore.isStartPage && !camStore.isStartXp && !camStore.isStartShoot && !camStore.isStartVerif&& camStore.isStartShare && !camStore.isStartMail & !camStore.isStartQR & !camStore.isStartShareMedia' />
    <email-photo-shoot v-if='!camStore.isStartPage && !camStore.isStartXp && !camStore.isStartShoot && !camStore.isStartVerif&& !camStore.isStartShare && camStore.isStartMail & !camStore.isStartQR & !camStore.isStartShareMedia' />
    <qr-photo-shoot v-if='!camStore.isStartPage && !camStore.isStartXp && !camStore.isStartShoot && !camStore.isStartVerif&& !camStore.isStartShare && !camStore.isStartMail & camStore.isStartQR & !camStore.isStartShareMedia' />
    <share-social-media v-if='!camStore.isStartPage && !camStore.isStartXp && !camStore.isStartShoot && !camStore.isStartVerif&& !camStore.isStartShare && !camStore.isStartMail & !camStore.isStartQR & camStore.isStartShareMedia' />
    <div
    class='absolute bg-violet bottom-0 pointer-events-none'
    :style='{
      left: `${x - 75}px`,
      top: `${y - 75}px`,
      width: `150px`,
      height: `150px`,
      borderRadius: `50%`,
      filter: `blur(4rem)`
    }'>
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
